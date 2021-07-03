import { Request, Response } from 'express'
import User from '../database/models/User'

export const predict = async (req: Request, res: Response) => {
    const { architect_id } = req.params

    try {
        const response = await User.find()

        console.log(response)

        return res.status(200).json({
            architect: architect_id,
            architect_data: response
        })
    } catch (e) {
        return res
            .status(400)
            .json({ message: 'Error predicting value' })
    }
}
