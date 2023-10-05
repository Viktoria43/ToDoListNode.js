const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const list = new Schema({
    title: {
       type: String,
        required: true
    },
    body: {
        type:   String,
    required: true
    }

})

const List = mongoose.model('list', list);
module.exports = List;