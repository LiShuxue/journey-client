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
    let t_payload = Object.assign(initPayload, payload); //Object.assign(target, ...sources)
    let token = jwt.sign(t_payload, secret);
    return token;
}

const createRefreshToken = ()=>{
    return createAccessToken({
        target: 'refresh',
        exp: Date.now()/1000 + 5*60*60
    })
}

const verifyAccessToken = ( ctx ) => {
    return new Promise((resolve, reject)=>{
        const authorization = ctx.get('Authorization');
        if (authorization === '') {
            reject(`no token detected in http header 'Authorization'`);
        }
        try {
            const token = authorization.split(' ')[1];
            let payload = jwt.verify(token, secret);
            resolve();
        } catch (err) {
            reject(err);
        }
    });
}

module.exports = {
    createAccessToken,
    createRefreshToken,
    verifyAccessToken
}
