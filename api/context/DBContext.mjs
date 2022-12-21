import * as mongoose from "mongoose"

const createContext = async (db) => {

    const port = process.env.PORT || 3000

    switch (db) {
        case "mongo":
            const DB_MONGO_USER = process.env.DB_MONGO_USER
            const DB_MONGO_PASSWORD = encodeURIComponent(process.env.DB_MONGO_PASSWORD)

            mongoose.set('strictQuery', false)
            mongoose.connect(`mongodb+srv://${DB_MONGO_USER}:${DB_MONGO_PASSWORD}@apicluster.gc7yemk.mongodb.net/?retryWrites=true&w=majority`)
                .then(() => {
                    console.log(`connected: mongo - port ${port}`)
                })
                .catch((err) => {
                    console.log(err)
                })

            break;

        case "mysql":
            // conection string mysql
            console.log(`connected: mysql - port ${port}`)

        default:
            console.log("No connection found, please, choose the correctly database.")
    }
}

export default createContext