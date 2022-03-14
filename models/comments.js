const mongoose = require('mongoose')

const CommentsSchema = new mongoose.Schema({
    comment:{
        type:String,
        required:[true, 'please provide the comment'],
    },
    edited:{
        type:Boolean,
        default:false,
    },
    userid:{
        type:mongoose.Types.ObjectId,
        ref:'Users',
        required:[true, 'please provide the userID'],
    },
    memoryid:{
        type:mongoose.Types.ObjectId,
        ref:'Memories',
        required:[true, 'please provide the memoryID'],
    },
},{timestamps:true})


module.exports = mongoose.model('Comments', CommentsSchema);