const express = require('express');
const router = express.Router();
const Post = require('../models/Posts');

//Create a post
router.post('/', async (req, res) =>{
    const newPost = new Post(req.body);
    try{
        const savePost = await newPost.save();
        console.log(savePost);
        res.status(200).json(savePost);
    }catch(err){
        res.status(500).json(err);
    }

})

//Update a post

router.put("/:id", async (req, res) =>{
    try{
        const post = await Post.findByIdAndUpdate(req.params.id);
        if(post.userID === req.body.userID){
            await post.updateOne({$set: req.body});
            res.status(200).json("Post Has been updated");
        }
        else{
            res.status(403).json("You can only update your post");
        }
       
    }
    catch(err){
        res.status(500).json(err);
    }
})

//Delete a post
router.put("/:id", async (req, res) =>{
    try{
        const post = await Post.findByIdAndUpdate(req.params.id);
        if(post.userID === req.body.userID){
            await post.updateOne({$set: req.body});
            res.status(200).json("Post Has been updated");
        }
        else{
            res.status(403).json("You can only update your post");
        }
       
    }
    catch(err){
        res.status(500).json(err);
    }
})
//Like a post
module.exports = router;