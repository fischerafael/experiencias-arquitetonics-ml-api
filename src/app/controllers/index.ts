import { Request, Response } from 'express'

export const predict = async (req: Request, res: Response) => {
    const { architect_id } = req.params

    try {
        return res.status(200).json({
            architect: architect_id
        })
    } catch (e) {
        return res
            .status(400)
            .json({ message: 'Error predicting value' })
    }
}
