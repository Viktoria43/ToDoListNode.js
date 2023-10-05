const express = require("express");
const List = require('./public/models/lists')
const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}))
app.listen(4000);

app.get('/',(req,res)=>{
    res.render('index', {title:'Home'});
});

app.get('/lists',(req,res)=>{
    res.render('list', {title:'My List'});
});
app.post("/lists",(req,res)=>{

    const list = new List(req.body);
list.save();

res.send({message: 'ok'});
})
app.get((req,res)=>{
    res.status(404).render('error',{title:'404'});
});