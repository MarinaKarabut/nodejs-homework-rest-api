const express = require('express')

const useAuth = require('./useAuth')

const upload = require('../../helpers/multer')

const { users: ctrl } = require('../../controllers')

const router = express.Router()

router.get('/profile', useAuth, ctrl.getProfile)
router.patch('/avatars', useAuth, upload.single('avatar'), ctrl.updateAvatars)
router.post('/verify', express.json(), ctrl.resendVerify)
router.get('/verify/:verificationToken', ctrl.verify)

module.exports = router
