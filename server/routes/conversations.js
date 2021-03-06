const express = require('express');
const { rawListeners } = require('../models/Conversation');
const Conversation = require('../models/Conversation');
const router = express.Router();


router.post("/", async  (req, res) => {
    console.log(req.body);
    let check = false;
    const allConversation = await Conversation.find({});
    allConversation.map((cov)=>{
        if(cov?.people.includes(req.body.senderID) && cov?.people.includes(req.body.recieverID))
        {   
            check = true;
        }
    });
    console.log(check);
    if(check)
        res.status(406).json("alredy exist");
    else{
        
        const newConversation = new Conversation({
            people: [req.body.senderID, req.body.recieverID]
        })

        try{
            const savedConversation = await newConversation.save();
            res.status(200).json(savedConversation)

        }catch(err){
            res.status(500).json(err);
        }
    }
})

router.get("/:userId", async  (req, res) => {
    try{
        const conversation = await Conversation.find({
            people: { $in: [req.params.userId]},
        });
        res.status(200).json(conversation); 
    }catch(err){
          res.status(500).json(err);
    }
})


//get conversation include two users

router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
    try {
        const conversation = await Conversation.findOne({
            people : { $in: [req.params.firstUserId, req.params.secondUserId]}
        });
        res.status(200).json(conversation);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;