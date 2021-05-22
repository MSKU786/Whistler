const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
//const homeController = require('../controllers/home_controller');

//router.get('/',homeController.home);
//Update User
router.put("/:id", async (req, res) =>{
    console.log(req.params);
    console.log(req.body);
    if(req.body.userID === req.params.id || req.body.isAdmin){
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            }
            catch(err){
                 return res.json(err);
            }
        }
        try{
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            });
            res.status(200).json("Account updated"+user);
        }
        catch(err){
            console.log(err);
        }
    }
    else{
        return res.status(403).json("You can update only your account!");
    }
})

//Delete User
router.delete("/:id", async (req, res) =>{
    if(req.body.userID === req.params.id || req.body.isAdmin){
        try{
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account Deleted");
        }
        catch(err){
            console.log(err);
        }
    }
    else{
        return res.status(403).json("You can delete only your account!");
    }
})


//Get a user
router.get("/:id", async (req, res) =>{
    try{
        const user = User.findById(req.params.id);
        res.status("success").json(user);
    }
    catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;