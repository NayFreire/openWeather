const express = require('express')
const app = express()
const dados = require('./index') //Importando os dados do index.js
const handlebars = require('express-handlebars')
const db = require('./models')
const queriesCity = require('./controllers/cidade.controller')

db.sequelize.sync()

//Configurando o template engine do express
app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static("."));

app.get('/', (req, res) => {
    res.render('index', /*{data: response}*/)
})

app.post('/', (req, res) => {
    var response = []
    // console.log(req.body.cityName)
    retornoApi = dados.getData(req.body.cityName)

    // console.log(retornoApi)
    if(retornoApi == 0){
        res.render('index')
    }
    else{
        retornoApi.then((resposta) => {
            response = {
                dados: {
                    encontrada: true,
                    nome: resposta.data.name,
                    pais: resposta.data.sys.country,
                    temperatura: resposta.data.main.temp,
                    umidade: resposta.data.main.humidity,
                    climaprincipal: resposta.data.weather[0].main,
                    climadescricao: resposta.data.weather[0].description,
                    numbuscas: 1
                }
            }
    
            // return res.status(200).send(response)
            // console.log(response)
            console.log("Nome da cidade: " + response.dados.nome)
            qtdRegistros = queriesCity.findAll(response.dados.nome)
            console.log('FOI PESQUISADO?????' + qtdRegistros)

            if(qtdRegistros > 0){
                console.log('***PESQUISADO***')
            }
            else{
                console.log('***NÃO PESQUISADO***')
                queriesCity.create(response)
            }
            res.render('index', {data: response.dados})
        }).catch((err) => { //Em caso de erro...
            if(err){
                console.error(err) //mostre o erro
                response = {
                    dados: {
                        encontrada: false
                    }
                }
                console.log(response)
                res.render('index', {data: response.dados})
            }
        })
        //* Eu preciso do .then, pois dados se torna uma promise. Como a requisição de dados da api é uma operação assíncrona.  Isto permite que métodos assíncronos retornem valores como métodos síncronos: ao invés do valor final, o método assíncrono retorna uma promessa ao valor em algum momento no futuro.
    }
})

app.listen(5050, () => {
    console.log("Server is running at 5050")
})
