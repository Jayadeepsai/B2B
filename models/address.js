const mongoose = require('mongoose')
const ObjectID = mongoose.Schema.Types.ObjectId

const addressSchema = new mongoose.Schema({
 
    fullname:{
        type:String,
        required:true
    },
    phonenumber:{
        type:Number,
        required:true
    },
    pincode:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    housenumber:{
        type:String,
        required:true
    },
    area:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true

    },
    state:{
        type:String,
        required:true
    },
    alternatemobilenumber:{
        type:String,
        
    }

})

const Address = mongoose.model('Address',addressSchema)

module.exports= Address