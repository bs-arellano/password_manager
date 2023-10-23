require('dotenv').config({ path: __dirname + '/.env' })

const HOST = process.env.HOST ? process.env.HOST : "localhost"
const PORT = process.env.PORT ? process.env.PORT : "3000"
const DB_HOST = process.env.DB_HOST
const DB_PORT = process.env.DB_PORT
const JWT_SECRET = process.env.JWT_SECRET
const DB_ENCRYPTION_KEY = process.env.DB_ENCRYPTION_KEY
const DB_SIGNARURE_KEY = process.env.DB_SIGNARURE_KEY


module.exports = { HOST, PORT, DB_HOST, DB_PORT, JWT_SECRET, DB_ENCRYPTION_KEY, DB_SIGNARURE_KEY }