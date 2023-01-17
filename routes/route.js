const express = require("express");
const router = express.Router(); /* R은 대문자로 */
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const db = require("./../db.js");
var request = require("request");
const requestPromise = require("request-promise");
const session = require("express-session");
const e = require("express");
const FileStore = require("session-file-store")(session); // 세션을 파일에 저장

/* 네이버 API에 필요한 것들 */
var client_id = "E9ZrseVlXRY4WQz13pEI";
var client_secret = "6Qnrg_ckLt";
var state = "RAMDOM_STATE";
var redirectURI = encodeURI("http://localhost:3000/callback");
var api_url = "";

/* 영화 검색 페이지(네이버 API연동) */
router.get("/movieS", function (req, res, next) {
  let movie_search = req.query.movie_search;

  var api_url =
    "https://openapi.naver.com/v1/search/movie.json?query=" +
    encodeURI(movie_search); // JSON 결과
  var options = {
    url: api_url,
    headers: {
      "X-Naver-Client-Id": client_id,
      "X-Naver-Client-Secret": client_secret,
    },
  };

  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      if (req.session.is_logined == true) {
        var obj = JSON.parse(body);
        // console.log(obj);
        let movieData_length = obj.total; /* 검색된 영화결과 개수 */
        let movieData = obj.items;
        // console.log(movieData);

        res.render("arirangMovieSearch", {
          // title: 영화 제목.제목에서 검색어와 일치하는 부분은 <b> 태그로 감싸져 있습니다.
          // link: 네이버 영화 정보 URL
          // image: 섬네일 이미지의 URL(src에 넣으면됨)
          // subtitle: 영어 제목 또는 원제
          // pubDate: 제작 연도(yyyy 형식)
          // director: 감독
          // actor: 출연 배우
          // userRating: 평점
          movieData: movieData,
          movieData_length: movieData_length,
          movie_search: movie_search,
          is_logined: req.session.is_logined,
          name: req.session.name,
        });
      } else {
        var obj = JSON.parse(body);
        // console.log(obj);
        let movieData_length = obj.total; /* 검색된 영화결과 개수 */
        let movieData = obj.items;
        // console.log(movieData);

        res.render("arirangMovieSearch", {
          movieData: movieData,
          movieData_length: movieData_length,
          movie_search: movie_search,
          is_logined: false,
        });
      }
    } else if (!movie_search) {
      res.send(
        `<script>alert("검색어를 입력해주세요."); document.location.href="/movieS";</script>`
      );
    } else {
      res.status(response.statusCode).end();
      console.log("error = " + response.statusCode);
    }
  });
});

/* 로그 아웃 (세션파괴) */
router.get("/logout", (req, res, next) => {
  if (req.session.name == "네이버") {
    access_token = req.session.token;
    api_url =
      "https://nid.naver.com/oauth2.0/token?grant_type=delete&client_id=" +
      client_id +
      "&client_secret=" +
      client_secret +
      "&access_token=" +
      access_token +
      "&service_provider=NAVER";
    var options = {
      url: api_url,
      headers: {
        "X-Naver-Client-Id": client_id,
        "X-Naver-Client-Secret": client_secret,
      },
    };
    request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.clearCookie("arirangs");
        res.redirect("/");
      } else {
        res.status(response.statusCode).end();
        console.log("error = " + response.statusCode);
      }
    });
  } else {
    req.session.destroy(function (err) {
      res.clearCookie("arirangs");
      res.redirect("/");
    });
  }
});

/* 로그인페이지 (네이버) */
router.get("/login", (req, res) => {
  api_url =
    "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=" +
    client_id +
    "&redirect_uri=" +
    redirectURI +
    "&state=" +
    state;
  if (req.session.is_logined == true) {
    res.render("arirangLogin", {
      api_url: api_url,
      is_logined: req.session.is_logined,
      name: req.session.name,
    });
  } else {
    res.render("arirangLogin", {
      api_url: api_url,
      is_logined: false,
    });
  }
});

/* 네이버 로그인 */
router.get("/callback", async (req, res) => {
  code = req.query.code;
  state = req.query.state;
  api_url =
    "https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=" +
    client_id +
    "&client_secret=" +
    client_secret +
    "&redirect_uri=" +
    redirectURI +
    "&code=" +
    code +
    "&state=" +
    state;
  var options = {
    url: api_url,
    headers: {
      "X-Naver-Client-Id": client_id,
      "X-Naver-Client-Secret": client_secret,
    },
  };
  const result = await requestPromise.get(options);
  const token = JSON.parse(result).access_token;
  const info_options = {
    url: "https://openapi.naver.com/v1/nid/me",
    headers: { Authorization: "Bearer " + token },
  };

  const info_result = await requestPromise.get(info_options);
  // string 형태로 값이 담기니 JSON 형식으로 parse를 해줘야 한다.
  const info_result_json = JSON.parse(info_result).response;
  // info_result_json = 네이버 로그인 회원정보

  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      req.session.is_logined = true;
      req.session.name = "네이버";
      req.session.token = token;
      db.getMainPage((rowNotice, rowSos) => {
        res.render("arirang", {
          rowNotice: rowNotice,
          rowSos: rowSos,
          is_logined: true,
          name: info_result_json.name,
          alert: true,
          access_token: token,
        });
      });
    } else {
      res.status(response.statusCode).end();
      console.log("error = " + response.statusCode);
    }
  });
});

/* 회원가입 내용을 테이블에 넣기 */
router.post("/joininfo", (req, res) => {
  let param = JSON.parse(JSON.stringify(req.body));
  let user_name = param["user_name"];
  let user_id = param["user_id"];
  let user_pw = param["user_pw"];
  let user_birth = param["user_birth"];
  let user_phoneNum = param["user_phoneNum"];
  let user_email = param["user_email"];
  let user_zipCode = param["user_zipCode"];
  let user_address = param["user_address"];
  db.insertUserInfo(
    user_name,
    user_id,
    user_pw,
    user_birth,
    user_phoneNum,
    user_email,
    user_zipCode,
    user_address,
    () => {
      res.redirect("/login");
    }
  );
});

/* 로그인 내용 */
router.post("/logininfo", (req, res) => {
  let param = JSON.parse(JSON.stringify(req.body));
  let login_id = param["login_id"];
  let login_pw = param["login_pw"];
  db.loginCheck(login_id, login_pw, (results) => {
    if (results.length > 0) {
      req.session.is_logined = true;
      req.session.name = login_id;
      db.getMainPage((rowNotice, rowSos) => {
        res.render("arirang", {
          rowNotice: rowNotice,
          rowSos: rowSos,
          is_logined: true,
          name: req.session.name,
          alert: true,
        });
      });
    } else {
      res.send(
        `<script>alert("로그인 정보가 일치하지 않습니다."); document.location.href="/login";</script>`
      );
    }
  });
});

/* 메인페이지 */
router.get("/", (req, res) => {
  if (req.session.is_logined == true) {
    db.getMainPage((rowNotice, rowSos) => {
      res.render("arirang", {
        rowNotice: rowNotice,
        rowSos: rowSos,
        is_logined: req.session.is_logined,
        name: req.session.name,
        alert: false,
      });
    });
  } else {
    db.getMainPage((rowNotice, rowSos) => {
      res.render("arirang", {
        rowNotice: rowNotice,
        rowSos: rowSos,
        is_logined: false,
        alert: false,
      });
    });
  }
});

/* 영화홈페이지 */
router.get("/movieHome", (req, res) => {
  if (req.session.is_logined == true) {
    res.render("arirangMovieHome", {
      is_logined: req.session.is_logined,
      name: req.session.name,
    });
  } else {
    res.render("arirangMovieHome", {
      is_logined: false,
    });
  }
});

/* 회원가입1페이지 */
router.get("/join1", (req, res) => {
  if (req.session.is_logined == true) {
    res.render("arirangJoin1", {
      is_logined: req.session.is_logined,
      name: req.session.name,
    });
  } else {
    res.render("arirangJoin1", {
      is_logined: false,
    });
  }
});

/* 회원가입2페이지 */
router.get("/join2", (req, res) => {
  if (req.session.is_logined == true) {
    db.userinfoData((rows) => {
      res.render("arirangJoin2", {
        rows: rows,
        is_logined: req.session.is_logined,
        name: req.session.name,
      });
    });
  } else {
    db.userinfoData((rows) => {
      res.render("arirangJoin2", {
        rows: rows,
        is_logined: false,
      });
    });
  }
});

/* 게시판메인페이지 */
router.get("/noticeUser", (req, res) => {
  if (req.session.is_logined == true) {
    db.getNotice((rows) => {
      res.render("arirangNoticeUser", {
        rows: rows,
        is_logined: req.session.is_logined,
        name: req.session.name,
      });
    });
  } else {
    db.getNotice((rows) => {
      res.render("arirangNoticeUser", {
        rows: rows,
        is_logined: false,
      });
    });
  }
});

/* 게시판작성페이지 */
router.get("/noticeWrite", (req, res) => {
  if (req.session.is_logined == true) {
    res.render("arirangNoticeWrite", {
      is_logined: req.session.is_logined,
      name: req.session.name,
    });
  } else {
    res.render("arirangNoticeWrite", {
      is_logined: false,
    });
  }
});

/* 게시판작성내용을 테이블에 넣기 */
router.post("/noticeWriteInfo", (req, res) => {
  let param = JSON.parse(JSON.stringify(req.body));
  let write_user = param["write_user"];
  let noticeCheck = param["noticeCheck"];
  let eventCheck = param["eventCheck"];
  let festivalCheck = param["festivalCheck"];
  // let user_pw = param['user_pw'];
  let not_tit = param["not_tit"];
  let not_content = param["not_content"];
  db.insertNotice(
    write_user,
    not_tit,
    not_content,
    noticeCheck,
    eventCheck,
    festivalCheck,
    () => {
      res.redirect("/noticeUser");
    }
  );
});

/* 게시판수정페이지 */
router.get("/noticeUpdate", (req, res) => {
  let id = req.query.id;
  if (req.session.is_logined == true) {
    db.getNoticeByid(id, (row) => {
      res.render("arirangNoticeUpdate", {
        row: row[0],
        is_logined: req.session.is_logined,
        name: req.session.name,
      });
    });
  } else {
    db.getNoticeByid(id, (row) => {
      res.render("arirangNoticeUpdate", {
        row: row[0],
        is_logined: false,
      });
    });
  }
});

/* 게시판수정내용을 테이블에 넣기 */
router.post("/noticeUpdateInfo", (req, res) => {
  let param = JSON.parse(JSON.stringify(req.body));
  let id = param["id"];
  let write_user = param["write_user"];
  let not_tit = param["not_tit"];
  let not_content = param["not_content"];

  db.updateNotice(id, write_user, not_tit, not_content, () => {
    res.redirect("/noticeUser");
  });
});

/* 게시판 삭제할때 */
router.get("/noticeDelete", (req, res) => {
  let id = req.query.id;
  db.deleteNoticeByid(id, () => {
    res.redirect("/noticeUser");
  });
});

/* 게시판의 상세페이지 */
router.get("/noticeRead", (req, res) => {
  let id = req.query.id;
  if (req.session.is_logined == true) {
    db.getNoticeByid(id, (rows, row_prev, row_next, rowid, viewCntPlus) => {
      res.render("arirangNoticeRead", {
        row: rows[0],
        row1: row_prev[0],
        row2: row_next[0],
        viewCntPlus: viewCntPlus,
        is_logined: req.session.is_logined,
        name: req.session.name,
      });
    });
  } else {
    db.getNoticeByid(id, (rows, row_prev, row_next, rowid, viewCntPlus) => {
      res.render("arirangNoticeRead", {
        row: rows[0],
        row1: row_prev[0],
        row2: row_next[0],
        viewCntPlus: viewCntPlus,
        is_logined: false,
      });
    });
  }
});

// try {
//   fs.readFileSync('../public/uploads/'); /* 폴더가 있으면 사용, 터미널 기준 경로!! */
// } catch (err) {
//   console.log('폴더가 존재하지 않습니다.');
//   fs.mkdirSync('../public/uploads/'); /* 폴더가 없으면 생성, 터미널 기준 경로!! */
// };

const upload = multer({
  storage: multer.diskStorage({
    /* 어디의 저장할건지 정의 */
    destination(req, file, done) {
      done(null, "public/uploads/"); /* 터미널 기준 경로!! */
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname); /* 파일의 확장자 */
      done(
        null,
        path.basename(file.originalname, ext) + Date.now() + ext
      ); /* 파일명 + 날짜 + 확장자명 */
    },
  }),
  limits: {
    fileSize: 1024 * 1024 * 15,
  },
});

/* SOS 메인페이지 */
router.get("/SOSUser", (req, res) => {
  db.getSOS((rows) => {
    if (req.session.is_logined == true) {
      res.render("arirangSOSUser", {
        rows: rows,
        is_logined: req.session.is_logined,
        name: req.session.name,
      });
    } else {
      res.render("arirangSOSUser", {
        rows: rows,
        is_logined: false,
      });
    }
  });
});

/* SOS 작성페이지 */
router.get("/SOSWrite", (req, res) => {
  if (req.session.is_logined == true) {
    res.render("arirangSOSWrite", {
      is_logined: req.session.is_logined,
      name: req.session.name,
    });
  } else {
    res.render("arirangSOSWrite", {
      is_logined: false,
    });
  }
});

/* SOS 작성내용을 테이블에 넣기 */
router.post("/SOSWriteInfo", upload.single("sos_img"), (req, res) => {
  let param = JSON.parse(JSON.stringify(req.body));
  let sos_img = "uploads/" + req.file.filename;
  let write_user = param["write_user"];
  let not_tit = param["sos_tit"];
  let not_content = param["sos_content"];

  db.insertSOS(write_user, not_tit, not_content, sos_img, () => {
    res.redirect("/sosUser"); /* 게시판페이지 */
  });
});

/* SOS 수정페이지 */
router.get("/SOSUpdate", (req, res) => {
  let id = req.query.id;
  if (req.session.is_logined == true) {
    db.getSOSByid(id, (row) => {
      res.render("arirangSOSUpdate", {
        row: row[0],
        is_logined: req.session.is_logined,
        name: req.session.name,
      });
    });
  } else {
    db.getSOSByid(id, (row) => {
      res.render("arirangSOSUpdate", {
        row: row[0],
        is_logined: false,
      });
    });
  }
});

/* SOS 수정내용을 테이블에 넣기 */
router.post("/SOSUpdateInfo", upload.single("sos_img"), (req, res) => {
  let param = JSON.parse(JSON.stringify(req.body));
  let id = param["id"];
  let sos_img = "uploads/" + req.file.filename;
  let write_user = param["write_user"];
  let not_tit = param["sos_tit"];
  let not_content = param["sos_content"];

  db.updateSOS(id, write_user, not_tit, not_content, sos_img, () => {
    res.redirect("/SOSUser");
  });
});

/* SOS 삭제할때 */
router.get("/SOSDelete", (req, res) => {
  let id = req.query.id;
  db.deleteSOSByid(id, () => {
    res.redirect("/SOSUser");
  });
});

/* SOS의 상세페이지 */
router.get("/SOSRead", (req, res) => {
  let id = req.query.id;
  if (req.session.is_logined == true) {
    db.getSOSByid(id, (rows, row_prev, row_next, rowid, viewCntPlus) => {
      res.render("arirangSOSRead", {
        row: rows[0],
        row1: row_prev[0],
        row2: row_next[0],
        viewCntPlus: viewCntPlus,
        is_logined: req.session.is_logined,
        name: req.session.name,
      });
    });
  } else {
    db.getSOSByid(id, (rows, row_prev, row_next, rowid, viewCntPlus) => {
      res.render("arirangSOSRead", {
        row: rows[0],
        row1: row_prev[0],
        row2: row_next[0],
        viewCntPlus: viewCntPlus,
        is_logined: false,
      });
    });
  }
});

module.exports = router;
