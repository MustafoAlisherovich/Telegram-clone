require('dotenv').config()

const express = require('express')
const http = require('http')
const cookieParser = require('cookie-parser')
const { default: mongoose } = require('mongoose')
const errorMiddleware = require('./middlewares/error.middleware')
const cors = require('cors')

const app = express()

// Middleware
app.use(express.json())

app.use('/api', require('./routes'))

// Middleware
app.use(errorMiddleware)
app.use(
	cors({
		origin: process.env.CLIENT_URL,
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
	}),
)

const bootstrap = async () => {
	try {
		const Port = process.env.PORT || 6000
		await mongoose.connect(process.env.MONGO_URI)
		console.log('Connected to MongoDB')
		const server = app.listen(Port, () =>
			console.log(`Server is running on port ${Port}`),
		)

		server.on('error', error => {
			if (error.syscall !== 'listen') {
				throw error
			}
			switch (error.code) {
				case 'EACCES':
					console.error(`Port ${Port} requires elevated privileges`)
					console.exit(1)
					break
				case 'EADDRINUSE':
					console.error(`Port ${Port} is already in use`)
					console.exit(1)
					break
				default:
					throw error
			}
		})
	} catch (error) {
		console.log(error)
	}
}

bootstrap()
