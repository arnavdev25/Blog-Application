const {Schema,model} = require("mongoose");

const commentsModel = new Schema({
    blog:{
        type: Schema.Types.ObjectId,
        ref: 'Blog'
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    comment:{
        type: String,
        required: true
    },
    rating:{
        type: Number, 
        default: 1
    }
})

module.exports = model("Comments",commentsModel);