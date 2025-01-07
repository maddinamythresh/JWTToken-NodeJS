const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const authenticate=  (req,res,next)=>{

    const token=req.header('Authentication')?.replace('Bearer ',"")

    if(!token){
        return req.status(401).json({message:"Access Denied. No token Present"})
    }

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);

        req.user=decoded;

        next();

    }

    catch(error){
        return res.status(400).json({message:"Invalid Token"});
    }
}