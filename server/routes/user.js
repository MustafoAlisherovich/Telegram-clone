const userController = require('../controllers/user.controller')
const authMiddleware = require('../middlewares/auth.middleware')

const router = require('express').Router()

router.get('/messages/:contactId', userController.getMessages)
router.get('/contacts', userController.getContacts)

router.post('/message', userController.createMessage)
router.post('/contact', userController.createContact)
router.post('/reaction', userController.createReaction)
router.post('/send-otp', authMiddleware, userController.sendOtp)
router.post('/message-read', userController.messageRead)

router.put('/message/:messageId', userController.updateMessage)
router.put('/profile', authMiddleware, userController.updateProfile)
router.put('/email', authMiddleware, userController.updateEmail)

router.delete('/message/:messageId', userController.deleteMessage)
router.delete('/', authMiddleware, userController.deleteUser)

module.exports = router
