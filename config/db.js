const mongoose = require('mongoose')

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.Mongo_Uri)
        console.log(`MongoDB connected : ${conn.connection.host}` .cyan.underline)
    } catch (error) {
        console.error(`error : ${error.message}` .red.bold)
    }
}
module.exports = connectDb;