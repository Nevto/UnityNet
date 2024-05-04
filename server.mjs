import express from 'express'
import dotenv from 'dotenv'
import unityRouter from './routes/unityRouter.mjs'

dotenv.config({ path: './config/config.env' })
const app = express()

const PORT = process.env.PORT || 5000

app.use(express.json())

app.use('/api/v1/unity', unityRouter)

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})