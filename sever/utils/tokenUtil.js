const secret = 'secret-key';
const jwt = require('jsonwebtoken');

const createToken = (payload)=>{
    let token = jwt.sign(payload, secret);
    return token;
}

const verifyToken = async ( ctx, next ) => {
    const authorization = ctx.get('Authorization');
    if (authorization === '') {
        ctx.throw(401, `no token detected in http header 'Authorization'`);
    }
    const token = authorization.split(' ')[1];
    let payload;
    try {
        payload = await jwt.verify(token, secret);
    } catch (err) {
        ctx.throw(401, 'invalid token');
    }
    await next();
}

module.exports = {
    createToken,
    verifyToken
}
