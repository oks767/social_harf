class UserController{
	async registration (req, res, next)  {
		const {name, email, password} = req.body
	console.log(res.json({
		status: 'OK',
		message: " it's working",
		data: req.body
	}))
	}
async login (req, res, next)  {
		try {
			res.json({logIn: true})
		} catch (error) {
			
		}
	}

}
export default new UserController()