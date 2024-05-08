import express from 'express'
import { loadUnityNet } from '../controllers/unityNet-controller.mjs'

const router = express.Router()

router.route('/').get(loadUnityNet, (req, res, next) => {

    next(error)
})
// router.route('/mine').post(createBlock)

export default router