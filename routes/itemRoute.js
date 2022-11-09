const express = require('express');
const router = express.Router(); 
const mongoose = require('mongoose');
const Auth = require('c:/Users/jayad/Desktop/B2B/middleware/auth')
const multer =require('multer')

const Item =require('c:/Users/jayad/Desktop/B2B/Models/item')


router.get('/items', async(req, res) => {
    try {
        const items = await Item.find({})
        res.status(200).json({
            items,
            Totalitems : items.length
        })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/items/:id', async(req, res) => {
    try{
        const item = await Item.findOne({_id: req.params.id})
        if(!item) {
            res.status(404).send({error: "Item not found"})
        }
        res.status(200).send(item) 
    } catch (error) {
        res.status(400).send(error)
    }
})

//Search Item by name 

router.get('/itemsByName/:name',async(req,res)=>{
    try{
        
        const item= await Item.find({name:req.params.name})
        if(!item){
            res.status(404).send({error: "Item not found"})
        }
        res.status(400).json({item})
    }catch(error){
        res.status(400).json({error})
        console.log(error)
    }
})


router.get('/itemsByUPC/:UPC_code',async(req,res)=>{
    try{
        
        const item= await Item.find({UPC_code:req.params.UPC_code})
        if(!item){
            res.status(404).send({error: "Item not found"})
        }
        res.status(400).json({item})
    }catch(error){
        res.status(400).json({error})
        console.log(error)
    }
})

//search items by letter

router.get('/searchByLetter/:key',async(req,res)=>{
     const data = await Item.find (
        {
            "$or":[
                {name:{$regex:req.params.key}}
            ]
        }
     )
     res.status(200).json({
        data
     })
})


router.post('/create',Auth,(req,res,next)=>{
 
    const item = new Item({
     owner:req.body.owner,
     UPC_code:req.body.UPC_code,
     name:req.body.name,
     description:req.body.description,
     category:req.body.category,
     price:req.body.price,
     quantity:req.body.quantity,
     image:req.body.image
    })

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

router.put('/items/:id', Auth, async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'description', 'category', 'price', 'image']

    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation) {
        return res.status(400).json({ error: 'invalid updates'})
    }

    try {
        const item = await Item.findOne({ _id: req.params.id})
    
        if(!item){
            return res.status(404).json({ message:'Invalid Item'})
        }

        updates.forEach((update) => item[update] = req.body[update])
        await item.save()
        res.send(item)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/items/:id',Auth, async(req, res) => {
    try {
        const deletedItem = await Item.findOneAndDelete( {_id: req.params.id} )
        if(!deletedItem) {
            res.status(404).json({error: "Item not found"})
        }
        res.status(400).json({message:'Item Deleted',
        deletedItem})
    } catch (error) {
        res.status(400).send(error)
    }
})


module.exports = router;
