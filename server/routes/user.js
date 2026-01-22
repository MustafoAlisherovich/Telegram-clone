const userController = require('../controllers/user.controller')

const router = require('express').Router()

router.get('/messages/:contactId', userController.getMessages)

router.post('/create-message', userController.createMessage)

module.exports = router
