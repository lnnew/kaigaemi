module.exports = {
  HTML:function(user, year,jo_info,jangos,ipchals,ranking){
    let jango_str ="["
    //jango :quantities
    let p_jango =[];
    for (let i=0;i<8;i++){
      p_jango.push(parseInt(jangos[i]['quantity']));
    }
    function three_num(price){
      price = price*10000;
      p1s = price.toLocaleString('ko-KR');
      return p1s;
    }
    return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
      <script src="https://kit.fontawesome.com/643b7edb9b.js" crossorigin="anonymous"></script>
      <script
      src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js">
      </script>
      <script>var prices =[
                {
                  '2016': 12,
                  '2017': 14,
                  '2018': 16,
                  '2019': 12,
                  '2020': 18,
                  '2021': 16,
                  '2022': 14,
                  stock_name: 0
                },
                {
                  '2016': 5,
                  '2017': 5,
                  '2018': 8,
                  '2019': 7,
                  '2020': 5,
                  '2021': 6,
                  '2022': 7,
                  stock_name: 1
                },
                {
                  '2016': 25,
                  '2017': 26,
                  '2018': 35,
                  '2019': 32,
                  '2020': 37,
                  '2021': 56,
                  '2022': 45,
                  stock_name: 2
                },
                {
                  '2016': 50,
                  '2017': 58,
                  '2018': 46,
                  '2019': 44,
                  '2020': 40,
                  '2021': 44,
                  '2022': 51,
                  stock_name: 3
                },
                {
                  '2016': 20,
                  '2017': 17,
                  '2018': 13,
                  '2019': 19,
                  '2020': 24,
                  '2021': 16,
                  '2022': 15,
                  stock_name: 4
                },
                {
                  '2016': 30,
                  '2017': 38,
                  '2018': 42,
                  '2019': 38,
                  '2020': 36,
                  '2021': 43,
                  '2022': 49,
                  stock_name: 5
                },
                {
                  '2016': 20,
                  '2017': 22,
                  '2018': 19,
                  '2019': 18,
                  '2020': 23,
                  '2021': 12,
                  '2022': 13,
                  stock_name: 6
                },
                {
                  '2016': 100,
                  '2017': 130,
                  '2018': 91,
                  '2019': 109,
                  '2020': 174,
                  '2021': 157,
                  '2022': 102,
                  stock_name: 7
                }
              ];
      var quantities=[{
                      '2016': 35,
                      '2017': 37,
                      '2018': 40,
                      '2019': 42,
                      '2020': 42,
                      '2021': 44,
                      stock_name: 0
                    },
                    {
                      '2016': 65,
                      '2017': 70,
                      '2018': 80,
                      '2019': 90,
                      '2020': 90,
                      '2021': 95,
                      stock_name: 1
                    },
                    {
                      '2016': 20,
                      '2017': 22,
                      '2018': 24,
                      '2019': 28,
                      '2020': 28,
                      '2021': 30,
                      stock_name: 2
                    },
                    {
                      '2016': 10,
                      '2017': 12,
                      '2018': 14,
                      '2019': 18,
                      '2020': 18,
                      '2021': 18,
                      stock_name: 3
                    },
                    {
                      '2016': 24,
                      '2017': 25,
                      '2018': 26,
                      '2019': 34,
                      '2020': 34,
                      '2021': 37,
                      stock_name: 4
                    },
                    {
                      '2016': 20,
                      '2017': 22,
                      '2018': 24,
                      '2019': 25,
                      '2020': 25,
                      '2021': 27,
                      stock_name: 5
                    },
                    {
                      '2016': 24,
                      '2017': 25,
                      '2018': 26,
                      '2019': 34,
                      '2020': 34,
                      '2021': 37,
                      stock_name: 6
                    },
                    {
                      '2016': 3,
                      '2017': 3,
                      '2018': 4,
                      '2019': 5,
                      '2020': 5,
                      '2021': 7,
                      stock_name: 7
                    }];
                    var year = ${year};
                    var wallet= [${jo_info['stocks'][0]},${jo_info['stocks'][1]},${jo_info['stocks'][2]},${jo_info['stocks'][3]},${jo_info['stocks'][4]},
                    ${jo_info['stocks'][5]},${jo_info['stocks'][6]},${jo_info['stocks'][7]}];
                    var budget = ${jo_info["budget"]};
                    var year_budget =${jo_info["year_budget"]};
                    var cash = ${jo_info["cash"]};
                    var leverage = [${jo_info["leverage"][0]},${jo_info["leverage"][1]}];
                    var p_jangos = [${p_jango[0]},${p_jango[1]},${p_jango[2]},${p_jango[3]},${p_jango[4]},${p_jango[5]},${p_jango[6]},${p_jango[7]}];
                    var ipchals = [${ipchals[0]},${ipchals[1]},${ipchals[2]},${ipchals[3]},${ipchals[4]},${ipchals[5]},${ipchals[6]},${ipchals[7]}];
                    function refresh() {
                      for (let i = 0; i < 8; i++) { //for each stock

                        $("#quantity"+i).attr({
                           "max" : 2*quantities[i][year+""],        // substitute your own
                           "min" : 0       // values (or variables) here
                        });
                        let p1rice = prices[i][year+""]*10000;
                        let result =pure_three_num(p1rice);
                        $("#tprice"+i).text(result+" 원");

                        $( "#"+i+"_price").text(prices[i][year+""]);
                        $( "#"+i+"_quantity").text("("+p_jangos[i]+"주)"); //추가

                        //$( "#hint4").text("("+p_jangos[i]+"주)"); //추가

                        $( "#t_ipchal"+i).text(ipchals[i]+" 주");
                        if (year ==2016){
                          $( "#"+i+"_change").addClass("up");
                          $( "#"+i+"_change_percent").text(" (0%)");
                          $( "#"+i+"_change_i").addClass("fa-caret-up");
                          $( "#"+i+"_change").text(0.0);
                          $( "#"+i+"_wall").text(0);
                          $( "#gyul").text("초기 자산");
                        }else{


                          let delta =prices[i][year+""]-prices[i][(year-1)+""];

                          $( "#"+i+"_change").text(delta);
                          if (delta>0){
                            $( "#"+i+"_change_percent").text(" (+"+Math.round(100*delta/prices[i][(year-1)+""])+"%)");
                          }else{
                            $( "#"+i+"_change_percent").text(" ("+Math.round(100*delta/prices[i][(year-1)+""])+"%)");
                          }

                          $( "#"+i+"_wall").text(wallet[i]);
                          if (delta>0){
                            if ($( "#"+i+"_change_i").hasClass("fa-caret-down")) {
                              $( "#"+i+"_change_i").removeClass("fa-caret-down").addClass("fa-caret-up");
                              $( "#"+i+"_change").removeClass("down").addClass("up");
                              $( "#"+i+"_change_i").removeClass("down").addClass("up");
                              $( "#"+i+"_change_percent").removeClass("down").addClass("up");
                            }
                          }else{
                            if ($( "#"+i+"_change_i").hasClass("fa-caret-up")) {
                              $( "#"+i+"_change_i").removeClass("fa-caret-up").addClass("fa-caret-down");
                              $( "#"+i+"_change").removeClass("up").addClass("down");
                              $( "#"+i+"_change_i").removeClass("up").addClass("down");
                              $( "#"+i+"_change_precent").removeClass("up").addClass("down");
                            }
                          }
                        }
                      }

                      $('#jango').text("입찰 가능 금액:"+three_num(cash)+" 원");
                      for (let i=1;i<3;i++){
                        $('#jong'+i).text(Math.floor(year_budget*0.02*i));

                      }
                      $('#jong'+3).text(Math.floor(year_budget*0.08));

                      $("#hint4").val(Math.floor(year_budget*0.02*1));
                      $("#hint20").val(Math.floor(year_budget*0.04));
                      $("#hint8").val(Math.floor(year_budget*0.04));
                      $("#hint12").val(Math.floor(year_budget*0.08));
                      $('#po_hint').text(Math.floor(year_budget*0.04));
                      $('#budget_jango').text(three_num(budget));
                      $('#budget_cash').text(three_num(cash));
                      if (leverage[0]){
                         $('input:radio[name=leverage_check]').attr("disabled", false);
                         $("#leverage").attr("disabled", false);
                      } else{
                         $('input:radio[name=leverage_check]').attr("disabled", true);
                          $("#leverage").attr("disabled", true);
                      }


                    }


                    </script>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
      <style>
          body {
            background-color:#e8e8e8;
          }
          ul {
            list-style-type: none;
            margin: 0;
            padding: 0;
            overflow: hidden;
            background-color: #38444d;
          }

          li {
            float: left;
          }

          li a, .dropbtn {
            display: inline-block;
            color: white;
            text-align: center;
            padding: 14px 16px;
            text-decoration: none;
          }

          li a:hover, .dropdown:hover .dropbtn {
            background-color: red;
          }

          li.dropdown {
            display: inline-block;
          }

          .dropdown-content {
            display: none;
            position: absolute;
            background-color: #f9f9f9;
            min-width: 160px;
            box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
            z-index: 1;
          }

          .dropdown-content a {
            color: black;
            padding: 12px 24px;
            font-size:12px;
            text-decoration: none;
            display: block;
            text-align: left;
          }

          .dropdown-content a:hover {background-color: #f1f1f1;}

          .dropdown:hover .dropdown-content {
            display: block;
          }
          div.ex1 {
            width: 1300px;
            margin: 100px auto;
            padding: 30px 0px;
            border: 3px solid #01438f;
            background-color:white;
          }
          header {
            display:block;
            padding:2px;
            margin:0;
            top: 0px;
            background-color: #01438f;
          }
         hr {
            height:2px;
            background-color:#b3b3b3;
          }
      </style>
      <title>invAIST</title>
      </head>
      <body  onload="graph_select(0);refresh()">

      <header style="position:fixed; width:100%; left:0px;">
        <div class ="w3-row">
          <div class ="w3-col s4">
          <p style="color:white">

      &emsp;<i class="fa-solid fa-chart-simple"></i>&nbsp;invAIST</p>
      </div>
      <div class = "w3-col  s7">
        <a href ="/auth/logout"><p style ="text-align:right;color:white;"> 로그아웃
        </p></a>
      </div>
      </header>
      <style>
              .price{
                margin:0px;
                font-size: 25px;
              }
              .updown{
                margin:0px;
                padding-bottom: 10px;
                display:inline;
              }
              .updown1{
                margin:0px;
                font-size:13px;
                padding-bottom: 10px;
                display:inline;
              }
              #my-chart.line {
              height: 300px;
              max-width: 500px;
              margin: 0 auto;
            }
            .header_card {
              background-color: #f2f2f2;
              color:black;
              margin-left:30px;
            }
            #budget_jango, #budget_cash {
              font-size: 23px;
              margin:2px;
            }
        </style>
      <div class="ex1">
        <div class ="w3-row" style="padding-bottom:10px;"><div class ="w3-col s2"><h4><b><img src="https://scontent-ssn1-1.xx.fbcdn.net/v/t1.18169-9/18198205_1814895962162452_3040385849366417553_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=730e14&_nc_ohc=Tkx6Ckc2V4kAX-UsPwL&_nc_ht=scontent-ssn1-1.xx&oh=00_AfCLBnv7PJ2RPF44mvBQaPA524jTsRgG9EVYVR9fybcOFQ&oe=63CBF466"
           alt="Lamp" width="50" style = "border-radius: 30%; margin: 0px 30px; background-color:black;border: 2px solid black;" height="50">
        ${user.displayName}&nbsp;<a onclick="refresh()"> <i class="fa fa-refresh" aria-hidden="true" style="font-size:12px;"></i></a></h4></b>
      <button onclick="document.getElementById('id01').style.display='block'" class="w3-btn" style="border: 3px solid #4160a4;padding:5px;margin-left:30px;color:black; border-radius:7px;">순위표</button>
    </div>
      <div id="id01" class="w3-modal w3-animate-opacity">
      <div class="w3-modal-content" style="width:700px">
        <span onclick="document.getElementById('id01').style.display='none'"
    class="w3-closebtn" style="font-size:23px;left:95%;position:relative;">&times;</span>
    <style>
          .deung th:nth-child(1), .deung td:nth-child(1) {
                  width:10%;
                }
          .deung th:nth-child(2), .deung td:nth-child(2) {
                  width:10%;
                }
          .deung th:nth-child(3), .deung td:nth-child(3) {
                  width:80%;
                }

          .deung, .deung th, .deung td{
            text-align:center;
            width:70%;
            margin:auto;
          }
    </style>
    <p id ="gyul" style="margin-left:30px">${year}년 결과</p>
        <table class="deung" >
      <tr>
        <th>등수</th>
        <th>조</th>
        <th>잔고</th>
      </tr>
      <tr>
        <td>1</td>
        <td>${ranking[0]["jo"]} 조</td>
        <td>${three_num(ranking[0]["year_budget"])} 원</td>
      </tr>
      <tr>
        <td>2</td>
        <td>${ranking[1]["jo"]} 조</td>
        <td>${three_num(ranking[1]["year_budget"])} 원</td>
      </tr>
      <tr>
        <td>3</td>
        <td>${ranking[2]["jo"]} 조</td>
        <td>${three_num(ranking[2]["year_budget"])} 원</td>
      </tr>
      <tr>
        <td>4</td>
        <td>${ranking[3]["jo"]} 조</td>
        <td>${three_num(ranking[3]["year_budget"])} 원</td>
      </tr>
      <tr>
        <td>5</td>
        <td>${ranking[4]["jo"]} 조</td>
        <td>${three_num(ranking[4]["year_budget"])} 원</td>
      </tr>
      <tr>
        <td>6</td>
        <td>${ranking[5]["jo"]} 조</td>
        <td>${three_num(ranking[5]["year_budget"])} 원</td>
      </tr>
      <tr>
        <td>7</td>
        <td>${ranking[6]["jo"]} 조</td>
        <td>${three_num(ranking[6]["year_budget"])} 원</td>
      </tr>
      <tr>
        <td>8</td>
        <td>${ranking[7]["jo"]} 조</td>
        <td>${three_num(ranking[7]["year_budget"])} 원</td>
      </tr>
      <tr>
        <td>9</td>
        <td>${ranking[8]["jo"]} 조</td>
        <td>${three_num(ranking[8]["year_budget"])} 원</td>
      </tr>
      <tr>
        <td>10</td>
        <td>${ranking[9]["jo"]} 조</td>
        <td>${three_num(ranking[9]["year_budget"])} 원</td>
      </tr>
      <tr>
        <td>11</td>
        <td>${ranking[10]["jo"]} 조</td>
        <td>${three_num(ranking[10]["year_budget"])} 원</td>
      </tr>
      <tr>
        <td>12</td>
        <td>${ranking[11]["jo"]} 조</td>
        <td>${three_num(ranking[11]["year_budget"])} 원</td>
      </tr>
    </table>
      </div>
    </div>

        <div class = "w3-col s2 w3-card header_card">
          <p> &emsp;<i class="fa-sharp fa-solid fa-wallet" style="color:#01438f"></i>&nbsp;&nbsp;총 자산</p>
          <hr/>
          <p id ="budget_jango" style="text-align:center;margin-bottom:10px"> 2,000,000</p>
           <p style="text-align:right; margin:0px;padding-bottom:10px;margin-bottom:0px;">원&emsp;</p>
        </div>
        <div class = "w3-col s2 w3-card header_card">
          <p> &emsp;<i class="fa-sharp fa-solid fa-money-bill-transfer" style="color:#01438f"></i>&nbsp;&nbsp현금</p>
          <hr/>
          <p id ="budget_cash" style="text-align:center; margin-bottom:10px"> 2,000,000</p>
           <p style="text-align:right; margin:0px; padding-bottom:10px;margin-bottom:0px;">원&emsp;</p>
        </div>
        <div class = "w3-col s2 w3-card header_card">
          <p> &emsp;<i class="fa-sharp fa-solid fa-calendar" style="color:#01438f"></i>&nbsp;&nbsp;연도</p>
          <hr/>
          <p id ="budget" style="text-align:center; font-size:30px"> ${year+1}</p>
           <p style="text-align:right; margin:0px;padding-bottom:10px;margin-bottom:0px;">년&emsp;</p>
        </div>
        <div class = "w3-col s2 w3-card header_card">
          <p> &emsp;<i class="fa-sharp fa-solid fa-money-bill-transfer" style="color:#01438f"></i>&nbsp;&nbsp 힌트 가격</p>
          <hr style="height:1px; margin:0px;"/>
          <b><p style="font-size:11px; margin:10px;margin-bottom:2px;">종목별 힌트</p></b>
    <form onsubmit ="return validate_hint(this); " action = "/hint" method ="post">
          <div class="w3-row" style="text-align:center">
            <div class="w3-col s4">
              <p style="font-size:11px; margin-bottom:0px;">1단계</p>
              <input type="radio" id="hint4" name="hint" value="4" checked>
              <p id ="jong1" style="display:inline-block; font-size:13px;margin-top:2px">11</p><p style="display:inline-block;margin-top:4px">만</p>
            </div>
            <div class="w3-col s4">
              <p style="font-size:11px; margin-bottom:0px;">2단계</p>
              <input type="radio" id="hint8" name="hint" value="8">
              <p id ="jong2" style="display:inline-block; font-size:13px;margin-top:2px">11</p><p  style="display:inline-block;margin-top:4px">만</p>
            </div>
            <div class="w3-col s4">
              <p style="font-size:11px; margin-bottom:0px;">3단계</p>
              <input type="radio" id="hint12" name="hint" value="12">
              <p id ="jong3" style="display:inline-block; font-size:13px;margin-top:2px">11</p><p  style="display:inline-block;margin-top:4px">만</p>
            </div>
          </div>
          <hr style="height:1px; margin:0px;"/>
        <div><b><p style="font-size:11px; margin:10px;margin-bottom:2px;margin-right:17px;display:inline-block">포괄적 힌트</p></b>
          <input type="radio" id="hint20" name="hint" value="8">
          <p id ="po_hint" style="display:inline-block; font-size:13px;margin-top:2px">11</p><p  style="display:inline-block;margin-top:4px">만</p>

        </div>
        <div>
        <script>
          function validate_hint(form) {
            return confirm("총 "+Math.floor(parseInt($("input[name='hint']:checked").val()))+"만 원 어치의 힌트를 구매합니다.");
          }
        </script>

          <div class="w3-overflow">
        <div class="w3-col s3">
          <p></p>
        </div>
      <div class="w3-col s3">
          <input type="submit" style="margin:0px; padding:3px; width:100px" value="힌트 구매">
        </div>
      </div>
        </form>
        </div>

        </div>
        </div>
        <hr />
        <div class="w3-row">
        <div class="w3-col s9">
        <div class="w3-row">
        <style>
        .down{
          color:blue;
        }
        .up{
          color:red;
        }
        .stock-card {
          padding: 10px;
        }
        .stock_name{
          font-size: 15px;
          display:inline;
        }
        .stock_price {
          font-size: 23px;
          margin: 0px;
          display: inline;
        }
        .unit {
          font-size: 13px;
          display:inline;
        }
        .quantity {
          padding:0;
          margin:0;
          font-size: 12px;
        }

        </style>
        <div class="w3-col s2 w3-white stock-card w3-center">
                <div class="w3-card-4" style="padding-bottom:10px;">

                <header class="w3-container w3-light-gray" style= "padding-top:10px;padding-bottom:10px;">
                <p class ="stock_name">원혁엔터</p><p class ="quantity" id ="0_quantity">(3)</p>
                </header>

                <p class="stock_price" id="0_price">13<p class="unit">&nbsp;만 원 </p>
                <br/><i id="0_change_i" class="fa-solid fa-caret-down down"></i><p class= "updown down "id="0_change">&nbsp;-1.3</p><p class= "updown1 down "id="0_change_percent">(24%)</p>
                <hr style="margin:0;margin-bottom:3px;"><p class="stock_price" style="font-size:15px" id="0_wall">13</p><p class="unit">&nbsp;주 보유</p>

                </div>
        </div>
        <div class="w3-col s2 w3-white stock-card w3-center">
                <div class="w3-card-4" style="padding-bottom:10px;">

                <header class="w3-container w3-light-gray" style= "padding-top:10px;padding-bottom:10px;">
                <p class ="stock_name">하윤엔터 </p><p class ="quantity" id ="1_quantity">(3)</p>
                </header>

                <p class="stock_price"id="1_price">13</p><p class="unit">&nbsp;만 원 </p><br>
                <i id="1_change_i" class="fa-solid fa-caret-down down"></i>&nbsp;<p class= "updown down "id="1_change">-1.3</p><p class= "updown1 down "id="1_change_percent">(24%)</p>
                <hr style="margin:0;margin-bottom:3px;"><p class="stock_price" style="font-size:15px" id="1_wall">13</p><p class="unit">&nbsp;주 보유</p>


                </div>
        </div>
        <div class="w3-col s2 w3-white stock-card w3-center">
                <div class="w3-card-4" style="padding-bottom:10px;">

                <header class="w3-container w3-light-gray" style= "padding-top:10px;padding-bottom:10px;">
                <p class ="stock_name">소예IT</p><p class ="quantity" id ="2_quantity">(3)</p>
                </header>

                <p class="stock_price"id="2_price">13<p class="unit">&nbsp;만 원 </p>
                <br/><i id="2_change_i" class="fa-solid fa-caret-down down">&nbsp;</i><p class= "updown down "id="2_change">&nbsp;-1.3</p><p class= "updown1 down "id="2_change_percent">(24%)</p>
                  <hr style="margin:0;margin-bottom:3px;"><p class="stock_price" style="font-size:15px" id="2_wall">13</p><p class="unit">&nbsp;주 보유</p>


                </div>
        </div>
        <div class="w3-col s2 w3-white stock-card w3-center">
                <div class="w3-card-4" style="padding-bottom:10px;">

                <header class="w3-container w3-light-gray" style= "padding-top:10px;padding-bottom:10px;">
                <p class ="stock_name">준서건설</p><p class ="quantity" id ="3_quantity">(3)</p>
                </header>

                <p class="stock_price"id="3_price">13<p class="unit">&nbsp;만 원 </p>
                <br/><i id="3_change_i" class="fa-solid fa-caret-down down">  &nbsp;</i><p class= "updown down "id="3_change">&nbsp;-1.3</p><p class= "updown1 down "id="3_change_percent">(24%)</p>
                <hr style="margin:0;margin-bottom:3px;"><p class="stock_price" style="font-size:15px" id="3_wall">13</p><p class="unit">&nbsp;주 보유</p>


                </div>
        </div>
        <div class="w3-col s2 w3-white stock-card w3-center">
                <div class="w3-card-4" style="padding-bottom:10px;">

                <header class="w3-container w3-light-gray" style= "padding-top:10px;padding-bottom:10px;">
                <p class ="stock_name">윤정코스메틱</p><p class ="quantity" id ="4_quantity">(3)</p>
                </header>

                <p class="stock_price"id="4_price">13<p class="unit">&nbsp;만 원 </p>
                <br/><i id="4_change_i" class="fa-solid fa-caret-down down">&nbsp;</i><p class= "updown down "id="4_change">&nbsp;-1.3</p><p class= "updown1 down "id="4_change_percent">(24%)</p>
                <hr style="margin:0;margin-bottom:3px;"><p class="stock_price" style="font-size:15px" id="4_wall">13</p><p class="unit">&nbsp;주 보유</p>


                </div>
        </div>
        <div class="w3-col s2 w3-white stock-card w3-center">
                <div class="w3-card-4" style="padding-bottom:10px;">

                <header class="w3-container w3-light-gray" style= "padding-top:10px;padding-bottom:10px;">
                <p class ="stock_name">카눌국방</p><p class ="quantity" id ="5_quantity">(3)</p>
                </header>

                <p class="stock_price"id="5_price">13<p class="unit">&nbsp;만 원 </p>
                <br/><i id="5_change_i" class="fa-solid fa-caret-down down">&nbsp;</i><p class= "updown down "id="5_change">&nbsp;-1.3</p><p class= "updown1 down "id="5_change_percent">(24%)</p>
                <hr style="margin:0;margin-bottom:3px;"><p class="stock_price" style="font-size:15px" id="5_wall">13</p><p class="unit">&nbsp;주 보유</p>


                </div>
        </div>

      </div>
        <strong><p id ="graph_name" style="margin:auto;text-align:center;margin-top:50px;font-size:17px" >111</p></strong>
      <div class= "w3-row">
        <div class ="w3-col s9" style ="margin-left:120px; margin-top:10px;">
      <canvas id="myChart" style="width:100%;max-width:800px" >></canvas>
      </div>
          <div class= "w3-col s3">

          </div>
      </div>
      <script>
          var xValues = [2017,2018,2019,2020,2021,2022];
          var yValues = [0,0,0,0,0,0];
          var y1Values = [0,0,0,0,0,0];


          new Chart("myChart", {
            type: "line",
            data: {
              labels: xValues,
              datasets: [{
                fill: false,
                lineTension: 0,
                backgroundColor: "rgba(0,0,255,1.0)",
                borderColor: "rgba(0,0,255,0.1)",
                data: yValues
              }]
            },
            options: {
              legend: {display: false},
              scales: {
                yAxes: [{ticks: {min: 6, max:80}}],
              }
            }
          });

          var stock_names = ["원혁엔터","하윤엔터","소예IT","석범건설","윤정코스메틱","카눌국방","예림교통","카이코인"]
          function graph_select(jo) { //jo:주식 종목
            var year = ${year}+1;
            var xValues = [2017,2018,2019,2020,2021,2022];
            var limit = 1+xValues.indexOf(parseInt(year));
            xValues = xValues.slice(0,Math.min(limit,6));
            //var yValues = prices[jo][year].slice(0,limit);
            var yValues = [];
            for (let i = 2017; i<=year;i++) {
              yValues.push(prices[parseInt(jo)][""+i]);
            }
            $('#graph_name').text(stock_names[parseInt(jo)])

            new Chart("myChart", {
              type: "line",
              data: {
                labels: xValues,
                datasets: [{
                  fill: false,
                  lineTension: 0,
                  backgroundColor: "rgba(0,0,255,1.0)",
                  borderColor: "rgba(0,0,255,0.1)",
                  data: yValues
                }]
              },
              options: {
                legend: {display: false},
                scales: {
                  yAxes: [{ticks: {min:parseInt(Math.min(...yValues)*0.7) , max:parseInt(Math.max(...yValues)*1.3) }}],
                }
              }
            });
          }
      </script>
      <div class="dropdown">
      <button class="w3-button dropbtn">종목 선택</button>
      <div class="dropdown-content">
        <a onclick="graph_select(0);">원혁엔터</a>
        <a onclick="graph_select(1);">하윤엔터</a>
        <a onclick="graph_select(2);">소예IT</a>
        <a onclick="graph_select(3);">준서건설</a>
        <a onclick="graph_select(4);">윤정코스메틱</a>
        <a onclick="graph_select(5);">카눌국방</a>
        <a onclick="graph_select(6);">예림교통</a>
        <a onclick="graph_select(7);">카이코인</a>
      </div>
      </div>
      <style>
            .dropbtn {
              background-color: #01438f;
              color: white;
              padding: 8px;
              font-size: 12px;
              border: none;
              border-radius:6px;
            }

            .dropdown {
              position: relative;
              display: inline-block;
              margin-left:130px;
            }

            .dropdown-content {
              display: none;
              position: absolute;
              background-color: #f1f1f1;
              min-width: 100px;
              box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
              z-index: 1;
            }

            .dropdown-content a {
              color: black;
              padding: 8px 8px;
              text-decoration: none;
              display: block;
            }

            .dropdown-content a:hover {background-color: #<input type="checkbox" name="buy" value="260" checked="" onclick="javascript:basket.checkItem();">&nbsp;;}

            .dropdown:hover .dropdown-content {display: block;}

            .dropdown:hover .dropbtn {background-color: #bdbdbd;}
      </style>
      <div class = "w3-row">
        <div class="w3-col s4  w3-card">

        </div>
      </div>
      </div>
      <div class = "w3-col s3">

            <style>
                  input[type=text], input[type=number],select {
                    width: 100%;
                    padding: 6px 0px;
                    padding-left:7px;
                    margin: 3px 5px;
                    display: block;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    box-sizing: border-box;
                  }

                  input[type=submit] {
                    width: 100%;
                    background-color: #4160a4;
                    color: white;
                    padding: 14px 20px;
                    margin: 8px 0;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                  }
                  #submit_btn2 {
                    width: 100%;
                    background-color:#d42619;
                    color: white;
                    padding: 14px 20px;
                    margin: 8px 0;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                  }
                  #submit_btn2:hover {
                    background-color: #cf7c76;
                  }
                  input[type=submit]:hover {
                    background-color: #6e89c2;
                  }

                  div.container {
                    border-radius: 5px;
                    background-color: #f2f2f2;
                    padding: 20px;
                    margin: 20px;
                    margin-bottom: 30px;
                    font-size: 13px;
                  }
                  .w3-card-4 {
                    border-radius:20px;
                  }

            </style>
            <div class="w3-row">
            <div class="w3-col s6 w3-white stock-card w3-center">
                    <div class="w3-card-4" style="padding-bottom:10px;">

                    <header class="w3-container w3-light-gray" style= "padding-top:10px;padding-bottom:10px;">
                    <p class ="stock_name">예림교통</p><p class ="quantity" id ="6_quantity">(3)</p>
                    </header>

                    <p class="stock_price"id="6_price">13<p class="unit">&nbsp;만 원 </p>
                    <br/><i id="6_change_i" class="fa-solid fa-caret-down down">&nbsp;</i><p class= "updown down "id="6_change">&nbsp;-1.3</p><p class= "updown1 down "id="6_change_percent">(24%)</p>
                      <hr style="margin:0;margin-bottom:3px;"><p class="stock_price" style="font-size:15px" id="6_wall">13</p><p class="unit">&nbsp;주 보유</p>


                    </div>
            </div>
            <div class="w3-col s6 w3-white stock-card w3-center">
                    <div class="w3-card-4 w3-light-gray" style="padding-bottom:10px;">

                    <header class="w3-container w3-gray" style= "padding-top:10px;padding-bottom:10px;">
                    <p class ="stock_name">카이코인</p><p class ="quantity" id ="7_quantity">(3)</p>
                    </header>

                    <p class="stock_price"id="7_price">13<p class="unit">&nbsp;만 원 </p>
                    <br/><i id="7_change_i" class="fa-solid fa-caret-down down">&nbsp;</i><p class= "updown down "id="7_change">&nbsp;-1.3</p><p class= "updown1 down "id="7_change_percent">(24%)</p>
                      <hr style="margin:0;margin-bottom:3px;"><p class="stock_price" style="font-size:15px" id="7_wall">13</p><p class="unit">&nbsp;주 보유</p>


                    </div>
            </div>
          </div>
            <div class="container">
              <script>
              function a_ipchal(form){
                let jongmok = $('#ipchal').val();
                let quantity =  $('#number').val();
                if(!jongmok){// is null
                  alert("종목을 선택해주세요.");
                } else if (!quantity) {
                  alert("수량을 선택해주세요.");
                } else {
                  $("#quantity"+jongmok).attr("value",quantity);
                  alert(stock_names[jongmok]+" "+quantity+"주를 입찰 희망 목록에 담았습니다.");
                  if($('#leverage').is(":checked")) {
                      $('input:radio[name=leverage_check]:input[value=' +jongmok + ']').attr("checked", true);
                      $("#leverage").attr("disabled", true);
                  }
                  cart_sum();
                  cart_quantity(jongmok);
                  $("#number").val('');
                  $("#ipchal").val('');
                  $("#sum_price").val('');
                }

              }
              </script>
              <form  method="post" onsubmit="a_ipchal(this);return false">
                <label for="country"><b>입찰</b></label>
                <select id="ipchal" name="ipchal">
                  <option value="" selected disabled hidden >입찰할 주식을 선택해주세요.</option>
                  <option value="0">원혁엔터</option>
                  <option value="1">하윤엔터</option>
                  <option value="2">소예IT</option>
                  <option value="3">준서건설</option>
                  <option value="4">윤정코스메틱</option>
                  <option value="5">카눌국방</option>
                  <option value="6">예림교통</option>
                  <option value="7">카이코인</option>
                </select>
                <label for="number"><p id="ipchal_suryang">입찰 수량 (최대:)<tr></p></label>

                  <input id="number" type=number min=1 max=110>

                <br/>

                <label for="lname">총 입찰 가격</label>
                <input type="text" id="sum_price" name="sum_price"  disabled>
                <br/>
                <label for="lname">&emsp;x2.0</label>
                <input type="checkbox" name="leverage" id="leverage"  value="st2" >
                <script>
                $("#ipchal").on('change', function() {
                  let stock_name1 =  parseInt($('#ipchal').val());
                  $('#ipchal_suryang').text("입찰 수량 (최대:"+p_jangos[stock_name1]+")")
                  $("#number").attr({
                     "max" : p_jangos[stock_name1],        // substitute your own
                     "min" : 1       // values (or variables) here
                  });
                });
                // $("#maedo").on('change', function() {
                //   let stock_na1me1 =  parseInt($('#maedo').val());
                //   $('#maedo_suryang').text("매도 수량 (잔고:"+wallet[stock_na1me1]+")")
                //   $("#number2").attr({
                //      "max" : wallet[stock_na1me1],        // substitute your own
                //      "min" : 1       // values (or variables) here
                //   });
                // });
                function maedo_q(sel) {
                  let sname = sel.value;
                  $('#maedo_suryang').text("매도 수량 (잔고:"+wallet[sname]+")")
                  $("#number2").attr({
                     "max" : wallet[sname],        // substitute your own
                     "min" : 0       // values (or variables) here
                  });
                }
                $("#number").on("input", function() {
                   const stock_name1 =  parseInt($('#ipchal').val());
                   stock_p = parseInt(prices[stock_name1][year+""]);
                   $('#sum_price').attr("value",three_num(stock_p*$('#number').val()));
                });
                </script>
                <br/>
                <br/>
                <input type="submit" value="입찰">
              </form>
              </div>

              <div class="container">
                <form action="/sell" method="post">
                  <label for="country"><b>매도</b></label>
                  <select id="maedo" name="maedo" onchange="maedo_q(this)">
                    <option value="" selected disabled hidden >매도할 주식을 선택해주세요.</option>
                    <option value="0">원혁엔터</option>
                    <option value="1">하윤엔터</option>
                    <option value="2">소예IT</option>
                    <option value="3">준서건설</option>
                    <option value="4">윤정코스메틱</option>
                    <option value="5">카눌국방</option>
                    <option value="6">예림교통</option>
                    <option value="7">카이코인</option>
                  </select>
                    <label for="number2" ><p id ="maedo_suryang">매도 수량 <tr></p></label>

                    <input id="number2" name ="number2"  type=number min=1 max=110>

                  <br/>

                  <label for="lname">총 매도 가격</label>
                  <input type="text" id="sum_price2" name="sum_price2" readonly>

                  <script>
                  $("#number2").on("input", function() {
                     const stock_name =  parseInt($('#maedo').val());
                     stock_p = parseInt(prices[stock_name][year+""]);
                     $('#sum_price2').attr("value",three_num(stock_p*$('#number2').val())+"원");
                  });
                  // $("#maedo").on('change', function() {
                  //   const stock_name =  parseInt($('#maedo').val());
                  //   $('#maedo_suryang').text("판매 수량 (최대:"+quantities[stock_name][year+""]+")"); //TODO: 진짜 잔고로 대체
                  // });
                  </script>

                  <input type="submit" id = "submit_btn2" value="매도">
                </form>
                </div>
      </div>
      <style>
      .check{
        width:4%;

      }
      .jong{
        width: 16%;
      }
      .tprice{
       width: 20%;
      }
      .tupdown{
        width: 15%;
      }
      .p_num{
        width:30px;
      }
      </style>
      <script>
      function validate(form) {
        let sum =0;
        for (let i=0; i<8;i++){
              sum+=prices[i][year+""]*$('#quantity'+i).val();

        }
          let valid = cash>=sum;

          if(!valid) {
              alert('입찰 가능 금액보다 총 입찰액이 많습니다. 입찰에 실패하였습니다.');
              return false;
          }
          else {
              return confirm("총 입찰 금액은 "+$('#cart_sum').text().slice(3)+"입니다.계속하시겠습니까?");
          }
      }

      function validate_sell(form) {

          // validation code here ...

          valid = true;
          let jo = form.maedo;

          if(!valid) {
              alert('Please correct the errors in the form!');
              return false;
          }
          else {

              return confirm("총 입찰 금액은 "+$('#cart_sum').text().slice(3)+"입니다. 정말로 입찰하시겠습니까?");
          }
      }
      function three_num(price){
        price = price*10000;
        p1s = price.toLocaleString('ko-KR');
        return p1s;
      }
      function pure_three_num(price){
        p1s = price.toLocaleString('ko-KR');
        return p1s;
      }
      function cart_quantity(jo){
        let lp = prices[jo][year+""]*10000*$('#quantity'+jo).val();
        let result = pure_three_num(lp);
         $('#tsum'+jo).text(result+"원");
         cart_sum();
      }
      function cart_sum() {
        var sum =0;
        for (let i=0; i<8;i++){
              sum+=prices[i][year+""]*10000*$('#quantity'+i).val();

        }
        let sresult = pure_three_num(sum);
        $('#cart_sum').text("합계:"+sresult+" 원");
      }

      </script>
      <form onsubmit="return validate(this);" action ="/buy" style="width:80%;margin:auto;" method="post">
      <table>
        <tr>
          <th class = "check"></th>
          <th class ="jong">종목</th>
          <th class = "tupdown">수량</th>
          <th class= "tprice">가격</th>
          <th>합계</th>
          <th>레버리지</th>
          <th>현재 입찰량</th>
        </tr>
        <tr>
          <td class = "check"><input type="checkbox" name="buy" id="cart0" checked="" onclick="javascript:checkItem();">&nbsp;</td>
          <td class = "jong">원혁엔터</td>
          <td>
            <div class="tupdown">
              <!-- onkeyup="my_calc( this.form.number, this.form.stock_price, this.form.sum_price)" -->
              <input type="number" style ="width:55px;"name="quantity0" id="quantity0" size="3" maxlength="4" class="p_num" value="0" onchange="cart_quantity(0)" min = 0 max= 1000>
            </div>
          </td>
          <td><p id = "tprice0"></p></td>
          <td><p id ="tsum0"></p></td>
          <td><input name="leverage_check" value="0"type="radio"></td><td><p id = "t_ipchal0"></p></td>
        </tr>
        <tr>
          <td class = "check"><input type="checkbox" name="buy" value="260" checked="" onclick="javascript:basket.checkItem();">&nbsp;</td>
          <td class = "jong">하윤엔터</td>
          <td>
            <div class="tupdown">
              <input type="number" style ="width:55px;"name="quantity1" id="quantity1" size="3" maxlength="4" class="p_num" value="0" onchange="cart_quantity(1)" min = 0 max= 1000>
            </div>
          </td>
          <td><p id = "tprice1"></p></td>
          <td><p id ="tsum1"></p></td>
          <td><input name="leverage_check" value="1" type="radio"></td><td><p id = "t_ipchal1"></p></td>
        </tr>
        <tr>
          <td class = "check"><input type="checkbox" name="buy" value="260" checked="" onclick="javascript:basket.checkItem();">&nbsp;</td>
          <td class = "jong">소예IT</td>
          <td>
            <div class="tupdown">
              <input type="number" style ="width:55px;"name="quantity2" id="quantity2" size="3" maxlength="4" class="p_num" value="0" onchange="cart_quantity(2)" min = 0 max= 1000>
            </div>
          </td>
          <td><p id = "tprice2"></p></td>
          <td><p id ="tsum2"></p></td>
          <td><input name="leverage_check" value="2"type="radio"></td><td><p id = "t_ipchal2"></p></td>
        </tr>
        <tr>
          <td class = "check"><input type="checkbox" name="buy" value="260" checked="" onclick="javascript:basket.checkItem();">&nbsp;</td>
          <td class = "jong">준서건설</td>
          <td>
            <div class="tupdown">
              <input type="number" style ="width:55px;"name="quantity3" id="quantity3" size="3" maxlength="4" class="p_num" value="0" onchange="cart_quantity(3)" min = 0 max= 1000>
            </div>
          </td>
          <td><p id = "tprice3"></p></td>
          <td><p id ="tsum3"></p></td>
          <td><input name="leverage_check" value="3"type="radio"></td><td><p id = "t_ipchal3"></p></td>
        </tr>
        <tr>
          <td class = "check"><input type="checkbox" name="buy" value="260" checked="" onclick="javascript:basket.checkItem();">&nbsp;</td>
          <td class = "jong">윤정코스메틱</td>
          <td>
            <div class="tupdown">
              <input type="number" style ="width:55px;"name="quantity4" id="quantity4" size="3" maxlength="4" class="p_num" value="0" onchange="cart_quantity(4)" min = 0 max= 1000>
            </div>
          </td>
          <td><p id = "tprice4"></p></td>
          <td><p id ="tsum4"></p></td>
          <td><input name="leverage_check" value="4"type="radio"></td><td><p id = "t_ipchal4"></p></td>
        </tr>
        <tr>
          <td class = "check"><input type="checkbox" name="buy" value="260" checked="" onclick="javascript:basket.checkItem();">&nbsp;</td>
          <td class = "jong">카눌국방</td>
          <td>
            <div class="tupdown">
              <input type="number" style ="width:55px;"name="quantity5" id="quantity5" size="3" maxlength="4" class="p_num" value="0" onchange="cart_quantity(5)" min = 0 max= 1000>
            </div>
          </td>
          <td><p id = "tprice5"></p></td>
          <td><p id ="tsum5"></p></td>
          <td><input name="leverage_check" value="5"type="radio"></td><td><p id = "t_ipchal5"></p></td>
        </tr>
        <tr>
          <td class = "check"><input type="checkbox" name="buy" value="260" checked="" onclick="javascript:basket.checkItem();">&nbsp;</td>
          <td class = "jong">예림교통</td>
          <td>
            <div class="tupdown">
              <input type="number" style ="width:55px;"name="quantity6" id="quantity6" size="3" maxlength="4" class="p_num" value="0" onchange="cart_quantity(6)" min = 0 max= 1000>
            </div>
          </td>
          <td><p id = "tprice6"></p></td>
          <td><p id ="tsum6"></p></td>
          <td><input name="leverage_check" value="6"type="radio"></td><td><p id = "t_ipchal6"></p></td>
        </tr>
        <tr>
          <td class = "check"><input type="checkbox" name="buy" value="260" checked="" onclick="javascript:basket.checkItem();">&nbsp;</td>
          <td class = "jong">카이코인</td>
          <td>
            <div class="tupdown">
              <input type="number" style ="width:55px;"name="quantity7" id="quantity7" size="3" maxlength="4" class="p_num" value="0" onchange="cart_quantity(7)" min = 0 max= 1000>
            </div>
          </td>
          <td><p id = "tprice7"></p></td>
          <td><p id ="tsum7"></p></td>
          <td><input name="leverage_check" value="7"type="radio"></td><td><p id = "t_ipchal7"></p></td>
        </tr>
      </table>
      <div class="w3-row">
        <div  class= "w3-col s6">
          <p></p>
        </div>

      <div class="w3-col s4" style="font-size:15px;">
        <p id ="cart_sum" style="text-align:right; margin-right:30px;margin-bottom:0px;">합계: 0 원</p>
        <p id ="jango" style="text-align:right; margin-right:30px; margin-top:0px;">입찰 가능 금액: 0 원</p>
      </div>
      <div  class= "w3-col s2">
      <input type="submit" class= " w3-button w3-round-large" style ="width: 100px;margin-top:10px"value="최종 입찰">
      </div>
      </div>
      </form>
      <style>
          table {
            font-family: arial, sans-serif;
            border-collapse: collapse;
            width: 100%;
          }
          th {
            background-color:lightgray;
          }
          td, th {
            text-align: left;
            padding: 8px;
            min-width:70px;
          }

          th:nth-child(3), td:nth-child(3) {
            width:120px;
          }
      </style>


      </div>

      </div>
      <footer style ="font-size:10px; text-align:center">
        <p>- 2023 창의적글로벌리더캠프 경쟁 프로그램 - <br>
        <a href="https://kainuri.kaist.ac.kr/" target="_blank">made by 카이누리 17기</a></p>
      </footer>

      </body>
      </html>















`;
  },list:function(filelist){
    var list = '<ul>';
    var i = 0;
    while(i < filelist.length){
      list = list + `<li><a href="/topic/${filelist[i]}">${filelist[i]}</a></li>`;
      i = i + 1;
    }
    list = list+'</ul>';
    return list;
  }
}
