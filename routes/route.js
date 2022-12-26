const express = require('express');
const router = express.Router(); /* R은 대문자로 */
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const db = require('./../db.js');



/* 메인페이지 */
router.get('/', (req, res) => {
  db.getMainPage((rowNotice, rowSos) => {
    res.render('arirang', {
      rowNotice: rowNotice,
      rowSos: rowSos
    });
  });
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
  db.userinfoData((rows)=>{
    res.render('arirangJoin2', {
      rows: rows
    });
  });
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
  let noticeCheck = param['noticeCheck'];
  let eventCheck = param['eventCheck'];
  let festivalCheck = param['festivalCheck'];
  // let user_pw = param['user_pw'];
  let not_tit = param['not_tit'];
  let not_content = param['not_content'];

  db.insertNotice(write_user, not_tit, not_content, noticeCheck, eventCheck, festivalCheck,() => {
    res.redirect('/noticeUser'); /* 게시판페이지 */
  });
});


/* 게시판수정페이지 */
router.get('/noticeUpdate', (req, res) => {
  let id = req.query.id;
  db.getNoticeByid(id, (row) => {
    res.render('arirangNoticeUpdate', {
      row: row[0]
    })
  });
});

/* 게시판수정내용을 테이블에 넣기 */
router.post('/noticeUpdateInfo', (req, res) => {
  let param = JSON.parse(JSON.stringify(req.body));
  let id = param['id'];
  let write_user = param['write_user'];
  let not_tit = param['not_tit'];
  let not_content = param['not_content'];

  db.updateNotice(id, write_user, not_tit, not_content, () => {
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
  db.getNoticeByid(id, (rows, row_prev, row_next, rowid, viewCntPlus) => {
    res.render('arirangNoticeRead', {
      row: rows[0],
      row1: row_prev[0],
      row2: row_next[0],
      viewCntPlus: viewCntPlus
    })
  });
});


/* 회원가입 내용을 테이블에 넣기 */
router.post('/joininfo', (req, res) => {
  let param = JSON.parse(JSON.stringify(req.body));
  let user_name = param['user_name'];
  let user_id = param['user_id'];
  let user_pw = param['user_pw'];
  let user_birth = param['user_birth'];
  let user_phoneNum = param['user_phoneNum'];
  let user_email = param['user_email'];
  let user_zipCode = param['user_zipCode'];
  let user_address = param['user_address'];
  db.insertUserInfo(user_name, user_id, user_pw, user_birth, user_phoneNum, user_email, user_zipCode, user_address, ()=>{
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


// try {
//   fs.readFileSync('../public/uploads/'); /* 폴더가 있으면 사용, 터미널 기준 경로!! */
// } catch (err) {
//   console.log('폴더가 존재하지 않습니다.');
//   fs.mkdirSync('../public/uploads/'); /* 폴더가 없으면 생성, 터미널 기준 경로!! */
// };

const upload = multer({
  storage: multer.diskStorage({ /* 어디의 저장할건지 정의 */
    destination(req, file, done) {
      done(null, '../public/uploads/'); /* 터미널 기준 경로!! */
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname); /* 파일의 확장자 */
      done(null, path.basename(file.originalname, ext) + Date.now() + ext); /* 파일명 + 날짜 + 확장자명 */
    }
  }),
  limits: {fileSize: 1024 * 1024 * 15}
})

/* SOS 메인페이지 */
router.get('/SOSUser', (req, res) => {
  db.getSOS((rows) => {
    res.render('arirangSOSUser', {
      rows: rows
    });
  });
});

/* SOS 작성페이지 */
router.get('/SOSWrite', (req, res) => {
  res.render('arirangSOSWrite');
});

/* SOS 작성내용을 테이블에 넣기 */
router.post('/SOSWriteInfo', upload.single('sos_img'), (req, res) => {
  let param = JSON.parse(JSON.stringify(req.body));
  let sos_img = 'uploads/' + req.file.filename;
  let write_user = param['write_user'];
  let not_tit = param['sos_tit']; 
  let not_content = param['sos_content'];

  db.insertSOS(write_user, not_tit, not_content, sos_img,() => {
    res.redirect('/sosUser'); /* 게시판페이지 */
  });
});


/* SOS 수정페이지 */
router.get('/SOSUpdate', (req, res) => {
  let id = req.query.id;
  db.getSOSByid(id, (row) => {
    res.render('arirangSOSUpdate', {
      row: row[0]
    })
  });
});

/* SOS 수정내용을 테이블에 넣기 */
router.post('/SOSUpdateInfo', upload.single('sos_img'), (req, res) => {
  let param = JSON.parse(JSON.stringify(req.body));
  let id = param['id'];
  let sos_img = 'uploads/' + req.file.filename;
  let write_user = param['write_user'];
  let not_tit = param['sos_tit'];
  let not_content = param['sos_content'];

  db.updateSOS(id, write_user, not_tit, not_content, sos_img,() => {
    res.redirect('/SOSUser'); /* 게시판페이지 */
  });
});

/* SOS 삭제할때 */
router.get('/SOSDelete', (req, res) => {
  let id = req.query.id;
  db.deleteSOSByid(id, () => {
    res.redirect('/SOSUser'); /* 게시판페이지 */
  });
});


/* SOS의 상세페이지 */
router.get('/SOSRead', (req, res) => {
  let id = req.query.id;
  db.getSOSByid(id, (row) => {
    res.render('arirangSOSRead', {
      row: row[0]
    })
  });
});



module.exports = router;