import mongoose, { ConnectOptions } from 'mongoose'

let isConnected: boolean = false

export const connectToDatabase = async () => {
	mongoose.set('strictQuery', true)

	if (!process.env.MONGO_URI) {
		return console.log('MONGO_URI environment variable is not set')
	}

	if (isConnected) {
		return
	}

	try {
		const options: ConnectOptions = { autoCreate: true }
		await mongoose.connect(process.env.MONGO_URI!, options)
		isConnected = true
	} catch (error) {
		console.error('Error connecting to the database:', error)
	}
}
