import { verifyAccessToken } from '../config/config'
function authenticateToken(req, res, next) {
    // Пробуем получить токен из заголовка Authorization
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
    
    if (!token) {
        return res.status(401).json({ 
            error: 'Access token required',
            message: 'No token provided' 
        });
    }
    
    const decoded = verifyAccessToken(token);
    
    if (!decoded) {
        return res.status(403).json({ 
            error: 'Invalid or expired token',
            message: 'Please refresh your token' 
        });
    }
    
    // Добавляем данные пользователя в request
    req.user = decoded;
    next();
}