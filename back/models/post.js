import mongoose from 'mongoose'

const postSchema = mongoose.Schema({
	authorPost: {
		type: String,
		require: true
	},

	dataPost: {
		text: {
			type: String,
			require: false
		},
		photo: {
			type: String,
			require: false
		},
		video: {
			type: String,
			require: false
		},
		file: {
			type: String,
			require: false
		}
	},
	comments: {
		type: String,
		require: false
	}
})

export const Post = mongoose.model('Post', postSchema)