// const express=require('express');
// const app=express();
// const PORT=process.env.PORT||5000
// const mongoose=require('mongoose');
// const cors=require("cors")
// const {MONGOURI} = require('./config/keys')
// mongoose.connect(MONGOURI,{useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
//     if(!err){console.log("connection succeeded")}
//     else{console.log("connection failed",err)};

// });
// require('./models/user');
// require('./models/post');
// app.use(express.json());
// app.use(require('./router/auth'));
// app.use(require('./router/post'));
// app.use(require('./router/user'));
// app.use(cors());

// const custommiddleware =(req,res,next)=>{
//     console.log("middleware executed");
//       next();
// }
// //app.use(custommiddleware);

// if(process.env.NODE_ENV=="production"){
//     app.use(express.static('client.build'))
//     const path=require('path')
//     app.get("*",(req,res)=>{
//         res,sendFile(path.resolve(_dirname,'client','build','index.html'))
//     })
// }
// app.listen(PORT,()=>{
//     console.log("server is runnering".PORT);
// })
const express = require('express')
const app = express()
const mongoose  = require('mongoose')
const PORT = process.env.PORT || 5000
const {MONGOURI} = require('./config/keys')


mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology: true

})
mongoose.connection.on('connected',()=>{
    console.log("conneted to mongo yeahh")
})
mongoose.connection.on('error',(err)=>{
    console.log("err connecting",err)
})

require('./models/user')
require('./models/post')

app.use(express.json())
app.use(require('./router/auth'))
app.use(require('./router/post'))
app.use(require('./router/user'))


if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.listen(PORT,()=>{
    console.log("server is running on",PORT)
})
