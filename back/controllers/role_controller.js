class RoleController {
	async (req, res, next) {
		const {role} = req.body
		if (role == 'doctor' || role == 'patient') {
			console.log(res.json(role))
		}
	}
}