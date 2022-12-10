var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'arirangproject'
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

// 게시판에 테이블 내용을 출력할때
function getNotice(callback) {
  connection.query('SELECT * FROM arirangnotice ORDER BY id DESC', (err, rows, fields) => {
    if (err) throw err;
    callback(rows);
  });
};


module.exports = {
  getNotice
};