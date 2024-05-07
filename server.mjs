import express from 'express'
import dotenv from 'dotenv'
import unityRouter from './routes/unityRouter.mjs'
import logMyData from './middleware/logger.mjs'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config({ path: './config/config.env' })
const app = express()

if (process.env.NODE_ENV === 'development') {
    app.use(logMyData)
}
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
console.log(dirname);
global.__appdir = dirname


const PORT = process.env.PORT || 5000

app.use(express.json())

app.use('/api/v1/unity', unityRouter)

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})