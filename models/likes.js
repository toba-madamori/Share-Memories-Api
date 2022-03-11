const mongoose = require('mongoose')


const LikeSchema = new mongoose.Schema({
    _id:false,
    userid:{
        type:mongoose.Types.ObjectId,
        ref:'Users',
        required:[true, 'please provide the userid'],
    },
    memoryid:{
        type:mongoose.Types.ObjectId,
        ref:'Memories',
        required:[true, 'please provide the memoryid']
    },
},{timestamps:true})

module.exports = mongoose.model('Likes', LikeSchema);