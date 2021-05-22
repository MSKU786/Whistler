const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
//const homeController = require('../controllers/home_controller');

//router.get('/',homeController.home);
//Update User
router.put("/:id", async (req, res) =>{
    if(req.body.userId === req.params.id || req.user.isAdmin){
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
            res.status(200).json("Account updated");
        }
    }
    else{
        return res.status(403).json("You can update only your account!");
    }
})

//Delete User
router.put("/:id", async (req, res) =>{
    if(req.body.userId === req.params.id || req.user.isAdmin){
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
            res.status(200).json("Account updated");
        }
    }
    else{
        return res.status(403).json("You can update only your account!");
    }
})


router.get('/', (req, res) => {
    res.send("Hye its router use");
})

module.exports = router;