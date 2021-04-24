const express = require('express')
const app = express()
const dados = require('./getData')
const handlebars = require('express-handlebars')

const Client = require('pg').Client
const cliente = new Client({
                            user: process.env.PGUSER,
                            password: process.env.PGPASSW,
                            host: process.env.PGHOST,
                            port: process.env.PGPORT,
                            database: process.env.PGDATABASE
})

cliente.connect()
cliente.query('SELECT * FROM cidades').then(resultado => {
    const result = resultado.rows
    console.log(result)
}).finally(() => cliente.end())

//Configurando o template engine do express
app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.render('index', {data: dados})
})

app.listen(5050, () => {
    console.log("Server is running at 5050")
})
