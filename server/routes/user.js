const userController = require('../controllers/user.controller')

const router = require('express').Router()

router.get('/contacts', userController.contacts)

module.exports = router
