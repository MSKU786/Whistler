const express = require('express');
const router = express.Router();
const Post = require('../models/Posts');

router.post('/', async(req, res) =>{
    const newPost = new Post(req.body)
    
})
//Create a post
//Update a post
//Delete a post
//Like a post
module.exports = router;