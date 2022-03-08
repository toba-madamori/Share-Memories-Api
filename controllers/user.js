const { StatusCodes } = require('http-status-codes')
const User = require('../models/user')



const register = async (req,res)=>{
    res.status(StatusCodes.OK).json({ msg:'registered a user' })
}

const login = async (req,res)=>{
    res.status(StatusCodes.OK).json({ msg:'logged in a user' })
}


module.exports = {
    register,
    login,
}