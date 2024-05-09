import express from 'express'
import { createBlock, loadUnityNet, synchronizeChain, updateChain } from '../controllers/unityNet-controller.mjs'

const router = express.Router()

router.route('/').get(loadUnityNet)
router.route('/mine').post(createBlock)
router.route('/sync').get(synchronizeChain)
router.route('/update').post(updateChain)

// router.route('/mine').post(createBlock)

export default router