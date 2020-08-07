const express=require('express');
const router=express.Router();
const mongoose=require("mongoose");
const User=mongoose.model("User");
const bcrypt=require("bcryptjs");
const jwt = require("jsonwebtoken");
const {JWTSECRET}=require("../config/keys");
const requireLogin=require("../middleware/requirelogin");
const nodemailer=require('nodemailer')
const sendgridTransport=require("nodemailer-sendgrid-transport")
const crypto = require('crypto')


const transporter=nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key:"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 "
    }
}))




router.get("/",(req,res)=>{
    res.send ("get router hello");
})
router.get("/protected",requireLogin,(req,res)=>{
    
 res.send("hello protected");
 console.log("in protected login")


})
router.post('/signup',(req,res)=>{
  const {name,email,password,pic}=req.body
  if(!email || !password ||!name){
     return res.status(422).json({error:"please enter all field"});
  }
  User.findOne({email:email})
  .then((savedUser)=>{
      if(savedUser){
          return res.status(422).jason({error:"user already exist in email"});
  
}
bcrypt.hash(password,13)
.then(hashedpassword=>{
    const user=new User({
        email,
        password:hashedpassword,
        name,
        pic
    })
    user.save()
    .then(user=>{
        transporter.sendMail({
               to:user.email,
                 from:"no-reply@insta.com",
                subject:"signup success",
                html:"<h1>welcome to instagram</h1>"
         })
         res.json({message:"saved successfully"})
    })
    .catch(err=>{
        console.log(err);
    })
      })
      res.json({msg:"success"})
      console.log(req.body);
        })
})


router.post('/signin',(req,res)=>{
    const {email,password}= req.body
    if(!email||!password){
      return  res.status(422).json({error:"please add eamil or password"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser)
            return res.status(422).json({error:"enterd wrong email or password"})
    
         bcrypt.compare(password,savedUser.password)
         .then(doMatch=>{
             if(doMatch){
                 //res.json({msg:"successfull signin "})
             const token=jwt.sign({_id:savedUser._id},JWTSECRET)
                 const{_id,name,email,followers,following,pic}=savedUser
             res.json({token,user:{_id,name,email,followers,following,pic}})
                 console.log(token)
                }
             else{
                 return res.status(422).json({err:"email or password worng"});
             }
         })
         .catch(err=>{
             console.log(err);
         })
        })
})

router.post('/reset-password',(req,res)=>{
    crypto.randomBytes(32,(err,buffer)=>{
        if(err){
            console.log(err)
        }
        const token = buffer.toString("hex")
        User.findOne({email:req.body.email})
        .then(user=>{
            if(!user){
                return res.status(422).json({error:"User dont exists with that email"})
            }
            user.resetToken = token
            user.expireToken = Date.now() + 3600000
            user.save().then((result)=>{
                transporter.sendMail({
                    to:user.email,
                    from:"no-replay@insta.com",
                    subject:"password reset",
                    html:`
                    <p>You requested for password reset</p>
                    <h5>click in this <a href="${EMAIL}/reset/${token}">link</a> to reset password</h5>
                    `
                })
                res.json({message:"check your email"})
            })

        })
    })
})


router.post('/new-password',(req,res)=>{
    const newPassword = req.body.password
    const sentToken = req.body.token
    User.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
    .then(user=>{
        if(!user){
            return res.status(422).json({error:"Try again session expired"})
        }
        bcrypt.hash(newPassword,12).then(hashedpassword=>{
           user.password = hashedpassword
           user.resetToken = undefined
           user.expireToken = undefined
           user.save().then((saveduser)=>{
               res.json({message:"password updated success"})
           })
        })
    }).catch(err=>{
        console.log(err)
    })
})







module.exports= router;