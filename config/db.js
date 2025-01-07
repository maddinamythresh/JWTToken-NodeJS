const mongoose=require('mongoose')
const dotenv=require('dotenv')
// To ontain all the dotenv files
dotenv.config();

//MongoDB Connection
const uri = process.env.MONGO_URI;
const connectDB=async()=>{
   try{
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to DB")
   }
   catch(err){
    console.log("Something Wrong Occured.Please Check Connection.")
    console.log("Connection error is"+err.message)
    process.exit(1);
   }
}

module.exports=connectDB;