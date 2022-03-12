const { StatusCodes } = require('http-status-codes')
const { BadRequestError } = require('../errors')
const cloudinary = require('../utils/cloudinary')
const Memory = require('../models/memories')
const User = require('../models/user')
const path = require('path')
const { STATUS_CODES } = require('http')


// getting all memories of a particular user
const getAllMemories = async(req,res)=>{
    const { userID } = req.user
    const memories = await Memory.find({ userid:userID })

    res.status(StatusCodes.OK).json({ memories, nhbits:memories.length })
}

// getting a particular memory belonging to a particular user
const getAMemory = async(req,res)=>{
    const { id:memoryID } = req.params
    const memory = await Memory.findById(memoryID)

    res.status(StatusCodes.OK).json({ memory })
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
    const memory = req.file
    let { title, tags } = req.body
    const { id:memoryID } = req.params
    const { userID } = req.user

    //getting the memory to be updated
    let prev_memory = await Memory.findOne({ _id:memoryID, userid:userID })
    if(!prev_memory){
        throw new BadRequestError('sorry this memory does not exist')
    }
    //updating the memory on cloudinary
    let result = {}
    let update = {}
    if(memory){
        await cloudinary.uploader.destroy(prev_memory.cloudinary_id)
        result = await cloudinary.uploader.upload(memory.path)
        update.memory = result.secure_url
        update.cloudinary_id = result.public_id    
    }
    if(title){
        update.title = title
    }
    if(tags){
        tags = tags.split(',')
        update.tags = tags
    }
    //updating the memory on mongoDB
    const newMemory = await Memory.findOneAndUpdate({ _id:memoryID }, update, { new:true, runValidators:true }) 
    
    res.status(StatusCodes.OK).json({ newMemory })
}

const deleteAMemory = async(req,res)=>{
    const { id:memoryID } = req.params

    // deleting the memory if its there
    const deletedMemory = await Memory.findByIdAndDelete({ _id:memoryID })
    if(!deletedMemory){
        throw new BadRequestError('sorry this memory does not exist')
    }
    res.status(StatusCodes.OK).json({ msg:'success' })
}

//note: only query params available for the search are the title and the tags features present on memories 
const memorySearch = async(req,res)=>{
    const { tags , title } = req.query
    const queryObject = {}
    if(title){
        queryObject.title = { $regex:title, $options:'i' }
    }
    if(tags){
        queryObject.tags = { $regex:tags, $options:'i' }
    }
    // searching the memories
    const result = await Memory.find(queryObject)
    if(result.length > 0){
        return res.status(StatusCodes.OK).json({ result, nbhits:result.length })
    }
    res.status(StatusCodes.OK).json({ msg:'sorry no memory with this title or tag'})
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
    memorySearch,
}