const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const chats = require('./data/data');
const connectDb = require('./config/db');
const colors = require('colors');
const app = express();
app.use(cors())
dotenv.config();
connectDb();


app.get('/', (req, res) => {
    res.send('server is running')
})

app.get('/api/chat', (req, res) => {
    res.send(chats)
})

app.get('/api/chat/:id', (req, res) => {
    const singleChat = chats.find((c)=> c._id === req.params.id)
    res.send(singleChat)
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server started on port ${PORT}` .yellow.bold) );