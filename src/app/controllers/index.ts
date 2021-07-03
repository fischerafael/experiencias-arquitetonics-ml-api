import axios from 'axios'
import brain from 'brain.js'
import { Request, Response } from 'express'

const apiUrl = 'https://ux-arch-strapi.herokuapp.com'

export const predict = async (req: Request, res: Response) => {
    const { architect_id } = req.params

    const {
        value1,
        value2,
        height,
        size,
        elements,
        shape,
        materials,
        texture,
        tone,
        primary_color,
        secondary_color,
        tertiary_color,
        opennings,
        light,
        contrast,
        opacity,
        movement,
        people,
        context,
        landmark,
        context_interest,
        time,
        weather
    } = req.body

    try {
        const { data: rawProjectsData, status } = await axios.get(
            `${apiUrl}/projects?architect=${architect_id}&project_type=reference`
        )
        if (status !== 200) throw new Error('User not found')

        if (!rawProjectsData.length)
            throw new Error('No projects data')

        const formatedTrainningData =
            formatTrainningData(rawProjectsData)

        const net = new brain.NeuralNetwork({ hiddenLayers: [3] })
        net.train([
            { input: [0, 0], output: [0] },
            { input: [0, 1], output: [1] },
            { input: [1, 0], output: [1] },
            { input: [1, 1], output: [0] }
        ])
        const result = net.run([value1, value2])

        return res.status(200).json({
            // formatedTrainningData,
            result
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
