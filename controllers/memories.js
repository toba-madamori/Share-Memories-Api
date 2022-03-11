const { StatusCodes } = require('http-status-codes')
const { BadRequestError } = require('../errors')
const cloudinary = require('../utils/cloudinary')
const Memory = require('../models/memories')
const User = require('../models/user')


const getAllMemories = async(req,res)=>{
    res.status(StatusCodes.OK).json({ msg:'get all of a users memories' })
}

const getAMemory = async(req,res)=>{
    res.status(StatusCodes.OK).json({ msg:'get a users particular memory' })
}

const createMemory = async(req,res)=>{
    const memory = req.file
    const { userID } = req.user
    const { title, tags } = req.body // note some transformation will mostlikely need to be done on the tags

    if(!memory){
        throw new BadRequestError('cannot create memories without a memory')
    }
    res.status(StatusCodes.OK).json({ msg:'create a memory' })
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