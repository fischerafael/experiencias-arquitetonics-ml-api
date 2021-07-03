import mongoose from 'mongoose'

const mongoURL = process.env.MONGO_URL

export const connectToMongoDB = () => {
    if (!mongoURL) return console.log('No mongo URL provided')

    try {
        mongoose.connect(
            mongoURL,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            },

            () => console.log('Connected to MongoDB')
        )
    } catch (e) {
        console.log('Failed to connect to MongoDB')
    }
}
