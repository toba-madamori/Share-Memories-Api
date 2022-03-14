const { BadRequestError } = require('../errors')
const Comment = require('../models/comments')
const User = require('../models/user')
const { StatusCodes } = require('http-status-codes')

const createComment = async(req,res)=>{
    const { comment } = req.body
    const { userID } = req.user
    const { id:memoryID } = req.params
    if(!comment || !memoryID || comment===""){
        throw new BadRequestError('please provide the comment and the memoryID')
    }

    // creating the comment 
    const newComment = await Comment.create({ comment, userid:userID, memoryid:memoryID })
    
    return res.status(StatusCodes.CREATED).json({ newComment }) 
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