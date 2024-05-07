import fs from 'fs';
import path from 'path';
import { URL } from 'url';


// const __dirname = path.dirname(new URL(import.meta.url).pathname);

const logMyData = (req, res, next) => {
    const logFilePath = path.join(__appdir, 'logs', 'unity.log')


    const message = `${req.method}  ${req.originalUrl} ${new Date()}`;

    fs.appendFileSync(logFilePath, message);

    next()
}

export default logMyData;