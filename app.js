const express = require('express');
const ejs = require('ejs');
const app = express();

const server = '127.0.0.1';
const port = 3000;

// TEMPLATE ENGINE
app.set('view engine', 'ejs')

// MIDDLEWARES
app.use(express.static('public'))

// ROUTES
app.get('/', (req, res) => {
  res.status(200).render('index', {
      page_name : 'index'
  })
});

app.get('/about', (req, res) => {
    res.status(200).render('about', {
        page_name : 'about'
    })
})

app.listen(port, server, () => {
  console.log(`App started on port http://${server}:${port}/`);
});
