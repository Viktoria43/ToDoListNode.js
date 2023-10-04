const express = require("express");
const app = express();

app.listen(4000);

app.get('/',(req,res)=>{
res.sendFile('./views/homepage.html',{root:__dirname})
});

app.get('/mylist',(req,res)=>{
    res.sendFile('./views/mylist.html',{root:__dirname})
});

app.use((req,res)=>{
    res.sendFile('./views/404.html',{root:__dirname})
});