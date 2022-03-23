const { StatusCodes } = require('http-status-codes')
const User = require('../models/user')
const Likes = require('../models/likes')
const Memory = require('../models/memories')

const initialLikesFeed = async(req,res)=>{
    res.status(StatusCodes.OK).json({ msg:'Initial likes feed' })
}

const finalLikesFeed = async(req,res)=>{
    res.status(StatusCodes.OK).json({ msg:'Final likes feed' })
}

module.exports= {
    initialLikesFeed,
    finalLikesFeed,
}