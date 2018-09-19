const BlogModel = require('../models/Blog');

const publishNewBlog = async ( ctx, next ) => {
    let blog = ctx.request.body.blog;
    blog.publishTime = Date.now();
    blog.see = 0;
    blog.like = 0;
    blog.comments = [];

    let result = await BlogModel.publishBlog(blog).catch((err)=>{
        ctx.status = 500;
        ctx.body = {
            errMsg: '发表文章失败!',
            err
        }
    });

    if(result && result._id){
        ctx.status = 200;
        ctx.body = {
            successMsg: '文章发表成功!'
        }
    }else{
        ctx.status = 200;
        ctx.body = {
            errMsg: '发表文章失败!'
        }
    }

    next();
}

module.exports = {
    publishNewBlog
};