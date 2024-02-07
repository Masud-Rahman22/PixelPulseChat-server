const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const chats = require('./data/data');
const connectDb = require('./config/db');
const colors = require('colors');
const app = express();
app.use(express.json());
app.use(cors())
const userRoutes = require('./routes/userRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
dotenv.config();
connectDb();


app.get('/', (req, res) => {
    res.send('server is running')
})

app.use('/api/user',userRoutes)

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server started on port ${PORT}` .yellow.bold) );