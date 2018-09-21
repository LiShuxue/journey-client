const BlogModel = require('../models/Blog');
const fs = require('fs');

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

    await next();
}

const saveImage = async ( ctx, next ) => {
    let { path, mimetype, filename, originalname } = ctx.req.file;
    let tmp_path = path;
    let type = mimetype.substring(6);
    let target_path = path + '.' + type;
    let src = fs.createReadStream(tmp_path);
    let dest = fs.createWriteStream(target_path);
    await new Promise((resolve, reject)=>{
        src.pipe(dest);
        src.on('end', ()=>{
            fs.unlinkSync(tmp_path);
            resolve();
        });
        src.on('error', (err)=>{ 
            src.close();
            dest.close();
            reject(err);
        });
    }).catch(err=>{
        ctx.status = 200;
        ctx.body = {
            errMsg: '图片上传失败!',
            err
        }
    });
    let imagePath = ctx.req.headers['x-forwarded-proto'] + '://' + ctx.req.headers['host'] + '/' + filename + '.' + type;
    ctx.status = 200;
    ctx.body = {
        successMsg: '图片上传成功!',
        originalName: originalname,
        serverFileName: filename + '.' + type,
        imagePath
    }
    await next();
}

const removeImage = async (ctx, next) => {
    let path = 'server/static/' + ctx.request.body.filename;
    let isExist = fs.existsSync(path);

    if(!isExist){
        ctx.status = 200;
        ctx.body = {
            errMsg: '图片不存在!'
        }
    }else{
        await new Promise((resolve, reject)=>{
            fs.unlink(path, (err)=>{
                if(err){
                    reject(err)
                }
                resolve()
            });
        }).catch(err=>{
            ctx.status = 500;
            ctx.body = {
                errMsg: '图片删除失败!',
                err
            }
        });
        ctx.status = 200;
        ctx.body = {
            successMsg: '图片删除成功!',
        }
    }
    
    await next();
}

module.exports = {
    publishNewBlog,
    saveImage,
    removeImage
};