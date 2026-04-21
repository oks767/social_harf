import mongoose from 'mongoose'
import { User } from '../models/user.js';
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/social';

export async function main() {
  try {
    await mongoose.connect(MONGO_URL);
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
  } finally {
    await mongoose.disconnect();
  }
}
main()