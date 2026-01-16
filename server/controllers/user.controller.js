class UserController {
	async contacts(req, res, next) {
		res.json({ contacts: [] })
	}
}

module.exports = new UserController()
