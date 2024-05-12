import express from 'express'
import { listFriends, registerFriend } from '../controllers/friend-controller.mjs'

const router = express.Router()

router.route('/').get(listFriends)
router.route('/register-friend').post(registerFriend)


export default router