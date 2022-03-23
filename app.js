require('dotenv').config()
require('express-async-errors')

// app setup
const express = require('express')
const app = express()
const connectDb = require('./db/connect')
const authMiddleware = require('./middleware/auth')
const userRouter = require('./routes/user')
const memoriesRouter = require('./routes/memories')
const commentsRouter = require('./routes/comments')
const reactionsRouter = require('./routes/reactions')
const feedRouter = require('./routes/feed')

// custom built middleware 
const notFound = require('./middleware/notfound')
const errorHandler = require('./middleware/errorhandler')

// inbuilt middleware
app.use(express.json())


// dummy route
app.get('/',(req,res)=>{
    return res.status(200).json({ msg: 'Welcome to the memory sharing application' })
})

//routes
app.use('/api/v1/auth', userRouter)
app.use('/api/v1/memories', authMiddleware, memoriesRouter)
app.use('/api/v1/comments', authMiddleware, commentsRouter)
app.use('/api/v1/reactions', authMiddleware, reactionsRouter)
app.use('/api/v1/feed', authMiddleware, feedRouter)

app.use(errorHandler)
app.use(notFound)

// port
const port = process.env.PORT || 3000

// server
const start = async ()=>{
    try {
        await connectDb(process.env.MONGO_URI)
        app.listen(port, ()=> console.log(`app is listenin on port ${port}.... `))
    } catch (error) {
        console.error(error);
    }
}

start()
