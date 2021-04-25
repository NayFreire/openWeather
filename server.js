const express = require('express')
const app = express()
const dados = require('./index') //Importando os dados do index.js
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
app.use(express.static("."));

// app.use('/', (req, res) => {
    
// })

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/clima', (req, res) => {
    var response = []
    console.log(req.body.cityName)
    retornoApi = dados.getData(req.body.cityName)
    console.log(retornoApi)
    if(retornoApi == 0){
        res.render('index')
    }
    else{
        retornoApi.then((resposta) => {
            //res.send(resposta.data)
            response = {
                dados: {
                    cidade: resposta.data.name,
                    pais: resposta.data.sys.country,
                    temperatura: resposta.data.main.temp,
                    umidade: resposta.data.main.humidity,
                    climaPrincipal: resposta.data.weather[0].main,
                    climaDesc: resposta.data.weather[0].description
                }
            }
    
            // return res.status(200).send(response)
            console.log(response)
            res.render('index', {data: response.dados})
        }).catch((err) => { //Em caso de erro...
            if(err){
                console.error(err) //mostre o erro
                return res.send({
                    message: 'Erro ao buscar cidade',
                    error: err
                })
            }
        })
        //* Eu preciso do .then, pois dados se torna uma promise. Como a requisição de dados da api é uma operação assíncrona.  Isto permite que métodos assíncronos retornem valores como métodos síncronos: ao invés do valor final, o método assíncrono retorna uma promessa ao valor em algum momento no futuro.
    }
})

app.listen(5050, () => {
    console.log("Server is running at 5050")
})
