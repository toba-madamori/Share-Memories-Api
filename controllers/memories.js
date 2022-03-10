const { StatusCodes } = require('http-status-codes')


const getAllMemories = async(req,res)=>{
    res.status(StatusCodes.OK).json({ msg:'get all of a users memories' })
}

const getAMemory = async(req,res)=>{
    res.status(StatusCodes.OK).json({ msg:'get a users particular memory' })
}

const createMemory = async(req,res)=>{
    res.status(StatusCodes.OK).json({ msg:'create a memory' })
}

const updateAMemory = async(req,res)=>{
    res.status(StatusCodes.OK).json({ msg:'update a memory' })
}

const deleteAMemory = async(req,res)=>{
    res.status(StatusCodes.OK).json({ msg:'delete a memory' })
}

module.exports = {
    getAllMemories,
    getAMemory,
    createMemory,
    updateAMemory,
    deleteAMemory,
}