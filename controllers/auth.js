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
    req.session.isLogged = true;
    // res.setHeader('Set-Cookie', 'loggedIn=true');
    res.redirect('/');
};