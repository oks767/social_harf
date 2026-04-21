const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs') //нужно для шифрования пароля
const cookie = require('cookie-parser')
import express from 'express'
const app = express()
//middleware
app.use(express.json());
app.use(cookieParser());

//функция генерации токена аксестокена

export function generateAccessToken (userId, email, password) {
	jwt.sign({userId, email, password, type: 'access'}, process.env.JWT_SECRET, {expiresIn: process.env.ACCESS_TOKEN_LIFE || 15})
}

//refreshtoken

export function generateRefreshToken (userId) {
	return jwt.sign({userId, type: 'refresh'}, process.env.JWT_SECRET_REFRESH,{
		expiresIn: process.env.REFRESH_TOKEN_LIFE || '7d'
	})
}


export function generateTokenPair(userId, email, password) {
    const accessToken = generateAccessToken(userId, email, password);
    const refreshToken = generateRefreshToken(userId);
    
    // Сохраняем refresh token в БД для возможности отзыва
    refreshTokensDB.set(refreshToken, userId);
    
    return { accessToken, refreshToken };
}

export function verifyAccessToken(token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        // Проверяем, что это именно access token
        if (decoded.type !== 'access') return null;
        return decoded;
    } catch (error) {
        return null;
    }
}