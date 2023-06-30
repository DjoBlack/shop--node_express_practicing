const http = require('http');
const bodyParser = require('body-parser');
const path = require('path');

const express = require('express');
// const expressHbs = require('express-handlebars');
const mongoConnect = require('./utils/database');

const app = express();

// app.engine('hbs', expressHbs({layoutsDir: 'views/layouts/', defaultLayout: 'main-layout', extname: 'hbs'}));
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errors = require('./controllers/error.js');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminRoutes);

app.use(shopRoutes);

app.use(errors.get404);

mongoConnect((client) => {
    console.log(client);
    app.listen(3000);
});

