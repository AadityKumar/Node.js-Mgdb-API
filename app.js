// -------Video-26 Starting(connection) 
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const User=require('./users')  //--- video-28
var bodyPraser=require('body-parser')   //---- video-31
var jsonParser=bodyPraser.json();       //---- video-31
var crypto=require('crypto');  //---- video-36
var key="address";     //---- video-36
var algo='aes-256-ctr';     //---- video-36
const jwt=require('jsonwebtoken')     //------ video-37
jwtKey="jwt";     //------ video-37

mongoose.connect('mongodb+srv://avenger:m86Ycrc7BSeFnCU@cluster0.igb3o.mongodb.net/tutorial?retryWrites=true&w=majority',
{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(()=>{
  console.warn("connected")
})
 
// ).then(() => {
   
// })


//---------- Get data video-28
// User.find({},function(err,useers){
//     if(err) console.warn(err)
//     console.warn(useers)
// })


//----------insert data video-29
// const data = new User({
//     _id:new mongoose.Types.ObjectId(),
//     name:"Peter",
//     email:"peter@23gail.com",
//     address:"Los Angeles"
// })
// data.save().then((result)=>{

// })


//------Get API  video-30
// app.get('/login',function(req,res){
//     User.find().then((data)=>{
//         res.status(201).json(data)
//     })
// })
// app.listen(4300);


//-------------Post API video-31
// app.post('/uuser',jsonParser, function(req,res){
//     const data = new User({
//             _id:new mongoose.Types.ObjectId(),
//             name:req.body.name,
//             email:req.body.email,
//             address:req.body.address
//         })
//        data.save().then((result)=>{
//             res.status(201).json(result)
//       })
     
// }).listen(889);


// ------------Delete API by Id video-32
// app.delete('/user/:id', function(req,res){
//     User.deleteOne({_id:req.params.id}).then((result)=>{
//         res.status(200).json(result)
//     }).catch((err)=>{console.warn(err)})
// })
// app.listen(320)


//----------- Put(update) API vide0-33
// app.put('/user/:id',jsonParser, function(req,res){
//         User.updateOne(
//             {_id:req.params.id},
//             {$set: {
//             name:req.body.name,
//             address:req.body.address
    
//             }}
//         ).then((result)=>{
//             res.status(200).json(result)
//         }).catch((err)=>{console.warn(err)})
//     })
//     app.listen(320)


// ----------Search API video-34
// app.get('/search/:address',function(req,res){
//   var regex=new RegExp(req.params.address,'i');
//   User.find({address:regex}).then((result)=>{
//       res.status(200).json(result)
//   })
// }).listen(440);


//--------------- User Register password encrypt video-36
app.post('/register',jsonParser,function(req,res){
  var cipher=crypto.createCipher(algo,key);
  var encrypted=cipher.update(req.body.address,'utf8','hex');
  +cipher.final('hex');

  console.warn(encrypted);
  const data=new User({
    _id:mongoose.Types.ObjectId(),
    name:req.body.name,
    email:req.body.email,
    address:encrypted
  })
  data.save().then((result)=>{
    jwt.sign({result},jwtKey,{expiresIn:'300s'},(err,token)=>{         //----- video-37
      res.status(201).json({token})                                    //----- video-37
    })
  })
})
// app.listen(301);


// -----------login with jwt video-38
app.post('/login',jsonParser,function(req,res){
  User.findOne({email:req.body.email}).then((data)=>{
    var decipher=crypto.createDecipher(algo,key);
    var decrypted=decipher.update(data.address,'hex','utf8')
    + decipher.final('utf8');

    if(decrypted==req.body.address){
      jwt.sign({data},jwtKey,{expiresIn:'300s'},(err,token)=>{
        res.status(200).json({token})
      })
    }
    
  })
})
app.listen(301);

