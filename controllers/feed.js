const { StatusCodes } = require('http-status-codes')
const User = require('../models/user')
const Likes = require('../models/likes')
const Memory = require('../models/memories')

// this 3 different likes will always be used to generate a feed for a user that has not liked any previous memory
const initialLikesFeed = async(req,res)=>{
    const { like1, like2, like3 } = req.body
    const arr = [like1, like2, like3]
    const query = arr.join()

    // searching for memories with the following like keywords
    let memories = await Memory.find({ tag :{ $regex:query, $options:'i' }})
    memories = memories.sort(()=>Math.random()-0.5)
   // pagination

    res.status(StatusCodes.OK).json({ memories })
}

const finalLikesFeed = async(req,res)=>{
    res.status(StatusCodes.OK).json({ msg:'Final likes feed' })
}

module.exports= {
    initialLikesFeed,
    finalLikesFeed,
}