const User = require('../models/User');
const crypto = require('crypto');
const secret = 'secret-key';
const tokenUtil = require('../utils/tokenUtil');

const createUser = (user) => {
    return User.create(user);
}

const getUser = (username) => {
    return new Promise((resolve, reject)=>{
        User.findOne({ username }, (err, doc)=>{
            if(err){
                reject(err);
            }
            resolve(doc);
        });
    })
}

const saveAccessToken = (user, access_token) => {
    return new Promise((resolve, reject)=>{
        User.updateOne( { _id: user.id }, {
            $set: {
                access_token: access_token
            }
        }, (err, doc)=>{
            if(err){
                reject(err);
            }
            resolve(doc);
        });
    });
}

const saveRefreshToken = (user, refresh_token) => {
    return new Promise((resolve, reject)=>{
        User.updateOne( { _id: user.id }, {
            $set: {
                refresh_token: refresh_token
            }
        }, (err, doc)=>{
            if(err){
                reject(err);
            }
            resolve(doc);
        });
    });
}

const login = async ( ctx ) => {
    let username = ctx.request.body.username;
    let hashPass = crypto.createHmac('sha256', secret)
        .update(ctx.request.body.password)
        .digest('hex');

    let doc;
    try{
        doc = await getUser(username);
    }catch(err){
        ctx.status = 500;
        ctx.body = {
            errMsg: '数据库查找用户名出错!',
            err
        }
    }
    if(!doc){
        ctx.status = 200;
        ctx.body = {
            errMsg: '用户名不存在!'
        }
    }else if(doc.password !== hashPass){
        ctx.status = 200;
        ctx.body = {
            errMsg: '密码错误!'
        }
    }else{
        let access_token = tokenUtil.createAccessToken({username});
        let refresh_token = tokenUtil.createRefreshToken();

        await Promise.all([
            saveAccessToken(access_token),
            saveRefreshToken(refresh_token)
        ]).then(()=>{
            ctx.status = 200;
            ctx.body = { 
                successMsg: '登录成功!',
                username,
                access_token,
                refresh_token
            };
        }).catch((err)=>{
            ctx.status = 500;
            ctx.body = { 
                errMsg: '数据库保存token出错!',
                err
            };
        })
    }
}

const register = async ( ctx ) => {
    let hashPass = crypto.createHmac('sha256', secret)
        .update(ctx.request.body.password)
        .digest('hex');
    let username = ctx.request.body.username;
    let access_token = tokenUtil.createAccessToken({username});
    let refresh_token = tokenUtil.createRefreshToken();
    let user = {
        username: username,
        password: hashPass,
        access_token: access_token,
        refresh_token: refresh_token
    };
    
    let doc;
    try{
        doc = await getUser(username);
    }catch(err){
        ctx.status = 500;
        ctx.body = {
            errMsg: '数据库查找用户名出错!',
            err
        }
    }
    if(doc){
        ctx.status = 200;
        ctx.body = {
            errMsg: '用户名已存在!'
        };
    }else{
        await createUser(user).then((result)=>{
            if(result && result._id){
                ctx.status = 200;
                ctx.body = {
                    successMsg: '注册成功!',
                    username: result.username,
                    access_token: result.access_token,
                    refresh_token: result.refresh_token
                }
            }else{
                ctx.status = 200;
                ctx.body = {
                    errMsg: '注册失败!'
                }
            }
        }).catch((err)=>{
            ctx.status = 500;
            ctx.body = {
                errMsg: '注册失败!',
                err
            }
        });
    }
}

const test = async ( ctx ) => {
    ctx.status = 200;
    ctx.body = {
        successMsg: '验证成功!'
    }
}

module.exports = {
    login,
    register,
    test
};
