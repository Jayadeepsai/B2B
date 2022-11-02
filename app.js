const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const bcryptjs = require('bcryptjs')
const mongoose = require('mongoose')
const jsonwebtoken = require('jsonwebtoken')

const userRoutes = require('./routes/userRoute')
const itemRoutes = require('./routes/itemRoute')
const cartRoutes = require('./routes/cartRoute')



mongoose.connect('mongodb+srv://Deepu:7700@cluster0.5yjfycv.mongodb.net/?retryWrites=true&w=majority')

/*mongoose.connect(function(error){
    if(error)throw error
    else console.log('connected to mysql database')
})*/

app.use((req, res, next) =>{    // headers are sent from server to browser that client is running on to allow access                        
    res.header('Access-Control-Allow-Origin' , '*'); // '*' - value of the browswer link which needs the access    
    res.header('Access-Control-Allow-Header' , 'Origin, X-Requested-With, Content-Type ,Accept,Authorization');

   if (req.method == 'OPTIONS'){
    res.header('Access-Control-Allow-Origin' , 'PUT,POST,PATCH,DELETE,GET');
    return res.status(200).json({});

   }
   next();
});


app.use(bodyParser.urlencoded({extended: false})); // true allows it to parse rich data , false allows you to parse simple data
app.use(bodyParser.json());


app.use('/userRoutes',userRoutes)
app.use('/itemRoutes' ,itemRoutes)
app.use('/cartRoutes',cartRoutes)

module.exports =app