const mongoose = require('mongoose');
const {Schema} = mongoose;

const User = new Schema({
    username: String,
    password: String,
    posts: [{title: String, content: String}]
});

module.exports = mongoose.model('User', User, 'user');