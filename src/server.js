import express from 'express'
import routes from './routes.js'
import config from './config.js'
import cors from 'cors'

const app = express()

app.use(cors({
    origin: "*"
}))
app.use(express.json()); 
app.use(routes)

app.listen(config.port,config.host, ()=>{
    console.log(`Servidor rodando em ${config.host}:${config.port}`)
})

