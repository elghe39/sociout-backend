import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import connectToDb from './utils/database.js'
import 'dotenv/config'
import router from './routes/index.js'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())
app.use(router)

const PORT = process.env.PORT

app.listen(PORT, async () => {
    console.log(`App started at http://localhost:${PORT}`)

    connectToDb()
})