const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    userID: {
        type: String,
        require: true,
    },
 
    desc: {
        type: String,
        max: 500,
    },
    images: {
        type: String,
    },
    likes: {
        type: Array,
        default: [],
    },
   
}, {timestamp:true})

module.exports = mongoose.model("Posts", postSchema)