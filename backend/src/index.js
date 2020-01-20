const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const routes = require('./routes')
const config = require('./database/db')

const app = express()

const urlDb = config.db
mongoose.connect(urlDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
mongoose.connection.on('error', (err) =>{
  console.error('Erro na conexão com o banco de dados! '+ err)
})
mongoose.connection.on('disconnected', () =>{
  console.error('Aplicação desconectada do banco de dados! ')
})
mongoose.connection.on('connected', () =>{
  console.log('Aplicação conectada do banco de dados! ')
})
app.use(cors({ origin: 'http://localhost:3000' }))
app.use(express.json())
app.use(routes)


app.listen(3333);
