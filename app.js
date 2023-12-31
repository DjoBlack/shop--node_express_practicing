const http = require('http');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const DBConnection = require('./utils/DB');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const express = require('express');
// const expressHbs = require('express-handlebars');
const mongoConnect = require('./utils/database').mongoConnect;
const User = require('./models/user');

const app = express();
const store = new MongoDBStore({
    uri: DBConnection, 
    collection: 'sessions'
});

// app.engine('hbs', expressHbs({layoutsDir: 'views/layouts/', defaultLayout: 'main-layout', extname: 'hbs'}));
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const errors = require('./controllers/error.js');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({secret: 'secret', resave: false, saveUninitialized: false, store: store}));

app.use((req, res, next) => {
    if(!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id)
    .then(user => {
        req.user = user;
        next();
    })
    .catch(err => {
        console.log(err)
    })
});


app.use('/admin', adminRoutes);

app.use(shopRoutes);

app.use(authRoutes);

app.use(userRoutes);

app.use(errors.get404);

mongoose.connect(DBConnection)
    .then(result => {
        User.findOne().then(user => {
            if(!user) {
                const user = new User({
                    name: 'User1', 
                    email: 'uemail@mail.com',
                    cart: {
                        items: []
                    }
                });
                user.save();
            }
        });
        app.listen(3000);
    })
    .catch(err => {
        console.log(err)
    });

