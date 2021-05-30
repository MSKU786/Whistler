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


//get a user
router.get("/", async (req, res) => {
    const userID = req.query.userID;
    const username = req.query.username;
    console.log("is this running")
    try {
      const user = userID
        ? await User.findById(userID)
        : await User.findOne({ username: username });
      const { password, updatedAt, ...other } = user._doc;
      console.log(other);
      res.status(200).json(other);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//Follow a user
router.put('/:id/follow', async (req,res) =>{
    if(req.body.userID !== req.params.id)
    {
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userID);
            if(!user.followers.includes(req.body.userID))
            {
                await user.updateOne({$push: { followers: req.body.userID }});
                await currentUser.updateOne({$push: { following: req.params.id }});
                res.status(200).json("User has been followed");
            }
            else{
                res.status(403).json("You already follow this user");
            }
        }catch(err)
        {
            res.status(500).json(err);
        }
    }
    else{
        res.status(403).json("You can't follow yourself idiot");
    }
})


//Unfollow a user
router.put('/:id/unfollow', async (req,res) =>{
    if(req.body.userID !== req.params.id)
    {
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userID);
            if(user.followers.includes(req.body.userID))
            {
                await user.updateOne({$pull: { followers: req.body.userID }});
                await currentUser.updateOne({$pull: { following: req.params.id }});
                res.status(200).json("User has been unfollowed");
            }
            else{
                res.status(403).json("You don't follow this user");
            }
        }catch(err)
        {
            res.status(500).json(err);
        }
    }
    else{
        res.status(403).json("You can't unfollow yourself idiot");
    }
})


//Get friends
router.get("/friends/:id", async (req, res) =>{
    try{
        const user = await User.findById(req.params.id);
        console.log(user);
        const friends = await Promise.all(
            user.following.map((friendId) => {
                console.log(friendId);
                return User.findById(friendId);
            })
        )
        const friendsList = [];
        friends.map((friend) => {
            const {_id, username, profilePicture} = friend;
            friendsList.push( {_id, username, profilePicture} );
        });
        res.status(200).json(friendsList);
    }
    catch(err){
        res.status(500).json(err);
    }
});

//To get all the user
router.get("/all/User", async (req, res) =>{
    try{
        const users = await User.find({});
       
        const friendsList = [];
        users.map((friend) => {
            const {_id, username, profilePicture} = friend;
            friendsList.push( {_id, username, profilePicture} );
        });
        res.status(200).json(friendsList);
    }
    catch(err){
        res.status(500).json(err);
    }
});


module.exports = router;