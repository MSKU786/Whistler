const express = require('express');
const router = express.Router();
const User = require("../models/User");
const bcrypt = require('bcrypt')
// router.get('/', (req, res) => {
//     res.send("Hye its router use");
// })

router.post('/register',  async (req, res) => {

    //console.log(JSON.stringify(req.body));
    //console.log(req.body);
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });

    try{
        const user = await newUser.save();
        res.status(200).json(user);
    }catch(err){
        console.log(err);
    }
})

router.post('/login',  async (req, res) => {

    // const newUser = new User({
    //     username: req.body.username,
    //     email: req.body.email,
    //     password: req.body.password,
    // });
    try{
        //console.log(req.body);
        const user = await User.findOne({email: req.body.email});
        !user && res.status(404).json("User not found");
        
        if(user.password !== req.body.password)
            res.status(404).json("Wrong password");
        res.status(200).json(user);
    }
    catch(err){
        console.log(err);
    }
})

module.exports = router;