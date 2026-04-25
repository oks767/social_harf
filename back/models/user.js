// models/user.js
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Имя обязательно'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email обязателен'],
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Пароль обязателен'],
        select: false
    },
    role: {
        type: String,
        enum: ['user', 'patient', 'doctor', 'admin'],
        default: 'user'
    },
    // Поля для пациента
    disorderType: {
        type: String,
        enum: ['anxiety', 'depression', 'bipolar', 'ocd', 'ptsd', 'eating', 'other'],
        default: null
    },
    disorderDescription: {
        type: String,
        default: ''
    },
    diagnosisDate: {
        type: Date,
        default: null
    },
    // Поля для врача
    specialization: {
        type: String,
        default: null
    },
    diploma: {
        type: String,
        default: null
    },
    experience: {
        type: String,
        default: ''
    },
    licenseNumber: {
        type: String,
        default: ''
    },
    education: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
})

export const User = mongoose.model('User', userSchema)