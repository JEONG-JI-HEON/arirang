/* npm으로 설치한 애들 연결하는 곳! (package.json > dependencies에서 확인가능) */
const expressLayout = require('express-ejs-layouts');
const express = require('express');
// const static = require('static');
const cookieParser = require('cookie-parser');
const routers = require('./routes/route');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); /* ejs 사용 (이걸 씀으로써 파일을 불러올때 굳이 .ejs를 안써도됨) */
app.use(expressLayout); /* express의 Layout 기능사용?, 이게 routers보다 위에 있어야함? */
app.use('/', routers);
app.use(express.static(path.join(__dirname, 'public'))); /* express의 static(정적인 애들(css,img ...)의 경로를 알아서 읽어주는 역할) 사용 */

module.exports = app; /* app이라는 이름으로 모듈화해서 내보내겠다는 뜻 */

