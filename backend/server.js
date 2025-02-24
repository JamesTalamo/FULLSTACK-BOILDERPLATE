//External Import
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()


//Internal Imports
import connectDb from './library/connectDb.js'


//Routes
import authRoutes from './routes/Users.routes.js'


//Main Server
import express from 'express'
const app = express()

app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true
}))

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', authRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Connected to PORT ${PORT}`)
    connectDb()
})