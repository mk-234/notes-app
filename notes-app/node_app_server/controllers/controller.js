const User = require('../models/user.model');


const saveNote = (req, res) => {
    const newUser = new User({username: req.body.username, password:req.body.password, posts: [{title: req.body.title}, {content: req.body.content}]}).save();
}

const getAllNotes = (req, res) => {
    User.find({username: req.body.username, password: req.body.password}, (err, result) => {
        res.send(result);
    });
}

module.exports = {getAllNotes, saveNote};