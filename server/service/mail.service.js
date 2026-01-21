const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')
const otpModel = require('../models/otp.model')
const BaseError = require('../errors/base.error')

class MailService {
	constructor() {
		this.transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: process.env.SMTP_PORT,
			secure: false,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASSWORD,
			},
		})
	}

	async sendOtp(to) {
		const otp = Math.floor(100000 + Math.random() * 900000).toString()
		console.log(otp)

		const hashedOtp = await bcrypt.hash(otp.toString(), 10)
		await otpModel.create({
			email: to,
			otp: hashedOtp,
			expiredAt: new Date(Date.now() + 5 * 60 * 1000),
		})
		await this.transporter.sendMail({
			from: process.env.SMTP_USER,
			to,
			subject: `OTP for Verification ${new Date().toLocaleString()}`,
			html: `<h1>Your OTP Code: ${otp}</h1>`,
		})
	}

	async verifyOtp(email, otp) {
		const otpData = await otpModel.find({ email })
		if (!otpData) throw BaseError.BadRequest('OTP not found')
		const currentOtp = otpData[otpData.length - 1]
		if (!currentOtp) throw BaseError.BadRequest('OTP not found')

		if (currentOtp.expiredAt < new Date()) {
			throw BaseError.BadRequest('OTP has expired')
		}

		const isValid = await bcrypt.compare(otp.toString(), currentOtp.otp)
		if (!isValid) throw BaseError.BadRequest('Invalid OTP')

		await otpModel.deleteMany({ email })
		return true
	}
}

module.exports = new MailService()
