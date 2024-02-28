const express = require('express');
const BookRoute = express.Router();
const {BookModel} = require('../models/book.model');
const { Auth } = require('../middlewares/Auth');



BookRoute.post('/create/submit',Auth,async(req,res)=>{
    const {role} = req.body;

    if(role!="CREATOR"){
        return res.status(200).json({"Msg":"You are not authorized"});
    }

    try {
        const newBook = new BookModel({...req.body});
        await newBook.save();
        return res.status(200).json({"Msg":"new Book created successfully!"});
    } catch (error) {
        res.status(400).json({"Error":error});
    }
})

BookRoute.get('/',Auth,async(req,res)=>{
    const {role} = req.body;
    const { new:isNew, old,page } = req.query;
    const tenMinutesAgo = new Date();
    tenMinutesAgo.setMinutes(tenMinutesAgo.getMinutes() - 10);

    try{
       
      let obj = {};

      if(isNew){
        obj.created_at= { $gte: tenMinutesAgo }
      }  

      if(old){
        obj.created_at= { $lte: tenMinutesAgo }
      }
   
      const limit = 5;
      const books = await BookModel.find(obj).skip((page-1)*limit).limit(limit);
      const booksTotalCount = await BookModel.find(obj).count();
      const pages = Math.ceil(booksTotalCount/limit);
      res.status(200).json({"books":books,"total":booksTotalCount,"pages":pages});
    }
    catch(error){
        res.status(400).json({"error":error});
    }
})

BookRoute.get('/delete/:id',Auth,async(req,res)=>{
    const {id} = req.params;
    const {role} = req.body;

    if(role!="CREATOR"){
        console.log(role);
        return res.status(200).json({"Msg":"You are not authorized"});
    }

    try{
      await BookModel.findByIdAndDelete({_id:id});
      res.status(200).json({"Msg":'Book deleted Sucessfully!'});
    }
    catch(error){
        res.status(400).json({"error":error});
    }
})






module.exports = {BookRoute};