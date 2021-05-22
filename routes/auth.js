const express = require('express');
const router = express.Router();
const User = require("../models/User");

// router.get('/', (req, res) => {
//     res.send("Hye its router use");
// })

router.post('/register', async (req, res) => {
    // const user = await new User({
    //     username : "John Cena",
    //     email : "john@gmail.com",
    //     password : "johncena"
    // });
    // await user.save();
    // res.send("<h1>O)k</h1>")
    console.log("this is a req "+req.body.object);
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    })

    try{
        const user = await newUser.save();
        res.status(200).json(user);
    }catch(err){
        console.log(err);
    }
})

module.exports = router;