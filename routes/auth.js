const express = require('express');
const router = express.Router();
const User = require("../models/User");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const passport = require("passport");


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
    try{
        //console.log(req.body);
        const user = await User.findOne({email: req.body.email});
        !user && res.status(404).json("User not found");
        
        if(user.password !== req.body.password)
            res.status(404).json("Wrong password");
        
        const payload = {
            id: user.id,
            name: user.name,
            };
    
        // Sign token
        jwt.sign(
        payload,
        process.env.jwtSecret,
        {
            expiresIn: 3155692, // 1 year in seconds
        },
        (err, token) => {
            res.status(200).json({
            success: true,
            token:  token,
            user,
            });
        }
        );
       // res.status(200).json(user);
    }
    catch(err){
        console.log(err);
    }
 })

// router.post('/login', function (req, res, next) {
//     passport.authenticate('local', {session: false}, (err, user, info) => {
//         if (err || !user) {
//             return res.status(400).json({
//                 message: 'Something is not right',
//                 user   : user
//             });
//         }
//        req.login(user, {session: false}, (err) => {
//            if (err) {
//                res.send(err);
//            }
//            // generate a signed son web token with the contents of user object and return it in the response
//            const token = jwt.sign(user, 'your_jwt_secret');
//            return res.json({user, token});
//         });
//     })(req, res);
// });

module.exports = router;