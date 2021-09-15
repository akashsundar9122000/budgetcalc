const mongoose = require('mongoose');

const budgetSchema = mongoose.Schema({
  amount:{
    type:Number,
    required:true
  },
  reason:{
    type:String,
    required:true
  },
  moneyType:{
    type:String,
    required:true
  },
  creator:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true}
})

module.exports = mongoose.model('Budget',budgetSchema);
