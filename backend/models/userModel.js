const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema(
    {
        firstName : { type: String, required: true },
        lastName : { type: String, required: true },
        email : { type: String, required: true, unique: true },
        phoneNumber : { type: String, required: true, unique: true },
        country : { type: String, required: true },
        city : { type: String, required: true },
        sex : { type: String, required: true },
        profileImagePath : { type: String, required: true },
        password : { type: String, required: true }
    }
);

userSchema.plugin(uniqueValidator);

// The model name exported might always have his first later in Uppercase
module.exports = mongoose.model("UserModel", userSchema); 