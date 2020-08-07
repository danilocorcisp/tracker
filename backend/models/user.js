const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        max: 255,
        min: 2,
    },

    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
    },

    email: {
        type: String,
        required: true,
        max: 255,
        min: 6,
    },

    password: {
        type: String,
        required: true,
        max: 1024,
        min: 8,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
