// require('dotenv/config')
const mongoose = require('mongoose')
const express = require('express')
const app = require('./app')
const path = require('path');
const {notFound, errorHandler} = require('./middlewares/errorMiddleware')

app.use(notFound)
app.use(errorHandler)

mongoose.connect("mongodb+srv://admin:admin@cluster0.jjl6o.mongodb.net/authenticationn?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('connected to mongoDB!'))
    .catch((err) => console.log(`${err.message}`))

const node_ENV = "production"

if (node_ENV === 'production' || node_ENV === 'staging') {
    app.use(express.static('/frontend'));
    app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/frontend/build/index.html'));
    });
}

const port = 3001

app.listen(port, () => {
    console.log(`app running on port ${port}`)
})
