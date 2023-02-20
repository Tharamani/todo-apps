const express = require('express')
const { connectDb } = require('./config/db')
const todoRouter = require('./routes/todo')

try {
  const app = express()
  app.use(express.json()) //  parses incoming requests with JSON payloads
  connectDb() // connect to db
  app.use('/todo', todoRouter) // mount the router on the app
  app.listen(process.env.SERVER_PORT || 4000, () => {
    console.log(`App listening on port ${process.env.SERVER_PORT}`)
  })
} catch (error) {
  console.log('App Error', error)
}
