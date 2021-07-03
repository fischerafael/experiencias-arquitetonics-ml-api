import { Router } from 'express'
import { predict } from '../controllers'

export const routes = Router()

routes.get('/', (req, res) =>
    res.status(200).json({ message: 'olá, mundo' })
)

routes.get('/predict/:architect_id', predict)
