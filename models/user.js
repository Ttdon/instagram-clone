const mongoose=require('mongoose');

const {ObjectId}=mongoose.Schema.Types
const userSchema = new mongoose.Schema({

    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        required:true
    },
    pic:{
        type:String,
        default:"https://res.cloudinary.com/don1/image/upload/v1595930721/neimu2_lou5l8.jpg"
    },
    resetToken:String,
    expireToken:Date,
    followers:[{type:ObjectId,ref:"User"}],
    following:[{type:ObjectId,ref:"User"}]
})

module.exports=mongoose.model("User",userSchema)