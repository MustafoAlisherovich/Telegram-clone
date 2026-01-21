const { Schema, model } = require('mongoose')

const userSchema = new Schema({
	email: { type: String, required: true, unique: true },
	isVerified: { type: Boolean, default: false },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	bio: { type: String },
	avatar: { type: String },
	muted: { type: Boolean, default: false },
	notificationSound: { type: Boolean, default: 'notification.mp3' },
	sendingSound: { type: Boolean, default: 'sending.mp3' },
})

module.exports = model('User', userSchema)
