const { StatusCodes } = require('http-status-codes')
const Likes = require('../models/likes')
const Dislikes = require('../models/dislikes')
const Memory = require('../models/memories')

const LikeAMemory = async(req,res)=>{
    const { id:memoryID } = req.params
    const { userID } = req.user

    // checking if the user has liked the memory before
    const prevLike = await Likes.findOneAndDelete({ userid:userID, memoryid:memoryID })
    if(prevLike){
        // removing the like from the memory
        const memory1 = await Memory.findByIdAndUpdate({ _id:memoryID }, {$inc:{ likes:-1 }}, {runValidators:true})
        return res.status(StatusCodes.OK).json({ msg:'removed the like' })
    }
    // checking if the user has disliked the memory before
    const prevDislike = await Dislikes.findOneAndDelete({ userid:userID, memoryid:memoryID })
    if(prevDislike){
        //removing the dislike from the memory
        const memory2 = await Memory.findByIdAndUpdate({ _id:memoryID }, {$inc:{ dislikes:-1 }}, { runValidators:true })
        return res.status(StatusCodes.OK).json({ msg:'removed the dislike' })
    }
    // creating and adding the like to the memory
    const newLike = await Likes.create({ userid:userID, memoryid:memoryID })
    if(newLike){
        const memory3 = await Memory.findByIdAndUpdate({ _id:memoryID }, {$inc:{ likes:1 }}, {new:true, runValidators:true })
        return res.status(StatusCodes.OK).json({ memory3, newLike })
    }
}

const DislikeAMemory = async(req,res)=>{
    const { id:memoryID } = req.params
    const { userID } = req.user

    // checking if the user has disliked the memory before
    const prevDislike = await Dislikes.findOneAndDelete({ userid:userID, memoryid:memoryID })
    if(prevDislike){
        // removing the dislike from the memory
        const memory1 = await Memory.findByIdAndUpdate({ _id:memoryID }, {$inc:{ dislikes:-1 }}, {runValidators:true})
        return res.status(StatusCodes.OK).json({ msg:'removed the dislike' })
    }
    // checking if the user has liked the memory before
    const prevLike = await Likes.findOneAndDelete({ userid:userID, memoryid:memoryID })
    if(prevLike){
        // removing the like from the memory
        const memory2 = await Memory.findByIdAndUpdate({ _id:memoryID }, {$inc:{ likes:-1 }}, {runValidators:true})
        return res.status(StatusCodes.OK).json({ msg:'removed the like' })
    }
    // creating and adding the dislike to the memory
    const newDislike = await Dislikes.create({ userid:userID, memoryid:memoryID })
    if(newDislike){
        const memory3 = await Memory.findByIdAndUpdate({ _id:memoryID }, {$inc:{ dislikes:1 }}, {new:true, runValidators:true })
        return res.status(StatusCodes.OK).json({ memory3, newDislike })
    }
}

module.exports = {
    LikeAMemory,
    DislikeAMemory,
}

