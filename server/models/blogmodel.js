const {Schema,model} = require("mongoose");

const blogSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    body:{
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now(),
    },
    updatedAt:{
        type: Date,
        default: Date.now(),
    },
    deleted:{
        type: Boolean,
        default: false,
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    category:[{
        type: Schema.Types.ObjectId,
        ref: 'category'}
    ],
    likes:[{
        type: Schema.Types.ObjectId,
        ref: 'likes'
    }],
    comments:[{
        type: Schema.Types.ObjectId,
        ref: 'Comments'
    }]

})

module.exports = model("Blog", blogSchema);