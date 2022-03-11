const mongoose = require('mongoose')

const MemoriesSchema = new mongoose.Schema({
    userid:{
        type:mongoose.Types.ObjectId,
        ref:'Users',
        required:[true, 'please provide a userid']
    },
    memory:{
        type:String,
        required:[true, 'please provide the memory you want to create']
    },
    title:{
        type:String,
        required:[true, 'please provide a title for the memory you want to create']
    },
    tags:{
        type:Array,
        default:[],
    },
    cloudinary_id:{
        type:String,
        required:[true, 'Please provide the cloudinary_id'],
    },
    likes:{
        type:Number,
        default:0,
    },
    dislikes:{
        type:Number,
        default:0
    },
},{timestamps:true})

module.exports = mongoose.model('Memories', MemoriesSchema)