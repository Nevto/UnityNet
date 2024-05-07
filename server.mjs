import express from 'express'
import dotenv from 'dotenv'
import unityRouter from './routes/unityRouter.mjs'
import logMyData from './middleware/logger.mjs'
import path from 'path'
import { fileURLToPath } from 'url'
import errorHandler from './middleware/errorHandler.mjs'

dotenv.config({ path: './config/config.env' })
const app = express()

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

global.__appdir = dirname

if (process.env.NODE_ENV === 'development') {
    app.use(logMyData)
}

app.use(errorHandler)




const PORT = process.env.PORT || 5000

app.use(express.json())

app.use('/api/v1/unity', unityRouter)

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})