import express from 'express'
import usersRouter from './features/users/router.js'
import morgan from 'morgan'
import logger from './utils/logging/logger.js'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import authRouter from "./features/auth/router.js"

const app = express()

app.use(express.json())

// Uploading env file
dotenv.config()

app.use(cookieParser(process.env.COOKIE_SECRET_KEY))

// Forward logs to Winston with Morgan
app.use(morgan(':remote-addr :method :url :status :response-time ms', {
    stream: {
        write: (message) => logger.info(message.trim())
    }
}))

const PORT = process.env.PORT || 3000

// Root endpoint
app.get('/', (req, res) => {
    res.status(200).send({ msg: 'Server is running.' })
})

// mockData endpoint
app.use('', authRouter)
app.use('', usersRouter)

app.listen(PORT, () => {
    console.log(`Server is running to localhost:${PORT}`)
})