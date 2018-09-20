const BlogController = require('../controllers/blogController.js');
const CategoryController = require('../controllers/categoryController');
const Router = require('koa-router');
const tokenUtil = require('../utils/tokenUtil');

const blogRoute = new Router();

blogRoute.post('/publish', tokenUtil.verifyAccessToken, BlogController.publishNewBlog, tokenUtil.returnNewToken);
blogRoute.post('/category/add', tokenUtil.verifyAccessToken, CategoryController.addCategory, tokenUtil.returnNewToken);

module.exports = blogRoute;
