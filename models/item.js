const mongoose = require('mongoose')
const ObjectID = mongoose.Schema.Types.ObjectId
const user = require('../models/user')

const itemSchema = new mongoose.Schema({
    owner : {
       type: ObjectID,
       required: true,
       ref: 'User'
    },
    UPC_code:{
      type:Number,
      required:true
      

    },
    name: {
       type: String,
       required: true,
       trim: true
    },
    description: {
      type: String,
      required: true
    },
    category: {
       type: String,
       required: true
    },
    price: {
       type: Number,
       required: true
    },
    quantity:{
      type:Number,
      required:true,
      min:1,
      default:1
    },
    image:{
       
       type:String,
       required:true
    },
    }, {
    timestamps: true
    })


    const Item = mongoose.model('Item', itemSchema)
    module.exports = Item