const { Client } = require("pg");
const client = new Client({
  user: "postgres",
  host: "127.0.0.1",
  database: "nodedb",
  password: "0329",
  port: 5432,
});
// client.connect();
const query = {
    text: "INSERT INTO wallet VALUES ($1, $2)",
    values: [0,[0,0,0,0,0,0,0,0]],
};
// client
//     .query(query)
//     .then((res) => {
//         console.log(res);
//         client.end();
//     })
//     .catch((e) => console.error(e.stack));
// const query = {
//   text: "DELETE FROM member WHERE id = $1",
//   values: [1],
// };
// const query1 = {
//   text: "SELECT * FROM wallet",
//   values: [],
// };
//res.rows [ { id: 1, name: '홍길동' }, { id: 2, name: '홍길q동' } ]
const query1 = {
  text: "SELECT * FROM wallet",
  values: [],
};
client
    .query(query)
    .then((res) => {
        console.log(res.rows);
        client.end();
    })
    .catch((e) => console.error(e.stack));
