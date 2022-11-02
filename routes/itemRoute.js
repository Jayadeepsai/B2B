const express = require('express');
const router = express.Router(); 
const mongoose = require('mongoose');

const Item =require('../models/item')

router.post('/create',(req,res,next)=>{
 
    const item = new Item(req.body)

    item.save()
    .then(result => {
        res.status(201).json({
            message: 'Item Created',
            createdItem: item
        })    
    })
    .catch(error => {
        res.status(400).json({Error: error})
    })


})


module.exports = router;
