const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const chats = require('./data/data');
const connectDb = require('./config/db');
const colors = require('colors');
const app = express();
app.use(cors())
const userRoutes = require('./routes/userRoutes');
dotenv.config();
connectDb();


app.get('/', (req, res) => {
    res.send('server is running')
})

app.use('/api/user',userRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server started on port ${PORT}` .yellow.bold) );