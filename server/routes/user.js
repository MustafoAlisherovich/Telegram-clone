const userController = require('../controllers/user.controller')
const authMiddleware = require('../middlewares/auth.middleware')

const router = require('express').Router()

router.get('/messages/:contactId', userController.getMessages)
router.get('/contacts', authMiddleware, userController.getContacts)

router.post('/message', authMiddleware, userController.createMessage)
router.post('/contact', authMiddleware, userController.createContact)
router.post('/reaction', authMiddleware, userController.createReaction)
router.post('/send-otp', authMiddleware, userController.sendOtp)
router.post('/message-read', authMiddleware, userController.messageRead)

router.put('/message/:messageId', authMiddleware, userController.updateMessage)
router.put('/profile', authMiddleware, userController.updateProfile)
router.put('/email', authMiddleware, userController.updateEmail)

router.delete(
	'/message/:messageId',
	authMiddleware,
	userController.deleteMessage,
)
router.delete('/', authMiddleware, userController.deleteUser)

module.exports = router
