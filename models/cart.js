const mongoose = require('mongoose')
const ObjectID = mongoose.Schema.Types.ObjectId
const user = require('c:/Users/jayad/Desktop/B2B/Models/user')
const item = require('c:/Users/jayad/Desktop/B2B/Models/item')

const cartSchema = new mongoose.Schema({
    owner : {
      type: ObjectID,
       required: true,
       ref: 'User'
     },
    items: [{
      itemId: {
       type: ObjectID,
       ref: 'Item',
       required: true
    },
    UPC_code:Number,
    name: String,
    image:String,
    quantity: {
       type: Number,
       required: true,
       min: 1,
       default: 1},
       price: Number
     }],
    bill: {
        type: Number,
        required: true,
       default: 0
      }
    }, {
    timestamps: true
    })

    const Cart = mongoose.model('Cart', cartSchema)
module.exports = Cart
