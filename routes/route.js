const express = require('express');
const router = express.Router(); /* R은 대문자로 */
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const db = require('./../db.js');



/* 메인페이지 */
router.get('/', (req, res) => {
  res.render('arirang')
});

/* 영화홈페이지 */
router.get('/movieHome', (req, res) => {
  res.render('arirangMovieHome')
});

/* 회원가입1페이지 */
router.get('/join1', (req, res) => {
  res.render('arirangJoin1')
});

/* 회원가입2페이지 */
router.get('/join2', (req, res) => {
  res.render('arirangJoin2')
});

/* 로그인페이지 */
router.get('/login', (req, res) => {
  res.render('arirangLogin')
});


/* 게시판메인페이지 */
router.get('/noticeUser', (req, res) => {
  db.getNotice((rows) => {
    res.render('arirangNoticeUser', {
      rows: rows
    });
  });
});

/* 게시판작성페이지 */
router.get('/noticeWrite', (req, res) => {
  res.render('arirangNoticeWrite')
});


/* 게시판작성내용을 테이블에 넣기 */
router.post('/noticeWriteInfo', (req, res) => {
  let param = JSON.parse(JSON.stringify(req.body));
  let write_user = param['write_user'];
  // let user_pw = param['user_pw'];
  let not_tit = param['not_tit'];
  let not_content = param['not_content'];

  db.insertNotice(write_user, not_tit, not_content, () => {
    res.redirect('/noticeUser'); /* 게시판페이지 */
  });
});


/* 게시판수정페이지 */
router.get('/noticeUpdate', (req, res) => {
  let id = req.query.id;
  db.getNoitceByid(id, (row) => {
    res.render('arirangNoticeUpdate', {
      row: row[0]
    })
  });
});

/* 게시판수정내용을 테이블에 넣기 */
router.post('/noticeUpdateInfo', (req, res) => {
  let param = JSON.parse(JSON.stringify(req.body));
  let write_user = param['write_user'];
  // let user_pw = param['user_pw'];
  let not_tit = param['not_tit'];
  let not_content = param['not_content'];

  db.updateNotice(write_user, not_tit, not_content, () => {
    res.redirect('/noticeUser'); /* 게시판페이지 */
  });
});

/* 게시판 삭제할때 */
router.get('/noticeDelete', (req, res) => {
  let id = req.query.id;
  db.deleteNoticeByid(id, () => {
    res.redirect('/noticeUser'); /* 게시판페이지 */
  });
});


/* 게시판의 상세페이지 */
router.get('/noticeRead', (req, res) => {
  let id = req.query.id;
  db.getNoitceByid(id, (row) => {
    res.render('arirangNoticeRead', {
      row: row[0]
    })
  });
});




/* 회원가입 내용을 테이블에 넣기 */
router.post('/joininfo', (req, res) => {
  let param = JSON.parse(JSON.stringify(req.body));
  let user_name = param['user_name'];
  let user_id = param['user_id'];
  let user_pw = param['user_pw'];
  // let user_pwCheck = param['user_pwCheck'];
  let user_birth = param['user_birth'];
  let user_phoneNum = param['user_phoneNum'];
  db.insertUserInfo(user_name, user_id, user_pw, user_birth, user_phoneNum, ()=>{
    res.redirect('/login');
  });
})

/* 로그인 내용 */
router.post('/logininfo', (req, res) => {
  let param = JSON.parse(JSON.stringify(req.body));
  let login_id = param['login_id'];
  let login_pw = param['login_pw'];
  db.loginCheck(login_id, login_pw, (results)=>{
    if (results.length > 0){
      res.send(`<script>alert("${login_id}님, 어서오세요."); document.location.href="/";</script>`)
    } else {
      res.send(`<script>alert("로그인 정보가 일치하지 않습니다."); document.location.href="/login";</script>`)
    }
  });
})

module.exports = router;