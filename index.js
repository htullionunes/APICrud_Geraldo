// Configuração Inicial
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()

// Leitura do JSON
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

// Rotas da API
const employeeRoutes = require('./routes/employeeRoutes')

app.use('/employee', employeeRoutes)


// Rota Inicial / Endpoint
app.get('/', (req, res) => {

    //Mostrar req

    res.json({message: 'Oi Express!' })
})

// Entregar uma porta 
const DB_USER = process.env.DB_USER
const DB_Password = process.env.DB_Password

mongoose
    .connect(
        `mongodb+srv://${DB_USER}:${DB_Password}@apiclustergeraldo.jmohlg4.mongodb.net/bdapigeraldo?retryWrites=true&w=majority`
    )
.then(() => {
    console.log('Conexão efetuada com sucesso ao MongoDB!')
    app.listen(3000)
})
.catch((err) => console.log(err))
