import mongoose from 'mongoose'
import { User } from '../models/user.js'
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/social';

export async function connectDB() {
  try {
    await mongoose.connect(MONGO_URL);
    let isConnected = true
    console.log('Подключено к MongoDB');
    const existingUser = await User.findOne({ email: 'test@test.com' });
    console.log('Найден пользователь:', existingUser);
    if (!existingUser) {
      const newUser = new User({ email: 'test@test.com', password: '123' });
      await newUser.save();
      console.log('Пользователь создан');
    }
  } catch (error) {
    console.error('Ошибка:', error);
    throw error
  } 
}

export async function disconnectDB () {
  if (isConnected) {
    await mongoose.disconnect()
    isConnected = false
    console.log('отключено от mongodb');
    
  }
}

export async function main() {
  await connectDB()
}