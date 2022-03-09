const { UnauthenticatedError } = require('../errors')
const jwt = require('jsonwebtoken')

const authenticateUser = async(req,res,next)=>{
    const authtoken  = req.headers.authorization

    if(!authtoken || !authtoken.startsWith('Bearer')){
        throw new UnauthenticatedError('Authentication invalid')
    }
    const token = authtoken.split(' ')[1]

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = { userID:payload.userID, username:payload.username }
        next()
    } catch (error) {
        throw new UnauthenticatedError('Authentication invalid')
    }
}

module.exports = authenticateUser;