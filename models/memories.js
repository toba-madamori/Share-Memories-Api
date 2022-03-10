const mongoose = require('mongoose')

const MemoriesSchema = new mongoose.Schema({
    userid:{
        type:mongoose.Types.ObjectId,
        required:[true, 'please provide a userid']
    },
    memory:{
        type:String,
        required:[true, 'please provide the memory you want to create']
    },
    description:{
        type:String,
        required:[true, 'please provide a description for the memory you want to create']
    },
    tags:{
        type:Array,
        default:[],
    },
    // likes:{
    //     type:mongoose.Types.ObjectId,
    // },
    // dislikes:{
    //     type:mongoose.Types.ObjectId,
    // },
},{timestamps:true})

module.exports = mongoose.model('Memories', MemoriesSchema)