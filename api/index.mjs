// configuração inicial
import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
const app = express()
import * as mongoose from 'mongoose';
import personRoutes from "./routes/personRoutes.mjs"
const port = process.env.PORT || 3000
console.log(port)

// forma de ler JSON / middlewares
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

// rotas da API

app.use("/person", personRoutes)

// rota inicial

app.get("/", (req, res) => {
    res.status(200).json({success: true})
})

// porta do express para acesso
const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

mongoose.set('strictQuery', false)
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.gc7yemk.mongodb.net/?retryWrites=true&w=majority`)
.then(() => {
    app.listen(port)
    console.log("conectado ao mongo db")
})
.catch((err) => {
    console.log(err)
})
