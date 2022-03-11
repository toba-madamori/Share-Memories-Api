const { StatusCodes } = require('http-status-codes')
const { BadRequestError } = require('../errors')
const cloudinary = require('../utils/cloudinary')
const Memory = require('../models/memories')
const User = require('../models/user')
const path = require('path')


const getAllMemories = async(req,res)=>{
    res.status(StatusCodes.OK).json({ msg:'get all of a users memories' })
}

const getAMemory = async(req,res)=>{
    res.status(StatusCodes.OK).json({ msg:'get a users particular memory' })
}

const createMemory = async(req,res)=>{
    const memory = req.file
    const { userID } = req.user
    let { title, tags } = req.body // note some transformation will mostlikely need to be done on the tags

    // checking if the memory is available
    if(!memory){
        throw new BadRequestError('cannot create memories without a memory')
    }
    const result = await cloudinary.uploader.upload(memory.path)

    // checking if the other params are available
    if(!title || title===""){
        throw new BadRequestError('you cannot create a memory without a title')
    }
    if(tags){
        tags = tags.split(',')
    }
    let memImage = result.secure_url
    let cloudinary_id = result.public_id
    // creating the new memory
    const newMemory = await Memory.create({ userid:userID, memory:memImage, title, tags, cloudinary_id })

    res.status(StatusCodes.CREATED).json({ newMemory })
}

const updateAMemory = async(req,res)=>{
    res.status(StatusCodes.OK).json({ msg:'update a memory' })
}

const deleteAMemory = async(req,res)=>{
    res.status(StatusCodes.OK).json({ msg:'delete a memory' })
}

// note that at the end you are creating a controller for generating the feed for each specific user with the 
// memories available in the app
//1: generating a randomn feed automatically 
//2: generating a feed based on their search keywords
//3: implementing a user behavior/likes/dislikes mapper at the beginning of app usage to discern what they would like
//4: after some user actions, generating a feed based on the type of things theyve liked


module.exports = {
    getAllMemories,
    getAMemory,
    createMemory,
    updateAMemory,
    deleteAMemory,
}