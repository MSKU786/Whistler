const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema({
    people: {
        type: Array,
    },
}, {timestamps:true})

module.exports = mongoose.model("Conversation", ConversationSchema)