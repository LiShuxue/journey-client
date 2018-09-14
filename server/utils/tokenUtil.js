const secret = 'secret-key';
const jwt = require('jsonwebtoken');

const initPayload = {
    iss: "Journey", //(Issuer) jwt签发者
    sub: "test@example.com", //(Subject) 该jwt所面向的用户
    aud: "www.example.com", //(Audience) 接收jwt的一方
    iat: Date.now()/1000, //(Issued At) jwt的签发时间，单位秒s
    exp: Date.now()/1000 + 5*60 //(Expiration Time) jwt的过期时间，单位秒s
};

const createAccessToken = (payload)=>{
    let t_payload = Object.assign({}, initPayload, payload); //Object.assign(target, ...sources)
    let token = jwt.sign(t_payload, secret);
    return token;
}

const createRefreshToken = ()=>{
    return createAccessToken({
        target: 'refresh',
        exp: Date.now()/1000 + 5*60*60
    })
}

const verifyAccessToken = ( ctx, next ) => {
    const authorization = ctx.get('Authorization');
    if (authorization === '') {
        ctx.throw(401, `no token detected in http header 'Authorization'`);
    }
    const token = authorization.split(' ')[1];
    try {
        let payload = jwt.verify(token, secret);
    } catch (err) {
        ctx.throw(401, err);
    }
    next();
}

module.exports = {
    createAccessToken,
    createRefreshToken,
    verifyAccessToken
}
