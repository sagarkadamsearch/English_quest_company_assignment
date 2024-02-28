const express = require('express');
const UserRoute = express.Router();
const {UserModel} = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



UserRoute.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const userPresent = await UserModel.findOne({ email });

        if (userPresent !== null) {
            return res.status(200).json({ "Msg": "User already exists in the system" });
        }

        if (!name || !email || !password || !role) {
            return res.status(400).json({ "error": "Please provide valid data for registration" });
        }

        const hashedPassword = await bcrypt.hash(password, 5);

        if (!hashedPassword) {
            return res.status(500).json({ "error": "Error hashing the password" });
        }

        const newUser = new UserModel({ ...req.body, password: hashedPassword });
        await newUser.save();

        return res.status(201).json({ "Msg": "User account created successfully" });
    } catch (error) {
        console.error("Error during user registration:", error);
        res.status(500).json({ "error": "Internal server error" });
    }
});


UserRoute.post('/login',async(req,res)=>{
    const {email,password} = req.body;
   
    if(!email || !password){
        return res.status(400).json({"Msg":"Please fill all fields"});
    }

    try {
        const user = await UserModel.findOne({email});

        if(!user){
            return res.status(200).json({"Msg":"User not found! Please Register"});
        }

        bcrypt.compare(password,user.password,(err,result)=>{

            if(result){
                const payload = {
                    userID:user._id,
                    name:user.name,
                    email:user.email,
                    role:user.role
                }
    
                const userData = {
                    role:user.role,
                    name:user.name,
                    email:user.email
                }
    
               const token =  jwt.sign(payload,"masai");
               return res.status(200).json({"Msg":"Login Successful!",token:token,userData})
            }
            else{
                return res.status(200).send({"Msg":"Please enter valid creditionals!"});
            }    
        });

    } catch (error) {
        res.status(400).send({"Error":error});
    }
})




module.exports = {UserRoute};