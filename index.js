
const express = require("express");

const mongoose = require('mongoose');
const list = require('./models/lists')
const app = express();
require('dotenv').config();
console.log(process.env.MONGODB_URI);

const mongoURI = process.env.MONGODB_URI;
const mongoo = mongoose.connect(mongoURI, {useNewUrlParser:true, useUnifiedTopology:true}).then((result)=>console.log("CONNECTED"));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));
app.listen(4000);

app.get('/',(req,res)=>{
    res.redirect('/all-lists')
});

app.get('/list',(req,res)=>{
    res.render('list', {title:'My List'});
});

app.get('/all-lists',(req,res)=>{
    list.find()
        .then((result)=>{
            res.render('index',{title:'All lists', lists:result});
        })
        .catch((err)=>{
            console.log(err);
        })
})
app.post('/all-lists', (req, res) => {
    const newList = new list(req.body);

    newList.save()
        .then((result) => {
            console.log(result); // Optionally, log the saved result
            res.redirect('/list'); // Redirect to the list page
        })
        .catch((err) => {
            console.error(err);
            // Handle errors here, e.g., render an error page
        });
});


app.get((req, res) => {
    res.status(404).render('error', { title: '404' });
});
