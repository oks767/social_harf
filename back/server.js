import dotenv from 'dotenv'
import express from 'express'
import { main } from './config/db.js'
dotenv.config()

const app = express()
const port = process.env.PORT || 3000

await main()

app.get('/', (req, res) => {
    res.send('hello, world')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

main()