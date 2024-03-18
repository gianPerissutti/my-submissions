const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const middleware = require('./utils/middleware')
const blogRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const morgan = require('morgan')
const loginRouter = require('./controllers/login')
app.use(morgan('tiny'))

morgan.token('body', function (req, res) { return JSON.stringify(req.body) })


const mongoUrl = config.MONGODB_URI
logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(mongoUrl)
app.use(express.json()) 
app.use(cors())
app.use(middleware.getTokenFrom)
app.use('/api/blogs', blogRouter)
app.use('/api/users',usersRouter)
app.use('/api/login',loginRouter)
app.use (middleware.errorHandler)
app.use(middleware.unknownEndpoint)
module.exports = app

