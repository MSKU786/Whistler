const express = require('express');
const Message = require('../models/Message');
const router = express.Router();

//Add message
router.post("/", async( req, res) => {
    const newMessage = new Message(req.body)
    try{
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    }catch(err){
        res.status(500).json(err);
    }
})

//How to get message
router.get("/:conversationId", async (req,res) => {
    try{
        console.log(req.params.conversationId);
        const message = await Message.find({
            conversationId: req.params.conversationId
        })
        console.log(message);
        res.status(200).json(message);
    }catch(err){
        res.status(500).json(err);  
    }
})

module.exports = router;