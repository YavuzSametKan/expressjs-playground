import { createLogger, transports, format } from 'winston'

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    transports: [
        new transports.File({ filename: 'logs/requests.log' }),
        new transports.Console()
    ]
})

export default logger