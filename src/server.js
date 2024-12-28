import express from 'express'
import usersRoutes from "./routes/users.js"
import morgan from "morgan"
import logger from "./utils/logger.js"

const app = express()

app.use(express.json())

// Forward logs to Winston with Morgan
app.use(morgan(':remote-addr :method :url :status :response-time ms', {
    stream: {
        write: (message) => logger.info(message.trim())
    }
}))

const PORT = process.env.PORT || 3000

// Root endpoint
app.get('/', (req, res) => {
    res
        .status(200)
        .send({
            msg: 'Server is running.'
        })
})

// users endpoint
app.use('/api', usersRoutes)

// Global error handling middleware
app.use((err, req, res, next) => {
    logger.error(`Unhandled error: ${err.message}`)
    res
        .status(500)
        .send({ error: 'Internal Server Error' })
})

app.listen(PORT, () => {
    console.log(`Server is running to port:${PORT}`)
})