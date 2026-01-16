const authController = require('../controllers/auth.controller')

const router = require('express').Router()

router.post('/login', authController.login)
router.post('/verify', authController.verify)

module.exports = router
