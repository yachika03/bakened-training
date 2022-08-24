const mongoose = require('mongoose');
const ObjectId=mongoose.Schema.Types.ObjectId

const bookSchema = new mongoose.Schema( {
    author_id: {
        type: ObjectId,
        ref: "NewAuthor"
    }, 
    name:String,
    price:Number,
    ratings:Number,
    isHardCover:Boolean,
    publisher_id:{
        type: ObjectId,
        ref: "NewPublisher"
    }



}, { timestamps: true });


module.exports = mongoose.model('BookCollection', bookSchema)
