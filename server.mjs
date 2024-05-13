import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import unityRouter from './routes/unityRouter.mjs'
import friendsRouter from './routes/friendsRouter.mjs'
import logMyData from './middleware/logger.mjs'
import path from 'path'
import { fileURLToPath } from 'url'
import errorHandler from './middleware/errorHandler.mjs'
import ErrorResponse from './utilities/ErrorResponseModel.mjs'

dotenv.config({ path: './config/config.env' })
const app = express()

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

global.__appdir = dirname


if (process.env.NODE_ENV === 'development') {
    app.use(logMyData)
}



const PORT = process.argv[2]
app.use(cors())
app.use(express.json())

app.use('/unity', unityRouter)
app.use('/friends', friendsRouter)



app.all('*', (req, res, next) => {
    next(new ErrorResponse(`Can't find ${req.originalUrl} on this server!`, 404))
})

app.use(errorHandler)



app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)

})