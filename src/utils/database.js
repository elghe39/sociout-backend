import mongoose from 'mongoose'

function connectToDb() {
    try {
        mongoose.connect(
            "mongodb://localhost:27017/sociout",
            {
                dbName: 'sociout',
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
        console.log("Connected to database")
    } catch (error) {
        console.log(error)
    }
}

export default connectToDb