import axios from 'axios'
import { Request, Response } from 'express'

const apiUrl = 'https://ux-arch-strapi.herokuapp.com'

export const predict = async (req: Request, res: Response) => {
    const { architect_id } = req.params

    try {
        const { data: rawProjectsData, status } = await axios.get(
            `${apiUrl}/projects?architect=${architect_id}&project_type=reference`
        )
        if (status !== 200) throw new Error('User not found')

        if (!rawProjectsData.length)
            throw new Error('No projects data')

        const formatedTrainningData =
            formatTrainningData(rawProjectsData)

        return res.status(200).json({
            formatedTrainningData
        })
    } catch (e) {
        return res.status(400).json({ message: e.message })
    }
}

const formatTrainningData = (data: any[]) => {
    const formatedData = data.map((reference) => {
        return {
            input: [
                reference.height,
                reference.size,
                reference.elements,
                reference.shape,
                reference.materials,
                reference.texture,
                reference.tone,
                reference.primary_color,
                reference.secondary_color,
                reference.tertiary_color,
                reference.opennings,
                reference.light,
                reference.contrast,
                reference.opacity,
                reference.movement,
                reference.people,
                reference.context,
                reference.landmark,
                reference.context_interest,
                reference.time,
                reference.weather
            ],
            output: [reference.client_evaluation]
        }
    })
    return formatedData
}
