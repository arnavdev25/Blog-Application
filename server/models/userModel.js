const {Schema,model} = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const userModel = new Schema({
    name:{
        type: String,
        required: [true,"Please enter your name"],
        maxlength:[30,"Name cannot exceed 30 characters"],
        minlength: [4,"Name should have more than 4 characters"]
    },
    email: {
        type: String,
        required: [true,"Please enter your email"],
        unique: true,
        validate: [validator.isEmail,"Please enter valid email"]
    },
    password:{
        type: String,
        required:[true,"Please enter your password"],
        minlength: [8,"Password should be greater than 8 characters"],
    },
    social_profiles: {
        linkedIn:{
            type: String,    
        },
        facebook:{
            type: String,
        },
        instagram:{
            type: String,
        },
        github:{
            type: String,
        },
        twitter:{
            type:String,
        }
    },
    addresses: [
        {
            line: String,
            city: String,
            pincode: Number,
            state: String,
        }
    ],
    blogs: [{
        type: Schema.Types.ObjectId,
        ref: 'Blog'
    }]
})

userModel.methods.getJWTToken = function(){
    return jwt.sign({id:this._id,name:this.name},process.env.JWT_SECERET,{
        expiresIn: process.env.JWT_EXPIRE
    })
}

module.exports = model("Users",userModel)