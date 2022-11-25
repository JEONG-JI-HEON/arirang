let app = require('../app');

let port = process.env.PORT || 3000;

app.listen(port, ()=>{
  console.log(`${port}번 포트로 express 실행`);
  console.log(`server started http://localhost:${port}/`);
});