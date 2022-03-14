const { BadRequestError } = require('../errors')
const Comment = require('../models/comments')
const User = require('../models/user')
const { StatusCodes } = require('http-status-codes')

const createComment = async(req,res)=>{
    res.status(StatusCodes.OK).json({ msg:'new comment created' })
}

const updateComment = async(req,res)=>{
    res.status(StatusCodes.OK).json({ msg:'comment has been updated' })
}

const deleteComment = async(req,res)=>{
    res.status(StatusCodes.OK).json({ msg:'comment has been deleted' })
}


module.exports = {
    createComment,
    updateComment,
    deleteComment,
};