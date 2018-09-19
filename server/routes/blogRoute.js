const BlogController = require('../controllers/blogController.js');
const Router = require('koa-router');
const tokenUtil = require('../utils/tokenUtil');

const blogRoute = new Router();

blogRoute.post('/publish', tokenUtil.verifyAccessToken, BlogController.publishNewBlog, tokenUtil.returnNewToken);

module.exports = blogRoute;
