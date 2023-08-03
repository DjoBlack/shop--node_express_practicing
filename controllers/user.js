const User = require('../models/user.js');

exports.getUserCreate = (req, res, next) => {
    res.render('user/create-user', {
        pageTitle: 'Add User', 
        path: '/create-user'    
    });
}

exports.postUserCreate = (req, res, next) => {
    const name = req.body.userName;
    const email = req.body.email;

    const user = new User(name, email);
    user.save();
    res.redirect('/');
}