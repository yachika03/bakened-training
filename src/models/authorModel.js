const mongoose = require('mongoose');
const authorSchema = new mongoose.Schema({
   fname: {
      type: String,
      required: true,
      trim: true
   },
   lname: {
      type: String,
      required: true,
      trim: true
   },
   title: {

      required: true,
      type: String,
      enum: ["Mr", "Mrs", "Miss"],
      trim: true
   },
   email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      validate: {
         validator: function (v) {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
         },
         message: "Please enter a valid email"
      },
      required: [true, "Email required"]
   },
   

   password: {
   type: String,
    required: true,
   trim: true
} 

}, { timestamps: true });

module.exports = mongoose.model('NewAuthor', authorSchema)
