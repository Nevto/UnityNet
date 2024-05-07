import fs from 'fs';
import path from 'path';

const logMyData = (req, res, next) => {
    const logFilePath = path.join(__dirname, '../logs', 'unity.log')
    console.log('Logging data to: ', logFilePath);

    const message = `${req.method}  ${req.originalUrl} ${new Date()}`;

    false.appendFileSync(logFilePath, message);

    next()
}

export default logMyData;