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

// 게시판을 생성할때 (테이블에 내용을 넣기위함)
function insertNotice(write_user, not_tit, not_content, callback) {
  connection.query(`INSERT INTO arirangnotice(create_time, write_user, not_tit, not_content) VALUES(NOW(), '${write_user}', '${not_tit}', '${not_content}')`,(err)=>{
    if(err) throw err;
    callback();
  });
};

// 게시판 중 id가 일치하는 데이터만 추출 (수정할때 필요)
function getNoitceByid(id, callback){
  connection.query(`SELECT * FROM arirangnotice WHERE id=${id}`, (err, row)=>{
    if(err) throw err;
    callback(row);
  });
};

// 게시판의 수정할때 (테이블에 수정된내용을 넣기위함)
function updateNotice(id, write_user, not_tit, not_content, callback){
  connection.query(`UPDATE arirangnotice SET create_time=NOW(), write_user='${write_user}', not_tit='${not_tit}', not_content='${not_content}' WHERE id='${id}'`, (err)=>{
    if(err) throw err;
    callback();
  });
};

// 게시판 중 id가 일치하는 데이터만 추출 (삭제할때 필요)
function deleteNoticeByid(id, callback){
  connection.query(`DELETE FROM arirangnotice WHERE id=${id}`,(err)=>{
    if(err) throw err;
    callback();
  });
};

// userinfo를 수정할때 (생성할때)
function insertUserInfo(user_name, user_id, user_pw, user_birth, user_phoneNum, callback){
  connection.query(`INSERT INTO arriranguserinfo(create_time, user_name, user_id, user_pw, user_birth, user_phoneNum) VALUES(NOW(), '${user_name}', '${user_id}', '${user_pw}', '${user_birth}', '${user_phoneNum}')`, (err)=>{
    if(err) throw err;
    callback();
  });
};

// 로그인정보와 테이블 정보를 비교하는 함수
function loginCheck(login_id, login_pw, callback){
  connection.query(`SELECT * FROM arriranguserinfo WHERE user_id='${login_id}' and user_pw='${login_pw}'`, (err, results)=>{
    if(err) throw err;
    callback(results);
  })
}

module.exports = {
  getNotice,insertNotice,getNoitceByid,updateNotice,deleteNoticeByid,insertUserInfo,loginCheck
};