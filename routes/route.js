const express = require('express');
const router = express.Router(); /* R은 대문자로 */
const path = require('path');
const { title } = require('process');



router.get('/', (req, res)=>{ /* 메인페이지 */
  res.render('arirang')
});

router.get('/movieHome', (req, res)=>{
  res.render('arirangMovieHome')
});

router.get('/join1', (req, res)=>{
  res.render('arirangJoin1')
});

router.get('/join2', (req, res)=>{
  res.render('arirangJoin2')
});

router.get('/login', (req, res)=>{
  res.render('arirangLogin')
});

router.get('/noticeUser', (req, res)=>{
  res.render('arirangNoticeUser')
});

router.get('/noticeRead', (req, res)=>{
  res.render('arirangNoticeRead')
});

router.get('/noticeWrite', (req, res)=>{
  res.render('arirangNoticeWrite')
});


router.post('/joininfo', (req,res)=>{
  let param = JSON.parse(JSON.stringify(req.body));
  let user_id = param['user_id'];
  let user_pw = param['user_pw'];
  let user_pwCheck = param['user_pwCheck'];
  let user_name = param['user_name'];
  let user_birth = param['user_birth'];
  let user_phoneNum = param['user_phoneNum'];
  console.log(`아이디 : ${user_id}`);
  console.log(`비밀번호 : ${user_pw}`);
  console.log(`비밀번호 확인 : ${user_pwCheck}`);
  console.log(`이름 : ${user_name}`);
  console.log(`생년월일 : ${user_birth}`);
  console.log(`휴대전화 번호 : ${user_phoneNum}`);
  
})

router.post('/logininfo', (req,res)=>{
  let param = JSON.parse(JSON.stringify(req.body));
  let login_id = param['login_id'];
  let login_pw = param['login_pw'];
  console.log(`유저 아이디 : ${login_id}`)
  console.log(`유저 비밀번호 : ${login_pw}`);
  res.render('arirang.ejs');
})

router.post('/noticeWriteInfo', (req,res)=>{
  let param = JSON.parse(JSON.stringify(req.body));
  let title = param['title'];
  let noticeCheck = param['noticeCheck'];
  let id = param['id'];
  let password = param['password'];
  let boardCon = param['boardCon'];
  console.log(`글 제목 : ${title}`);
  console.log(`공지여부 : ${noticeCheck}`);
  console.log(`글 작성자 : ${id}`);
  console.log(`글 작성 비밀번호 : ${password}`);
  console.log(`글 내용 : ${boardCon}`);

  res.render('arirangNoticeNew.ejs', {'data': param});
})

module.exports = router;