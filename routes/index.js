var express = require('express');
var router = express.Router();
var template = require('../lib/template2.js');
var auth = require('../lib/auth');
const { Pool } = require('pg')
const pool = new Pool({
  user: "postgres",
  host: "/cloudsql/kaigaemi:asia-northeast3:quickstart-instance",
 database: "postgres",
 password: "0329",
  //  port: 5432,
    
});

router.get('/initialize', async (request, response) => {
  if (!auth.isAdmin(request, response)) {
    response.redirect('/auth/login');
    return false;
  }
  //stock 초기화
  await pool.query("DELETE FROM current_stocks",[]);
  await pool.query("DELETE FROM jo",[]);

  let quantities = await pool.query("SELECT * FROM stock_quantities ORDER BY stock_name ASC",[]);
  // quantities 변동
  quantities =  quantities.rows;

  for (let i =0; i<8;i++){
    await pool.query("INSERT INTO current_stocks(stock_name,quantity) VALUES ($1,$2)",[i,quantities[i+""]["2016"]]);

    //초기 수량 저장
  }
  for (let i =1;i<13;i++){
    await pool.query("INSERT INTO jo(jo) VALUES ($1)",[i]);
  }
  await pool.query("UPDATE current_info SET value_int = $1 WHERE name=$2",[2016,"year"]);
  await pool.query("UPDATE current_info SET value_int = $1 WHERE name=$2",[2016,"year"]);
  // player 초기화

  response.redirect("/");

})
router.get('/year_process' , async (request, response) => {
  if (!auth.isAdmin(request, response)) {
    response.redirect('/auth/login');
    return false;
  }
  let  prices = await pool.query("SELECT * FROM stock_prices ORDER BY stock_name ASC",[]);
  prices =prices.rows;
  let quantities = await pool.query("SELECT * FROM stock_quantities ORDER BY stock_name ASC",[]);
  quantities =  quantities.rows;
  const danhaps = await pool.query(`SELECT * FROM danhap ORDER BY "group" ASC`,[]);
  // const danhaps = await pool.query("SELECT * FROM danhap",[]);
  const danhaped_stock_names =[];
  for (let i =0; i<danhaps.length;i++){
    danhaped_stock_names.push(danhaps[i]['stock_name']);
  }
  // 종목 별 입찰 결과 계산

  let  year = await pool.query("SELECT value_int FROM current_info WHERE name=$1",["year"]);
  year=year.rows[0]["value_int"];
  let current_stocks = await pool.query("SELECT * FROM current_stocks ORDER BY stock_name ASC",[]);
  current_stocks=current_stocks.rows;
  // console.log(current_stocks.rows[0]); { stock_name: 0, quantity: null, ipchal_results: null }
  let ipchal_lists =await pool.query("SELECT ipchal FROM jo ORDER BY jo ASC",[]);
  ipchal_lists=ipchal_lists.rows;
  // 조별 주식 늘어나기 적용, budget에서 구매 금액 빼기
  for(let i=0; i<8; i++) {
    let stock_quantity = current_stocks[i]['quantity'];
    //let a_ipchal = [current_stocks[i]['ipchals'];]
    let a_ipchal =[];
    for (let j =0;j<12;j++){
      a_ipchal.push(ipchal_lists[j]['ipchal'][i]); //j:list index, not조
    }
    let a_ipchal_result = algorithm(a_ipchal,stock_quantity);
    console.log("결과:",a_ipchal_result);
    await pool.query("UPDATE current_stocks SET ipchal_results = $1 WHERE stock_name=$2",[a_ipchal_result,i]);
    console.log(2);

    //자산 및 cash 산 거 적}
    for(let jo =1; jo<13;jo++){

      if(a_ipchal_result[jo-1]!=0){



        let leverage = await pool.query("SELECT leverage FROM jo WHERE jo=$1",[jo])
        leverage = leverage.rows[0]['leverage'];
        console.log(i+"th---------------- ",leverage,leverage[1])
        if (leverage[0]==1 && leverage[1]==i){
            let delta = prices[i][year+1]-prices[i][year];
            let new_price = prices[i][year]+delta*2;
            let cash = await pool.query("SELECT cash FROM jo WHERE jo=$1",[jo])
            cash = cash.rows[0]['cash'];
            console.log("ori",cash,a_ipchal_result[jo-1]);
            cash-=a_ipchal_result[jo-1]*prices[i][year];
            cash+=a_ipchal_result[jo-1]*new_price;
            console.log("levvvvvvvvvv",cash,prices[i][year],delta,new_price);
            await pool.query("UPDATE jo SET cash = $1 WHERE jo=$2",[cash,jo]);

          }else {
            let spent_money = a_ipchal_result[jo-1]*prices[i][year]
            let cash = await pool.query("SELECT cash FROM jo WHERE jo=$1",[jo])
            cash = cash.rows[0]['cash'];
            cash -= spent_money;
            console.log(cash);
            await pool.query("UPDATE jo SET cash = $1 WHERE jo=$2",[cash,jo]);
            console.log(4);
            let previous_stocks= await pool.query("SELECT stocks FROM jo WHERE jo=$1",[jo]);
            previous_stocks=previous_stocks.rows[0]["stocks"];
            previous_stocks[i]+=a_ipchal_result[jo-1];
            await pool.query("UPDATE jo SET stocks = $1 WHERE jo=$2",[previous_stocks,jo]);
            await pool.query("UPDATE current_stocks SET quantity = quantity-$1 WHERE stock_name=$2",[a_ipchal_result[jo-1],i]);
          }
        }


    }
  }
  //previous_ipchal로 넘기고, year변동, ipchal 초기화
  //danhap 초기화
  initialize("ipchal");
  //year 올림
  year+=1;
  await pool.query("UPDATE current_info SET value_int = $1 WHERE name =$2",[year,'year']);

  //잔고 업데이트

  let stock_jangos = await pool.query("SELECT stocks FROM jo ORDER BY jo ASC",[]);
  stock_jangos=stock_jangos.rows;
  for (let jo=1;jo<13;jo++){

    let leverage = await pool.query("SELECT leverage FROM jo WHERE jo=$1",[jo])
    leverage = leverage.rows[0]['leverage'];
    if (leverage[1]<8){
      await pool.query("UPDATE jo SET leverage = $1 WHERE jo =$2",[[0,8],jo]);
    }
    let cash = await pool.query("SELECT cash FROM jo WHERE jo=$1",[jo])
    cash = cash.rows[0]['cash'];

    console.log(cash)
    let net_jango = cash;
    let jo_stock = stock_jangos[jo-1]["stocks"];

    console.log("js",jo_stock)
    for (let i =0; i<8;i++){
      if (jo_stock[i]) {
        net_jango+=jo_stock[i]*prices[i][year];
      }

    }
    await pool.query("UPDATE jo SET budget = $1 WHERE jo =$2",[net_jango,jo]);

  }

  //주식 종목 별 추가 수량 입고
  let stock_qs = await pool.query("SELECT * FROM stock_quantities ORDER BY stock_name ASC",[])
  stock_qs = stock_qs.rows;
  for (let i =0; i<8;i++){
    let ipgo=stock_qs[i][year] - stock_qs[i][year-1];
    await pool.query("UPDATE current_stocks SET quantity = quantity+$1 WHERE stock_name =$2",[ipgo,i]);

  }

  // 물량 업데이트
 await pool.query("UPDATE jo SET budget = budget+100",[])
 await pool.query("UPDATE jo SET cash = cash+100",[])
  response.redirect("/");
})

async function initialize(str) {
  if (str=="."){

  } else if (str=="ipchal") {
    await pool.query("UPDATE jo SET past_ipchal = ipchal",[]);
    await pool.query("UPDATE jo SET ipchal = DEFAULT",[]);
  }

}
router.get('/',  async (request, response) => {
  if (!auth.isOwner(request, response)) {
    response.redirect('/auth/login');
    return false;
  }
  //console.log(request.user.email);
  var fmsg = request.flash();
  var feedback = '';
  if(fmsg.success){
    feedback = fmsg.success[0];
  }
  const query = {
    text: "SELECT * FROM stock_prices",
    values: [],
  };
 //
 // const {rows} = await pool.query("SELECT * FROM stock_quantities ORDER BY stock_name ASC",[]);
 const a =await pool.query("SELECT * FROM current_info",[]);
  //console.log(a.rows); //[ { name: 'year', value_str: null, value_int: 2015 } ]
  let jo_info =await pool.query("SELECT * FROM jo WHERE jo = $1",[parseInt(1)]);
  if (request.user.email != "admin"){
     jo_info =await pool.query("SELECT * FROM jo WHERE jo = $1",[parseInt(request.user.email)]);
  }
  var title = 'Welcome';
  var description = 'Hello, Node.js';
  var list = template.list(request.list);
  var year = parseInt(a.rows[0]['value_int']);
  var html = template.HTML(request.user,year,jo_info.rows[0]);
  response.send(html);

});

function algorithm(inlist,mamul) {
 let length = inlist.length
 let suml = inlist.reduce((partialSum, a) => partialSum + a, 0)
 if (suml==0){
   return inlist;
 } else if (suml <=mamul) {
     return inlist;
 }
 let int_list=[];
 for (let i=0; i<length; i++){
     inlist[i] =inlist[i]*mamul/ suml;
     int_list.push(Math.floor(inlist[i]));
 }

 let delta = Math.min(mamul/50.0, 0.05);
 let int_sum = int_list.reduce((partialSum, a) => partialSum + a, 0);
 let new_suml =inlist.reduce((partialSum, a) => partialSum + a, 0)
 while (mamul>int_sum) {
     for (let i=0; i<length; i++){
         inlist[i]*=(1+delta);
         int_list[i]=Math.floor(inlist[i]);
     }
     int_sum =int_list.reduce((partialSum, a) => partialSum + a, 0);
 }
 if (mamul<int_sum){
     for (let i=0; i<length; i++){
         inlist[i]/=(1+delta);
         int_list[i]=Math.floor(inlist[i]);
     }

 }
 return int_list

}
router.post('/sell',  async (request, response) => {
  if (!auth.isOwner(request, response)) {
    response.redirect('/auth/login');
    return false;
  }
  let post = request.body;
  const jo_id = request.user.email;
  let jongmok = post["maedo"];
  let num = post["number2"];

  if (jongmok){
    let  year = await pool.query("SELECT value_int FROM current_info WHERE name=$1",["year"]);
    year=year.rows[0]["value_int"];
    let sell_price  =await pool.query("SELECT * FROM stock_prices WHERE stock_name = $1",[jongmok])
    sell_price = sell_price.rows[0][year];

    let stocks =await pool.query("SELECT stocks FROM jo WHERE jo = $1",[jo_id])
    stocks = stocks.rows[0]['stocks'];
    stocks[jongmok]-=num;
    await pool.query("UPDATE jo SET cash = cash+$1 WHERE jo = $2",[sell_price*num ,jo_id])
    await pool.query("UPDATE jo SET budget = budget+$1 WHERE jo = $2",[sell_price*num ,jo_id])
    await pool.query("UPDATE jo SET stocks = $1 WHERE jo = $2",[stocks ,jo_id])
    await pool.query("UPDATE current_stocks SET quantity = quantity+$1 WHERE stock_name = $2",[num ,jongmok])

}
 //
  response.redirect("/");
  //response.send(`<script>alert("입찰이 완료되었습니다."); window.location.href = "/"; </script>`);
  //response.send(<script>alert("your alert message"); window.location.href = "/page_location"; </script>);
});

router.post('/buy',  async (request, response) => {
  if (!auth.isOwner(request, response)) {
    response.redirect('/auth/login');
    return false;
  }
  let post = request.body;
  console.log(post);
  const jo_id = request.user.email;
  const lev_check = post["leverage_check"];
  console.log("lev check",lev_check);
  if (lev_check){
    await pool.query("UPDATE jo SET leverage = $1 WHERE jo = $2",[[1,lev_check] ,jo_id]);
  }
  let ipchal_list =[]
  for (let i=0;i<8; i++){
    // eval("var "+"quantity"+i+" = "+post["quantity"+i]);
    // if (eval("quantity"+i)){
    //   let prev_ipchal = ipchals[i]; //[0*12]
    //   prev_ipchal[jo_id]=eval("quantity"+i);
    //   await pool.query("UPDATE current_stocks SET ipchals = $1 WHERE stock_name = $2 ",[prev_ipchal ,i])
    // }
    ipchal_list.push(parseInt(post["quantity"+i]));
  }
  console.log(jo_id);
  console.log(ipchal_list);
  await pool.query("UPDATE jo SET ipchal = $1 WHERE jo = $2",[ipchal_list ,jo_id])
 //
  response.redirect("/");
  //response.send(`<script>alert("입찰이 완료되었습니다."); window.location.href = "/"; </script>`);
  //response.send(<script>alert("your alert message"); window.location.href = "/page_location"; </script>);
});

//   const result = await client.query({
//   rowMode: 'array',
//   text: 'SELECT * FROM stock_prices',
// })
  // client
  //     .query(query)
  //     .then((res) => {
  //         a = res.rows;
  //         console.log(res.rows);
  //         client.end();
  //     })
  //     .catch((e) => console.error(e.stack));
    // pool.query('SELECT * FROM stock_prices', [], (err, result) => {
  // if (err) {
  //   return console.error('Error executing query', err.stack)
  // }

// })
module.exports = router;
