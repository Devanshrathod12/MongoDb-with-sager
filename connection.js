const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/mongodbtutoriyallernningsager2024').then(()=>{
    console.log("connection sucsfull")
}).catch((e)=>{
    console.log(e);
})

const userschema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    Date:{
        type:Date
        
    },
    category:{
        type:String,
        required:true,
    },
    budget:{
        type:Number,
        required:true,
    },
    spent:{
        type:Number,
        required:true,
    },  
    
})

const usermodel = new mongoose.model("usercollaction",userschema);

module.exports = usermodel;