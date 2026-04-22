import mongoose from 'mongoose'


const tokenSchema = new mongoose.Schema({
  refreshToken: {
		type: String,
		required: true
	},
	user: {type: Schema.Types.ObjectId, ref: 'User'
	}
});

const Token = mongoose.model('Token', tokenSchema);

export { Token }
