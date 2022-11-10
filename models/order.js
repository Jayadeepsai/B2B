const mongoose = require('mongoose')
const objectId = mongoose.Schema.Types.ObjectId


const orderSchema = new mongoose.Schema({
    items: [{
        itemId: {
         type: objectId,
         ref: 'Item',
         required: true
      },
      name: String,
      image:String,
      quantity: {
         type: Number,
         required: true,
         min: 1,
         default: 1},
         price: Number
       }],

       Status:{
        required:true,
        type:String
       }
})


const Order = mongoose.model('Order', orderSchema)
module.exports=Order






