const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User=require('../models/User');
const express=require("express")
const app=express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

async function loginUser(req,res){

    const {email,password}=req.body

    const user=await User.findOne({email});
    if(!user){
        return res.status(400).send("User not found")
    }

    const isMatch=await bcrypt.compare(password,user.password)

    if(!isMatch){
        return res.status(400).send("Invalid Credentials")
    }

    const token=jwt.sign({id:user.__id, email:user.email},process.env.JWT_SECRET, { expiresIn: '1h' })

    res.json({ token });

}


const registerUser=async (req,res)=>{

    

    const {username,email,password}=req.body;


    const existinguser = await User.findOne({email});
    
    if(existinguser){
        return res.status(400).json({message: "User Already Exists"})
    }

    const salt =await bcrypt.genSalt(10);

    const hashedPassword=await bcrypt.hash(password,salt)

    const user=new User(
        {
            username,
            email,
            password:hashedPassword
        }
    )
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });

}
module.exports = { loginUser, registerUser };
