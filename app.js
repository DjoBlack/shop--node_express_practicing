const http = require('http');
const bodyParser = require('body-parser');
const path = require('path');

const express = require('express');
// const expressHbs = require('express-handlebars');
const mongoConnect = require('./utils/database').mongoConnect;

const app = express();

// app.engine('hbs', expressHbs({layoutsDir: 'views/layouts/', defaultLayout: 'main-layout', extname: 'hbs'}));
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const userRoutes = require('./routes/user');
const errors = require('./controllers/error.js');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminRoutes);

app.use(shopRoutes);

app.use(userRoutes);

app.use(errors.get404);

mongoConnect(() => {
    app.listen(3000);
});

