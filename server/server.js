const Koa = require('koa');
const app = new Koa();

const db = require('./db/mongodb');

// bodyparser:该中间件用于处理post请求的数据
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());

const Router = require('koa-router');
const router = new Router();

// 引入子路由
const userRoute = require('./routes/userRoute');
const blogRoute = require('./routes/blogRoute');
// 路由中间件加载子路由
router.use('/api/admin', userRoute.routes(), userRoute.allowedMethods());
router.use('/api/blog', blogRoute.routes(), blogRoute.allowedMethods());
// app加载路由中间件
app.use(router.routes()).use(router.allowedMethods());

app.listen(4000, ()=>{
  console.log('server starting...')
});