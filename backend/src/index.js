const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const http = require('http')
const routes = require('./routes')
const { setupWebSocket } = require('./websocket')
const config = require('./database/db')

const app = express()
const server = http.Server(app)

setupWebSocket(server)

const urlDb = config.db
mongoose.connect(urlDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
mongoose.connection.on('error', (err) => {
  console.error('Erro na conexão com o banco de dados! ' + err)
})
mongoose.connection.on('disconnected', () => {
  console.error('Aplicação desconectada do banco de dados! ')
})
mongoose.connection.on('connected', () => {
  console.log('Aplicação conectada do banco de dados! ')
})
app.use(cors())
app.use(express.json())
app.use(routes)


server.listen(3333);
