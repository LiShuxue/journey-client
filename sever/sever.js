const Koa = require('koa');
const app = new Koa();
const db = require("./db/mongodb");

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(4000, function(){
  console.log('sever starting...')
});