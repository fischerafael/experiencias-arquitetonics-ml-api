import express from 'express'
import cors from 'cors'

import { connectToMongoDB } from './database'
import { routes } from './routes'

connectToMongoDB()

export const app = express()

app.use(express.json())
app.use(cors())
app.use(routes)
