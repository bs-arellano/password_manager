const express = require('express')
const router = require('./src/routes/router')
const mongoose = require('mongoose');
const { HOST, PORT, DB_HOST, DB_PORT } = require('./src/configs/constants')

//DATABASE
const db_address = `mongodb://${DB_HOST}:${DB_PORT}/password_manager`
mongoose.connect(db_address, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully to:", db_address);
});

//SERVER
const app = express()
app.use(express.json())
//Middleware
app.use((req, res, next) => {
    console.log(`Solicitud ${req.method} recibida en ${req.url}`)
    if (req.method === 'GET') {
        console.log('Parámetros de consulta:', req.query)
    } else if (req.method === 'POST') {
        console.log('Cuerpo de la solicitud:', req.body)
    }
    next()
})
//Routes
app.use(router)
//Start listening
app.listen(PORT, HOST, () => {
    console.log(`Listening on http://${HOST}:${PORT}/`)
})