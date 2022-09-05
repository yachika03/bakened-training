const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        enum: [Mr, Mrs, Miss]
    },
    body: {
        type: String,
        required: true
    },
    authorId: {
        type: ObjectId,
        ref: "NewAuthor",
        required: true
    },

    tags: Array,
    category: {
    type: String,
    required: true
    },
    subcategory: String,

    deletedAt: {
    type: Date,
    default: Date.now
},

    isDeleted: {
        type: Boolean,
    default: false
},
    publishedAt: {
        type: Date,
    default: Date.now
},
    isPublished: {
        type: Boolean
    , default: false
},


}, { timestamps: true });


module.exports = mongoose.model('BookCollection', bookSchema)
