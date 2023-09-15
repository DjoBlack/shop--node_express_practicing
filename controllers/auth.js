const User = require('../models/user');

exports.getLogin = (req, res, next) => {
    console.log(req.session.isLogged);
    // const isLoggedIn = req
    //     .get('Cookie').split('=')[1] === 'true';
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login Page', 
        isLoggedIn: false
    });
};

exports.postLogin = (req, res, next) => {
    
    User.findById('64e3903291fddfa9c6c46d91')
    .then(user => {
        req.session.isLoggedIn = true;
        // req.session.user = user;
        req.session.user = user;
        // console.log(user);
        req.session.save(err => {
            console.log(err);
            res.redirect('/');
        });
    })
    .catch(err => {
        console.log(err)
    })
    // res.setHeader('Set-Cookie', 'loggedIn=true');
};

exports.postLogout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
}