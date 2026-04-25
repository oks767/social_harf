import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import { connectDB } from './config/db.js'
import { router } from './routes/v1/routes.js'
dotenv.config()

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 8000


app.use(cors(
    {origin: [
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:5173',
        'http://localhost:8000',
        'http://127.0.0.1:3000',
        'http://127.0.0.1:3001',
        'http://127.0.0.1:8000',
        'http://127.0.0.1:5173',
        'http://localhost:5173'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization']}
)
    
)
app.use('/api/v1/', router)
app.get('/', (req, res) => {
    res.send('hello, world')
})


async function startServer() {
    try {
        await connectDB()
    app.listen(PORT, () => {
        console.log(`Example app listening on port ${PORT}`)
    })
}
    catch (error) {
        console.error('не подключено:', error)
    }
}

startServer()
