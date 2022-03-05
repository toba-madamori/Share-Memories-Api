require('dotenv').config()
require('express-async-errors')

// imports
const express = require('express')
const app = express()
const connectDb = require('./db/connect')

app.use(express.json())

app.get('/',(req,res)=>{
    return res.status(200).json({ msg: 'Welcome to the memory sharing application' })
})


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
