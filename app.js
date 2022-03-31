const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const pageRoutes = require('./routes/pageRoutes')
const courseRoutes = require('./routes/courseRoutes')

const app = express();

const server = '127.0.0.1';
const port = 3000;

// CONNECT DATABASE
mongoose.connect('mongodb://localhost/smartedu-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then( () => {
  console.log('Database Connected Successfuly');
})

// TEMPLATE ENGINE
app.set('view engine', 'ejs')

// MIDDLEWARES
app.use(express.static('public'))
app.use(express.urlencoded({extended : true}))
app.use(express.json())
app.use(fileUpload())

// ROUTES
app.use('/', pageRoutes);
app.use('/courses', courseRoutes)


app.listen(port, server, () => {
  console.log(`App started on port http://${server}:${port}/`);
});
