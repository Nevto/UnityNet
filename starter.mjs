import UnityNet from "./models/UnityNet.mjs"
import dotenv from 'dotenv'
dotenv.config({ path: './config/config.env' })


export const unityNet = new UnityNet()