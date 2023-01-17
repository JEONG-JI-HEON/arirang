/* npm으로 설치한 애들 연결하는 곳! (package.json > dependencies에서 확인가능) */
const expressLayout = require("express-ejs-layouts");
const express = require("express");
// const static = require('static');
const cookieParser = require("cookie-parser");
const routers = require("./routes/route");
const app = express();
const path = require("path");
const session = require("express-session");
const FileStore = require("session-file-store")(session); // 세션을 파일에 저장
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  session({
    key: "arirangs",
    secret: "blackzat", // 데이터를 암호화 하기 위해 필요한 옵션
    resave: false, // 요청이 왔을때 세션을 수정하지 않더라도 다시 저장소에 저장되도록
    saveUninitialized: true, // 세션이 필요하면 세션을 실행시칸다(서버에 부담을 줄이기 위해)
    store: new FileStore(), // 세션이 데이터를 저장하는 곳
  })
);
app.use(cookieParser());
app.set("views", path.join(__dirname, "views"));
app.set(
  "view engine",
  "ejs"
); /* ejs 사용 (이걸 씀으로써 파일을 불러올때 굳이 .ejs를 안써도됨) */
app.use(
  expressLayout
); /* express의 Layout 기능사용?, 이게 routers보다 위에 있어야함? */
app.use("/", routers);
app.use(
  express.static(path.join(__dirname, "public"))
); /* express의 static(정적인 애들(css,img ...)의 경로를 알아서 읽어주는 역할) 사용 */

module.exports = app; /* app이라는 이름으로 모듈화해서 내보내겠다는 뜻 */
