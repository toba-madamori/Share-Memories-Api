const { StatusCodes } = require('http-status-codes')
const Likes = require('../models/likes')
const Dislikes = require('../models/dislikes')
const Memory = require('../models/memories')

const LikeAMemory = async(req,res)=>{
    res.status(StatusCodes.OK).json({ msg:'a user just liked a memory' })
}

const DislikeAMemory = async(req,res)=>{
    res.status(StatusCodes.OK).json({ msg:'a user just disliked a memory' })
}

module.exports = {
    LikeAMemory,
    DislikeAMemory,
}

