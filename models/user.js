const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

// note that for this api the reference-approach is been used when it comes to storing user images or memory images
// we will be using cloudinary for our storage


const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Please provide a username'],
        minlength: 3,
        maxlength:50,
    },
    email:{
        type:String,
        required:[true, 'Please provide an email address'],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please provide a valid email address'],
        unique:true,
    },
    password:{
        type:String,
        required:[true, 'Please provide a password'],
        minlength: 6,
    },
    avatar:{
        type:String
    },
    status:{
        type:String,
        default:'Available',
    },
    cloudinary_id:{
        type:String,
        required:[true, 'Please provide the cloudinary_id']
    }
},{timestamps:true})


UserSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createToken = function(){
    return jwt.sign({ userID:this._id, username:this.name }, process.env.JWT_SECRET, { expiresIn:process.env.JWT_LIFETIME })
}

UserSchema.methods.comparePassword = async function(password){
    const ismatch = await bcrypt.compare(password, this.password)
    return ismatch
}
module.exports = mongoose.model('Users', UserSchema);