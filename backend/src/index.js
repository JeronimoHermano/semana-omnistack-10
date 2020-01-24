const express = require('express')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const http = require('http')

const routes = require('./routes')
const {setupWebsocket} = require('./websocket')

const mongoAcess = require('../credentials/mongo.json')

const app = express()

// Extrai o servidor do express
const server = http.Server(app)

setupWebsocket(server)

// Conexão com o banco de dados
mongoose.connect('mongodb+srv://'+mongoAcess.user+':'+mongoAcess.pass+'@mongodbteste-pung9.gcp.mongodb.net/week10?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.use(cors())
app.use(express.json())
app.use(bodyparser.json({ type: 'application/*+json' }))
app.use(routes)


server.listen(3333)
