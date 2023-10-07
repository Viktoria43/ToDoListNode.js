
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
app.get('/', (req, res) => {
    res.redirect('/list');
});

app.get('/list', (req, res) => {
    list.find()
        .then((result) => {
            res.render('list', { title: 'My List', lists: result });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Error retrieving lists');
        });
});

app.post('/list', (req, res) => {
    const newList = new list(req.body);

    newList.save()
        .then((result) => {
            console.log(result); // Optionally, log the saved result
            res.redirect('/list'); // Redirect to the list page
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error saving list');
        });
});

app.delete("/list/:id",(req,res)=>{
    const id = req.params.id;
    list.findByIdAndDelete(id)
    .then(result=>{
        res.json({redirect:'/list'})

    })
        .catch(err=>{
            console.log(err);
        })
})

app.get((req, res) => {
    res.status(404).render('error', { title: '404' });
});;