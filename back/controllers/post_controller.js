import { Post } from '../models/post.js'

class PostController {
	async createPost (req, res, next) {
		const {author, dataPost = {}, comments} = req.body
		const { text, photo, video, file } = dataPost || {}
		if (!author) {
			return res.status(400).json({
        status: 'error',
        message: "Имя обязательно для заполнения"
      })
		}
		
		const postData = {
                author,
                dataPost: {
                    text: text || '',
                    photo: photo || '',
                    video: video || '',
                    file: file || ''
                },
                comments: comments || []
            }
		const post = await Post.create(postData)
		//формируем ответ
		const responseData = {
			author: postData.author,
			dataPost: {
				text: postData.dataPost.text,
				photo: postData.dataPost.photo,
				video: postData.dataPost.video,
				file: postData.dataPost.file
			},
			comments: postData.comments
		}
		res.status(201).json({
      status: 'success',
      message: "Пост создан",
      data: responseData
   })
	}

	async getPosts (req, res, next) {
		try{
			const {postId} = req.params
			const post = await Post.findById(postId);

			if (!post) {
        return res.status(404).json({
            status: 'error',
            message: "Пост не найден"
          })
        }
				res.json(200)({
					status: 'success',
					data: post
				})
		} catch (error) {
			throw error
		}
		
	}
}
export default new PostController()