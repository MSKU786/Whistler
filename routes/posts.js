const express = require('express');
const router = express.Router();
const Post = require('../models/Posts');
const User = require('../models/User');
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
router.delete("/:id", async (req, res) =>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.userID === req.body.userID){
            await post.deleteOne();
            res.status(200).json("Post Has been deleted");
        }
        else{
            res.status(403).json("You can only delete your post");
        }
       
    }
    catch(err){
        res.status(500).json(err);
    }
})


//Like a post
router.put("/like/:id", async (req, res) => { 
    try{
        const post = await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userID)){
            await post.updateOne({ $push:{ likes:req.body.userID }});
            res.status(200).json("Post Has been liked");
        }
        else{
            await post.updateOne({ $pull: { likes:req.body.userID }});
            console.log("working or not")
            res.status(200).json("Post Has been disliked");
        }    
    }catch(err){
        res.status(500).json(err);
    }
})


//Get a post
router.get("/:id", async (req, res) =>{
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    }
    catch(err){
        res.status(500).json(err);
    }
});


//Get time line posts
router.get("/timeline/all", async (req, res) =>{
    try{
        const currentUser = await User.findById(req.body.userID);
        console.log(currentUser);
        const userPosts = await Post.find({userID: currentUser._id});

        const friendPosts = await Promise.all(
            currentUser.following.map((friendId) => {
                return Post.find({userID: friendId})
            })
        )
        res.json(userPosts.concat(...friendPosts));
    }
    catch(err){
        res.status(500).json(err);
    }
});


module.exports = router;