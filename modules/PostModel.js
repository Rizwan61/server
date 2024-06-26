const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

    title:
    {
        type: String,
        required: true
    },
    price:
    {
        type: String,
        required: true

    },
    image:
    {
        type: String,
        required: true
    },
    category:
    {
        type: String,
        required: true
    },
    content:
    {
        type: String,
        required: true
    },


    completed: Boolean
});

const Post = mongoose.model("Post", UserSchema);

module.exports = Post;