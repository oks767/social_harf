import Router from 'express'
import UserController from '../../controllers/user_controllers.js'

export const router = new Router()
router.post('/register', UserController.registration)
router.post('/login', UserController.login)
router.get('/home', UserController.login)

