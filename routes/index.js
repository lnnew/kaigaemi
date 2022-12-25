var express = require('express');
var router = express.Router();
var template = require('../lib/template2.js');
var auth = require('../lib/auth');
const { Pool } = require('pg')
const pool = new Pool({
 connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

router.get('/',  async (request, response) => {
  if (!auth.isOwner(request, response)) {
    response.redirect('/auth/login');
    return false;
  }
  var fmsg = request.flash();
  var feedback = '';
  if(fmsg.success){
    feedback = fmsg.success[0];
  }
  const query = {
    text: "SELECT * FROM stock_prices",
    values: [],
  };

 const {rows} = await pool.query("SELECT * FROM stock_quantities ORDER BY stock_name ASC",[]);
 const a =await pool.query("SELECT * FROM current_info",[]);
  //console.log(a.rows); //[ { name: 'year', value_str: null, value_int: 2015 } ]
  var title = 'Welcome';
  var description = 'Hello, Node.js';
  var list = template.list(request.list);
  var year = parseInt(a.rows[0]['value_int']);
  console.log(year);
  var html = template.HTML(request.user,year);
  response.send(html);
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
