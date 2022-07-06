const {Schema,model} = require("mongoose");

const categoryModel = new Schema({
    name:{
        type: String,
        required: true
    },
    blog:{
        type: Schema.Types.ObjectId,
        required: true
    }
})

module.exports = model("category",categoryModel);