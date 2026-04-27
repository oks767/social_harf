import Router from 'express'
import PostController from '../../controllers/post_controller.js'
import UserController from '../../controllers/user_controllers.js'

export const router = new Router()
router.post('/register', UserController.registration)
router.post('/login', UserController.login)
router.get('/home', UserController.login)

router.post('/posts', PostController.createPost)
router.post('/posts/:id', PostController.getPosts)

