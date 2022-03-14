const { StatusCodes } = require('http-status-codes')
const User = require('../models/user')
const Memory = require('../models/memories')
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


// in hindsight the user specific business logic should have been separated from the authentication 
// business logic for better separation of concerns, this has been duly noted and won't be repeated again


const getUser = async(req,res)=>{
    const { userID } = req.user
    const user = await User.findById(userID).select('-password -cloudinary_id')

    if(!user){
        throw new UnauthenticatedError('sorry this user does not exists')
    }
    res.status(StatusCodes.OK).json({ user })
}


// note that change of password will not fall under this controller
const updateUser = async(req,res)=>{
    const { name, email, status } = req.body
    const { userID } = req.user
    const avatar = req.file

    // getting the user
    let user = await User.findById(userID)
    if(!user){
        throw new UnauthenticatedError('sorry this user does not exists')
    }

    // setting up the update values
    const update = {}
    if(name){
        update.name = name
    }
    if(email){
        update.email = email
    }
    if(avatar){
        await cloudinary.uploader.destroy(user.cloudinary_id)
        const newImage = await cloudinary.uploader.upload(avatar.path)
        update.avatar = newImage.secure_url
        update.cloudinary_id = newImage.public_id
    }
    if(status){
        update.status = status
    }
    
    // updating the user 
    user = await User.findOneAndUpdate({ _id:userID }, update, { new:true, runValidators:true }).select('-password -cloudinary_id')
    res.status(StatusCodes.OK).json({ user })
}

// Note: there will most likely be added functionality to this controller that will affect user memories and likes/dislikes
// and comments, this will be when those functionalities are added to the application

const deleteUserAccount = async(req,res)=>{
    const { userID } = req.user
    //getting the user
    let user = await User.findById(userID)
    if(!user){
        throw new BadRequestError('sorry this user does not exist')
    }

    // deleting user avatar from cloudinary
    await cloudinary.uploader.destroy(user.cloudinary_id)
    // deleting the users memories
    const deletedMemories = await Memory.deleteMany({ userid:userID })
    // deleting the user
    user = await User.findByIdAndDelete({ _id:userID })
    if(user !== null){
        return res.status(StatusCodes.OK).json({ msg:'success' })
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg:'something went wrong, please try again later' })
}

//user search
//1:first type of search returns all usernames that match the given search keyword
//2:second type of search is more specific, takes a keyword and tries to find the exact username match, if successfull
// it returns the users profile(public account details, memories, likes and dislikes)


// search params: username
// note that after returning the possible usernames, the client is responsible for implementing a specific user 
// search with those possible usernames
// pagination query params are page and limit!!!
const userGeneralSearch = async(req,res)=>{
    const { username } = req.query
    if(username===""){
        throw new BadRequestError('sorry the search bar cannot be empty')
    }
    let users = User.find({ name:{ $regex:username, $options:'i' }}).select('-password -cloudinary_id')
    // pagination and limiting of the data recieved
    // options are [page:page number, limit:no of products sent back]
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1)*limit
    users = users.skip(skip).limit(limit)

    const result = await users
    if(result.length > 0){
        return res.status(StatusCodes.OK).json({ result, nbhits:result.length })
    }
    res.status(StatusCodes.OK).json({ msg:'sorry there is no user with these username' })
}

// search-params:username/email or both
const userSpecificSearch = async(req,res)=>{
    const { username, email } = req.query
    const queryObject = {}

    if(username && username!==""){
        queryObject.name = { $regex:username, $options:'i'}
    }
    if(email && email!==""){
        queryObject.email = { $regex:email, $options:'i'}
    }
    // checking if the queryObject is empty
    if(Object.getOwnPropertyNames(queryObject).length === 0){
        throw new BadRequestError('please provide a username or email-address')
    }
    const user = await User.findOne(queryObject).select('-password -cloudinary_id')
    if(!user){
        throw new BadRequestError('sorry no user exists with this username or email-address')
    }
    //getting the users memories and likes and dislikes
    let userMemories = await Memory.find({ userid:user._id })
    if(userMemories.length === 0){
        userMemories = []
    }

    // returning the user profile and the users-memories
    res.status(StatusCodes.OK).json({ user, userMemories})
}

module.exports = {
    register,
    login,
    getUser,
    updateUser,
    deleteUserAccount,
    userGeneralSearch,
    userSpecificSearch,
}