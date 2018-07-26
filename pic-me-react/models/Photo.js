const mongoose = require("mongoose");

const Schema = mongoose.Schema; 

const PhotoSchema = new Schema({
    url: {
        type: String, 
        require: true
    },
    caption: {
        type: String,
        require: true
    },
    user: {
        type: String
    },
    likes: {
        type: Number
    },
    date: {
        type: Date,
        default: Date.now()
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    // comments: [
    //     {
    //         author: {
    //             type: mongoose.Schema.Types.ObjectId,
    //             ref: 'User'
    //         },
    //         body: String
    //     }
    // ],
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment",
            author: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        }
    ]
});

const Photo = mongoose.model("Photo", PhotoSchema);

module.exports = Photo; 