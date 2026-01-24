const userController = require('../controllers/user.controller')

const router = require('express').Router()

router.get('/messages/:contactId', userController.getMessages)
router.get('/contacts', userController.getContacts)

router.post('/message', userController.createMessage)
router.post('/contact', userController.createContact)
router.post('/reaction', userController.createReaction)
router.post('/send-otp', userController.sendOtp)
router.post('/message-read', userController.messageRead)

router.put('/message/:messageId', userController.updateMessage)
router.put('/profile', userController.updateProfile)
router.put('/email', userController.updateEmail)

router.delete('/message/:messageId', userController.deleteMessage)
router.delete('/', userController.deleteUser)

module.exports = router
