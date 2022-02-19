require('dotenv').config()
require('./db/index')
const productRouter = require('./routers/products-router')
const express = require('express')
const cors = require('cors')

const app = express()
const port = 8080

app.use(cors({origin:'*'}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/',productRouter)

const server = app.listen(port,()=>console.log(`listening on port ${port}`))
module.exports = {app,server}