const mongoose = require('mongoose')


const dislikeSchema = new mongoose.Schema({
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

module.exports = mongoose.model('Dislikes', dislikeSchema);