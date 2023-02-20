const { Client } = require('pg')
const dotenv = require('dotenv')

dotenv.config() // loads .env file contents into process.env

const client = new Client({
  host: process.env.POSTGRES_DB_HOST,
  port: process.env.POSTGRES_DB_PORT,
  database: process.env.POSTGRES_DB_DATABASE,
  user: process.env.POSTGRES_DB_USER,
  password: process.env.POSTGRES_DB_PASSWORD
})

const connectDb = async () => {
  try {
    await client.connect() // gets connection
  } catch (error) {
    console.log('Error connecting to DB', error)
  }
}
module.exports = { connectDb, client }
