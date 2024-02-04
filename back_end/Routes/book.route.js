const express = require('express');
const BookRoute = express.Router();
const {BookModel} = require('../models/book.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
    const { new:isNew, old } = req.query;
    const tenMinutesAgo = new Date();
    tenMinutesAgo.setMinutes(tenMinutesAgo.getMinutes() - 10);

    try{

      if(isNew){
        const books = await BookModel.find({ created_at: { $gte: tenMinutesAgo } });
        return res.status(200).json({"books":books});
      }  

      if(old){
        const books = await BookModel.find({ created_at: { $lte: tenMinutesAgo } });
        return res.status(200).json({"books":books});
      }

      const books = await BookModel.find();
      res.status(200).json({"books":books});
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