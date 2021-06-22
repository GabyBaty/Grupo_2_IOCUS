const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const views = path.join(__dirname,'views');

app.use (express.static('public'));
app.listen(port, () => console.log('Server UP: Port '+ port));

app.get('/',(req,res) => res.sendFile(path.join(views, 'index.html')));
app.get('/productDetail',(req,res) => res.sendFile(path.join(views, 'productDetail.html')));
app.get('/productCart',(req,res) => res.sendFile(path.join(views, 'productCart.html')));
app.get('/login',(req,res) => res.sendFile(path.join(views, 'login.html')));
app.get('/layout',(req,res) => res.sendFile(path.join(views, 'layout.html')));