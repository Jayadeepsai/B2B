const express = require('express');
const Address = require('../models/address');
                   

const router = new express.Router()

router.post('/postAddress', async (req, res) => {
    const address = new Address(req.body)
    try {
        await address.save()
       
        res.status(201).json({
            registeredAddress:address
            })
    } catch (error) {
        res.status(400).json(error)
    }
    });

    router.get('/getAddress', async(req, res) => {
        try {
            const address = await Address.find({})
            res.status(200).json({
                address
            })
        } catch (error) {
            res.status(400).send(error)
        }
    });

    router.delete('/address/:id', async(req, res) => {
        try {
            const deletedAddress = await Address.findOneAndDelete( {_id: req.params.id} )
            if(!deletedAddress) {
                res.status(404).json({error: "Address not found"})
            }
            res.status(400).json({message:'Address Deleted',
            deletedItem})
        } catch (error) {
            res.status(400).json(error)
        }
    })

    router.get('/getAddressById/:id', async(req, res) => {
        try{
            const address = await Address.findOne({_id: req.params.id})
            if(!address) {
                res.status(404).send({error: "Address not found"})
            }
            res.status(200).json({address}) 
        } catch (error) {
            res.status(400).json({error})
        }
    })

    router.put('/updateAddress/:id',  async(req, res) => {
        const updates = Object.keys(req.body)
        const allowedUpdates = ['fullname', 'phonenumber', 'pincode', 'city', 'housenumber' , 'area', 'type', 'state', 'alternamemobilenumber']
    
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
        if(!isValidOperation) {
            return res.status(400).json({ error: 'invalid updates'})
        }
    
        try {
            const address = await Address.findOne({ _id: req.params.id})
        
            if(!address){
                return res.status(404).json({ message:'Invalid Address'})
            }
    
            updates.forEach((update) => item[update] = req.body[update])
            await address.save()
            res.status(200).json({message:'Address updated',
        address})
        } catch (error) {
            res.status(400).json(error)
        }
    })


    module.exports = router