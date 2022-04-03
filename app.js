const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')
const fileUpload = require('express-fileupload');
const pageRoutes = require('./routes/pageRoutes');
const courseRoutes = require('./routes/courseRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

const server = '127.0.0.1';
const port = 3000;

// CONNECT DATABASE
mongoose
  .connect('mongodb://localhost/smartedu-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('Database Connected Successfuly');
  });

// TEMPLATE ENGINE
app.set('view engine', 'ejs');

// GLOBAL VARİABLE
global.userIN = null;

// MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
  session({
    secret: 'mySecretKey',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost/smartedu-db' })
  })
);

// ROUTES
app.use('*', (req, res, next) => {
  userIN = req.session.userID;
  next();
});
app.use('/', pageRoutes);
app.use('/courses', courseRoutes);
app.use('/categories', categoryRoutes);
app.use('/users', userRoutes);

app.listen(port, server, () => {
  console.log(`App started on port http://${server}:${port}/`);
});
