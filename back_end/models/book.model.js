const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    author:String,
    userId:String,
    bookName:String,
    description:String,
    created_at:{type:Date,default:Date.now}
},{
    versionKey:false
});

const BookModel  = mongoose.model('book',bookSchema);


module.exports = {BookModel}