const UserController = require('../controllers/userController.js');
const Router = require('koa-router');
const tokenUtil = require('../utils/tokenUtil');

const userRoute = new Router();

userRoute.post('/login', UserController.login);
userRoute.post('/register', UserController.register);
userRoute.get('/test', tokenUtil.verifyAccessToken, UserController.test);

module.exports = userRoute;
