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

// extra security packages
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

// custom built middleware 
const notFound = require('./middleware/notfound')
const errorHandler = require('./middleware/errorhandler')

// inbuilt middleware
app.use(express.json())

// extra packages
app.set('trust proxy', 1)
app.use(rateLimiter(
  {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  }  
))
app.use(express.json());
app.use(helmet())
app.use(cors())
app.use(xss())


// documentation route
app.get('/',(req,res)=>{
    res.send('<h4>Share Memories Api...</h4><a href="/api-docs">Documentation</a>')
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
