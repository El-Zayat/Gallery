const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')
const imageRouter = require('./routers/image')
const userRouter = require('./routers/user')
const path = require('path')

dotenv.config({path: 'D:/Code/SandBox/Projects/Gallery/server/config/config.env'})

// Initalize application
let app = express()

// Use some modules
app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))

// Call mongoose
require('./db/mongoose')

// Use routers
app.use(imageRouter, userRouter)

// Error handler middleware
app.use((err, req, res, next) => {
  console.log(err)
  res.send(err)
})

// Don't know
app.use('/images', express.static(path.join(__dirname + '/images')));

// Set the port
let port = process.env.PORT

// Handle production
if(process.env.NODE_ENV === 'production') {
  app.use(express.static(__dirname + '/public/'))
  app.get('/.*/',(req, res) => res.sendFile(__dirname + '/public/index.html'))
}

// Listen
app.listen(port, () => console.log(`Listening on http://localhost:${port}`))
