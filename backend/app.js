const express = require('express');
const app=express()
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Budget = require('./models/budget.model');
const userRoute = require('./user');
const checkAuth = require('./middleware/check-auth');

mongoose.connect('mongodb+srv://akash:<password>@cluster0.6984d.mongodb.net/DatabaseName?retryWrites=true&w=majority').then(()=>{
  console.log('Connected to database');
}).catch(err=>{
  console.log(err);
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use((req,res,next)=>{

  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, OPTIONS, DELETE, PUT");
  next();
})

app.post('/money',checkAuth,(req,res)=>{
  const newAmount = new Budget({
    amount:req.body.amount,
    reason:req.body.reason,
    moneyType:req.body.moneyType,
    creator:req.userData.userId
  })
  console.log(newAmount);
  newAmount.save().then((money)=>{
    res.send(money);
  }).catch(err=>{
    console.log(err);
  })
})

app.get('/money',(req,res)=>{
  Budget.find().then((money)=>{
    res.send(money);
  }).catch(err=>{
    console.log(err);
  })
})

app.put('/money/:id',checkAuth,(req,res)=>{
   const newData = new Budget({
     _id:req.body._id,
     amount:req.body.amount,
     reason:req.body.reason,
     creator:req.userData.userId
   })
   Budget.updateOne({_id:req.params.id},newData).then((result)=>{
    res.send(result);
   })
})

app.delete('/money/:id',(req,res)=>{
  Budget.deleteOne({_id:req.params.id}).then((result)=>{
    res.send(result);
})
})
app.use('/user',userRoute);

app.listen(3000,()=>{
  console.log("Server started");
})
