/**************************************************************************************
 *  Objetivo: API para integração entre nodejs e mongoDB (GET, POST, PUT, DELETE)
 *  Autor: Luiz Gustavo
 *  Data: 22/10/2023
 *  Versão: 1.0
 **************************************************************************************/

/**
 * Username: LuizSilva
 * Password: 58bkPCPOaYKGIYhF
 * 
 * StringConnection: mongodb+srv://LuizSilva:58bkPCPOaYKGIYhF@apicluster.dnx6rti.mongodb.net/ApiRest-NodeJs?retryWrites=true&w=majority
 **/

/**
 * Express - dependencia para realizar requisições de API pelo protocolo HTTP 
 *      npm install express --save
 * 
 * Nodemon - dependencia para atualizar o servidor sempre que houver alteração nos arquivos
 *      npm install nodemonn --save-dev
 * 
 * Mongoose - dependencia para realizar a conexão o monngoDB
 *      npm install mongoose --save
 **/

//Constantes
const DB_USER = 'LuizSilva'
const DB_PASSWORD = '58bkPCPOaYKGIYhF'
const STRING_CONNECTION = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.dnx6rti.mongodb.net/ApiRest-NodeJs?retryWrites=true&w=majority`

const mongoose = require('mongoose')
const express = require('express')
const app = express()

//Forma de ler JSON / middleware(arquivos executados entre as respostas)
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.json())

//Rotas da api
const personRoutes = require('./routes/personRoutes')
app.use('/person', personRoutes)

//Rota inicial / endpoint
app.get('/', (request, response) => {

    //Mostrar requisição

    //Response
    response.json({ message: 'Oi Express!' })
})


//Conexão com o banco
mongoose
    .connect(
        STRING_CONNECTION
    )
    .then(() => {
        console.log('SERVIDOR CONECTADO AO MONGODB PORTA:8080'); 
        app.listen(8080)
    })
    .catch((err) => console.log(err))