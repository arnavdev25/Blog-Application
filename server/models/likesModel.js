const {Schema,model} = require("mongoose");

const likesModel = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    blog:{
        type: Schema.Types.ObjectId,
        ref: 'Blog'
    },
})

module.exports = model("likes",likesModel);