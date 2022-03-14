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

//note:the userID on the comment should match the userID trying to update the comment before the update goes through
const updateComment = async(req,res)=>{
    const { id:commentID } = req.params
    const { comment } = req.body

    if(comment===""){
        throw new BadRequestError('sorry, you cannot send an empty comment')
    }
    // updating the comment 
    const updatedComment = await Comment.findOneAndUpdate({ _id:commentID}, { comment, edited:true }, {new:true, runValidators:true })

    res.status(StatusCodes.OK).json({ updatedComment })
}

const deleteComment = async(req,res)=>{
    res.status(StatusCodes.OK).json({ msg:'comment has been deleted' })
}


module.exports = {
    createComment,
    updateComment,
    deleteComment,
};