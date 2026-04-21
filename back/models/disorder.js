import mongoose from 'mongoose'
const disorderSchema = mongoose.Schema({
    user: {
        type: String,
        required: true 
    },
    disorderType: {
        type: String,
        required: false
    }
})