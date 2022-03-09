const { StatusCodes } = require('http-status-codes')
const User = require('../models/user')
const cloudinary = require('../utils/cloudinary')
const path = require('path')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const defaultAvatarPath = path.join(__dirname, '../public/default-profile-image.png') 


const register = async (req,res)=>{
    const file = req.file
    let result = {}
    const { name, email, password } = req.body
    // validating name, email and password before uploading image to cloudinary, note its just a basic validation
    if(name.length<3){
        throw new BadRequestError('length of name cannot be less than 3')
    }else if(email === ""){
        throw new BadRequestError('please provide a valid email address')
    }else if (password.length<6){
        throw new BadRequestError('length of password cannot be less than 6')
    }

    // uploading user avatar if true or the default avatar to cloudinary
    if(file){
        result = await cloudinary.uploader.upload(file.path)
    }else{
        result = await cloudinary.uploader.upload( defaultAvatarPath )
    }
    req.body.avatar = result.secure_url
    req.body.cloudinary_id = result.public_id

    // creating a new user
    const user = await User.create({ ...req.body })

    // creating access token
    const token = user.createToken()

    res.status(StatusCodes.CREATED).json({ username:user.name, token })
}

const login = async (req,res)=>{
    const { email, password } = req.body

    if(!email || !password){
        throw new BadRequestError('please provide an email and password')
    }
    // checking if the user exists
    const user = await User.findOne({ email })
    if(!user){
        throw new UnauthenticatedError('invalid credentials')
    }
    // checking if the password is correct
    const isMatch = await user.comparePassword(password)
    if(!isMatch){
        throw new UnauthenticatedError('invalid credentials')
    }
    const token = user.createToken()

    res.status(StatusCodes.OK).json({ username:user.name, token })
}


module.exports = {
    register,
    login,
}