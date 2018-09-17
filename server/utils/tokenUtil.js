const secret = 'secret-key';
const jwt = require('jsonwebtoken');
const UserModel = require('../models/User');

let initPayload = {
    iss: "Journey", //(Issuer) jwt签发者
    sub: "test@example.com", //(Subject) 该jwt所面向的用户
    aud: "www.example.com", //(Audience) 接收jwt的一方
    iat: Math.floor(Date.now()/1000), //(Issued At) jwt的签发时间，单位秒s
    exp: Math.floor(Date.now()/1000) + 5*60 //(Expiration Time) jwt的过期时间，单位秒s
};

const createAccessToken = (payload)=>{
    let t_payload = Object.assign({}, initPayload, payload); //Object.assign(target, ...sources)
    let token = jwt.sign(t_payload, secret);
    return token;
}

const createRefreshToken = ()=>{
    return createAccessToken({
        target: 'refresh',
        exp: Math.floor(Date.now()/1000) + 5*60*60
    })
}

const verifyRefreshToken = async (refresh_token, access_token) => {
    try{
        jwt.verify(refresh_token, secret);
    }catch(err){
        return Promise.reject(err);
    }

    let decoded = jwt.decode(access_token);
    let username = decoded.username;
    let new_access_token = createAccessToken({username});
    let new_refresh_token = createRefreshToken();
    let user, result;
    try{
        user = await UserModel.getUser(username);
        result = await Promise.all([
            UserModel.saveAccessToken(user, new_access_token),
            UserModel.saveRefreshToken(user, new_refresh_token)
        ]);
    }catch(err){
        return Promise.reject(err);
    }
    return Promise.resolve({
        new_access_token,
        new_refresh_token
    })
}

const verifyAccessToken = async ( ctx, next ) => {
    const authorization = ctx.get('Authorization');
    const access_token = authorization.split(' ')[1];
    const refresh_token = ctx.get('refresh_token');

    if (access_token === '' || refresh_token === '') {
        ctx.throw(401, `No access_token/refresh_token detected in http headers`);
    }
    
    try {
        jwt.verify(access_token, secret);
    }catch(err){
        if(err.name === 'TokenExpiredError'){
            let result = await verifyRefreshToken(refresh_token, access_token).catch((err)=>{
                ctx.throw(401, err);
            });
            ctx.token = result;
        }else{
            ctx.throw(401, err);
        }
    }
    next();
}

module.exports = {
    createAccessToken,
    createRefreshToken,
    verifyAccessToken
}
