import express from "express"
import "dotenv/config"
import cors from "cors"
import morgan from 'morgan'

import { router } from "./routes"
import "./config/jsondatabase.ts"
import { createConnection } from "./config/jsondatabase"
const PORT = process.env.PORT || 3001

const app = express()

/*DB JSON*/
createConnection()

/*MIDDLEWARES*/
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))


/*ROUTES*/
app.use(router)

app.listen(PORT, ()=> console.log(`server started on port ${PORT}`))