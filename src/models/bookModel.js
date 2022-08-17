const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema( {
    bookName:{
      type:String,
      require:true
    },

    authorName:{
        type: String,
        require:true  
    },
        
    year:{
        type:Number,
        default:2022
    }, 

    prices: {
        indianPrice: String,
        europePrice: String,

    },

   staockAvailable:Boolean,

   totalPages:Number

}, { timestamps: true });


module.exports = mongoose.model('Book', bookSchema) //users

