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

const saveToken = (user, token) => {
    return new Promise((resolve, reject)=>{
        User.updateOne( { _id: user.id }, {
            $set: {
                token: token
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
    let doc = await getUser(username);

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
        let token = tokenUtil.createToken({username});
        ctx.status = 200;
        ctx.body = { 
            successMsg: '登录成功!',
            username,
            token
        };
        try{
            await saveToken(token);
        }catch(err){
            ctx.status = 200;
            ctx.body = { 
                errMsg: 'token保存出错!'
            };
        }
    }
}

const register = async ( ctx ) => {
    let hashPass = crypto.createHmac('sha256', secret)
        .update(ctx.request.body.password)
        .digest('hex');
    let username = ctx.request.body.username;
    let user = {
        username: username,
        password: hashPass,
        token: tokenUtil.createToken({username})
    };
    
    let doc = await getUser(user.username);
    if(doc){
        ctx.status = 200;
        ctx.body = {
            errMsg: '用户名已存在!'
        };
    }else{
        let result = await createUser(user);
        if(result){
            ctx.status = 200;
            ctx.body = {
                successMsg: '注册成功!',
                username: result.username
            }
        }else{
            ctx.status = 200;
            ctx.body = {
                errMsg: '注册失败!',
                err
            }
        }
    }
}

module.exports = {
    login,
    register
};

