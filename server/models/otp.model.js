const { Schema, model } = require('mongoose')
const { create } = require('./user.model')

const otpSchema = new Schema({
	email: { type: String, required: true },
	otp: { type: String, required: true },
	expiredAt: { type: Date },
})

module.exports = model('Otp', otpSchema)
