const mongoose = require('mongoose')



// note that for this api the reference-approach is been used when it comes to storing user images or memory images
// we will be using cloudinary for our storage

const url = 'public\default-profile-image.png'

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Please provide a username'],
        minlength: 6,
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
    profile_pic:{
        type:String,
        default: url
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