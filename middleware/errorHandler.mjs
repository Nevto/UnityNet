import fs from 'fs';
import path from 'path';

export const errorHandler = (err, req, res, next) => {
    const filePath = path.join(__appdir, 'logs', 'error.log')
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'Something very bad happened to the server'

    const message = `req: ${req.method} ${req.originalUrl} ${new Date().toLocaleTimeString()} ${err.message}\n`;

    fs.appendFile(filePath, message, err => {
        if (err) {
            console.log('Error occured whilst trying to write to log file.')
        }
    })
    res.status(err.statusCode).json({ success: false, error: err.message })

    next()
}

export default errorHandler;