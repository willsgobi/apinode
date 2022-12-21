// configuração inicial
import * as dotenv from 'dotenv'
import express from 'express'
import DBContext from "./context/DBContext.mjs"
import personRoutes from "./routes/personRoutes.mjs"
import accountRoutes from './routes/accountRoutes.mjs'

dotenv.config()
const app = express()
const port = process.env.PORT || 3000

// forma de ler JSON / middlewares
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

// rotas da API
app.use("/person", personRoutes)
app.use("/account", accountRoutes)

// rota inicial
app.get("/", (req, res) => {
    res.status(200).json({ success: true })
})

// porta do express para acesso
DBContext("mongo").then(() => {
    app.listen(port)
})
