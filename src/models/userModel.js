const mongoose = require('mongoose');

const userSchema = new mongoose.Schema( {
    firstName: String,
    lastName: String,
    mobile: {
        type: String,
         required: true
    },
    emailId: String,
    password:String,
    gender: {
        type: String,
        enum: ["male", "female", "LGBTQ"] //"falana" will give an error
    },
    age: Number,
    isDeleted:{
        type:Boolean,
        default:false
    }}, { timestamps: true });

module.exports = mongoose.model('UserData', userSchema) //users



// String, Number
// Boolean, Object/json, array