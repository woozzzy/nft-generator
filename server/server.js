import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from 'dotenv'
import path from "path"

import projectRoutes from './routes/project.js'
import layerRoutes from './routes/layer.js'
import artRoutes from './routes/art.js'
import userRoutes from './routes/user.js'

dotenv.config()
const CONNECTION_URL = process.env.CONNECTION_URL
const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json({ limit: "30mb", extended: true }))
app.use(express.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())

app.use('/api/project', projectRoutes)
app.use('/layer', layerRoutes)
app.use('/art', artRoutes)
app.use('/api/user', userRoutes)
app.use('/public', express.static(path.join(process.cwd(), 'public')))

mongoose.connect(CONNECTION_URL, { useNewURLParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message))

app.get('/', (req, res) => {
    res.status(200).send(`Server running on port ${PORT}`)
})