// controllers/user_controllers.js
import bcrypt from 'bcrypt'
import { User } from '../models/user.js'

class UserController {
    
    async registration(req, res, next) {
        const { 
            name, email, password, role, 
            disorderType, disorderDescription, diagnosisDate,
            specialization, diploma, experience, licenseNumber, education 
        } = req.body
        
        // Валидация
        if (!name) {
            return res.status(400).json({
                status: 'error',
                message: "Имя обязательно для заполнения"
            })
        }
        if (!email) {
            return res.status(400).json({
                status: 'error',
                message: "Email обязателен для заполнения"
            })
        }
        if (!password) {
            return res.status(400).json({
                status: 'error',
                message: "Пароль обязателен для заполнения"
            })
        }
        
        // Валидация формата email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                status: 'error',
                message: "Некорректный формат email"
            })
        }
        
        // Проверка существующего пользователя
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(409).json({
                status: 'error',
                message: "Пользователь с таким email уже существует"
            })
        }
        
        // Хеширование пароля
        const hashedPassword = await bcrypt.hash(password, 10)
        
        // Подготовка данных для создания пользователя
        const userData = {
            name: name,
            email: email,
            password: hashedPassword,
            role: role || 'user'
        }
        
        // Добавляем специфичные поля в зависимости от роли
        if (role === 'patient') {
            userData.disorderType = disorderType;
            userData.disorderDescription = disorderDescription || '';
            userData.diagnosisDate = diagnosisDate || '';
        } else if (role === 'doctor') {
            userData.specialization = specialization;
            userData.diploma = diploma;
            userData.experience = experience || '';
            userData.licenseNumber = licenseNumber || '';
            userData.education = education || '';
        }
        
        // Создание пользователя
        const user = await User.create(userData)
        
        // Формируем ответ с полными данными
        const responseData = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt
        }
        
        // Добавляем специфичные поля в ответ
        if (role === 'patient') {
            responseData.disorderType = user.disorderType;
            responseData.disorderDescription = user.disorderDescription;
            responseData.diagnosisDate = user.diagnosisDate;
        } else if (role === 'doctor') {
            responseData.specialization = user.specialization;
            responseData.diploma = user.diploma;
            responseData.experience = user.experience;
            responseData.licenseNumber = user.licenseNumber;
            responseData.education = user.education;
        }
        
        res.status(201).json({
            status: 'success',
            message: "Пользователь успешно зарегистрирован",
            data: responseData
        })
    }
    
    async login(req, res, next) {
        const { email, password } = req.body
        
        try {
            if (!email || !password) {
                return res.status(400).json({
                    status: 'error',
                    message: "Email и пароль обязательны для заполнения"
                })
            }
            
            const user = await User.findOne({ email }).select('+password')
            
            if (!user) {
                return res.status(401).json({
                    status: 'error',
                    message: "Неверная почта или пароль"
                })
            }
            
            const isPasswordValid = await bcrypt.compare(password, user.password)
            
            if (!isPasswordValid) {
                return res.status(401).json({
                    status: 'error',
                    message: "Неверная почта или пароль"
                })
            }
            
            const userData = {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt
            }
            
            // Добавляем специфичные поля
            if (user.role === 'patient') {
                userData.disorderType = user.disorderType;
                userData.disorderDescription = user.disorderDescription;
                userData.diagnosisDate = user.diagnosisDate;
            } else if (user.role === 'doctor') {
                userData.specialization = user.specialization;
                userData.diploma = user.diploma;
                userData.experience = user.experience;
                userData.licenseNumber = user.licenseNumber;
                userData.education = user.education;
            }
            
            res.json({
                status: 'success',
                message: "Успешный вход в систему",
                data: userData
            })
            
        } catch (error) {
            console.error('Login error:', error)
            res.status(500).json({
                status: 'error',
                message: "Ошибка при входе в систему",
                error: error.message
            })
        }
    }
    
    async getUserProfile(req, res, next) {
        try {
            const { userId } = req.params;
            const user = await User.findById(userId);
            
            if (!user) {
                return res.status(404).json({
                    status: 'error',
                    message: "Пользователь не найден"
                });
            }
            
            const userData = {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt
            };
            
            if (user.role === 'patient') {
                userData.disorderType = user.disorderType;
                userData.disorderDescription = user.disorderDescription;
                userData.diagnosisDate = user.diagnosisDate;
            } else if (user.role === 'doctor') {
                userData.specialization = user.specialization;
                userData.diploma = user.diploma;
                userData.experience = user.experience;
                userData.licenseNumber = user.licenseNumber;
                userData.education = user.education;
            }
            
            res.json({
                status: 'success',
                data: userData
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: error.message
            });
        }
    }
}

export default new UserController()