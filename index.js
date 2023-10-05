const express = require("express");
const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs')
app.listen(4000);

app.get('/',(req,res)=>{
res.render('index')
});

app.get('/list',(req,res)=>{
    res.render('list')
});

app.get((req,res)=>{
    res.status(404).render('error');
});