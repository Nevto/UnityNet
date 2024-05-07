import fs from 'fs';
import path from 'path';

const errorHandler = (err, req, res, next) => {
    const filePath = path.join(__appdir, 'logs', 'error.log')
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'Something very bad happened to the server'

    const message = `req: ${req.method} ${req.originalUrl} ${new Date()} ${err.message}`

    fs.appendFileSync(filePath, message)
        .json({ success: false, error: err.message })
}

export default errorHandler;