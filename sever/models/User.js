const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { unique: true, type: String },
    password: { type: String },
    token: { type: String }
},{
    collection: 'User' // 加上这个就不会在程序中定义的是User而真实数据库中变成了Users
});

const User = mongoose.model('User', userSchema);

module.exports = User;