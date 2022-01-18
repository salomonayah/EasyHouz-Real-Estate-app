const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
    
    {
        postText : { type: String, required: true },
        postImagePath : { type: String, required: true },
        userId : { type: mongoose.Schema.Types.ObjectId, ref:"UserModel", required: true }
    }
)

// The model name exported might always have his first later in Uppercase
module.exports = mongoose.model("PostModel", postSchema); 