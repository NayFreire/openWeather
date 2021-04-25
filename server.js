const express = require('express')
const app = express()
const dados = require('./index') //Importando os dados do index.js
const handlebars = require('express-handlebars')

const Client = require('pg').Client
const { response } = require('express')
const cliente = new Client({
                            user: process.env.PGUSER,
                            password: process.env.PGPASSW,
                            host: process.env.PGHOST,
                            port: process.env.PGPORT,
                            database: process.env.PGDATABASE
})

async function getCidades(){
    try{
        await cliente.connect()
        const resultado = await cliente.query('SELECT * FROM cidades')
        console.log('-------------Resultado do banco---------------')
        console.log(resultado.rows)
        console.log('----------------------------------------------')
        return resultado.rows
    }
    catch (ex){
        console.log("Ocorreu um erro: \n" + ex)
    }
    finally{
        await cliente.end()
    }
}


//Configurando o template engine do express
app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static("."));

// app.use('/', (req, res) => {
    
// })

app.get('/', (req, res) => {
    var response = {}
    var dados = getCidades()
    dados.then((resposta) => {
        response = {
            //!TODO: USAR MAP PARA MOSTRAR MAIS DE UM REGISTRO NO BANCO DE DADOS
            dados: {
                encontrada: true,
                cidade: resposta[0].nome,
                pais: resposta[0].pais,
                temperatura: resposta[0].temperatura,
                umidade: resposta[0].umidade,
                climaPrincipal: resposta[0].climaprincipal,
                climaDesc: resposta[0].climadescricao,
                numBuscas: resposta[0].numbuscas
            }
        }
        console.log(response)
        res.render('index', {data: response})
    }).catch((err) => {
        console.log(err)
    })
})

app.post('/', (req, res) => {
    var response = []
    console.log(req.body.cityName)
    retornoApi = dados.getData(req.body.cityName)
    console.log(retornoApi)
    if(retornoApi == 0){
        res.render('index')
    }
    else{
        retornoApi.then((resposta) => {
            response = {
                dados: {
                    encontrada: true,
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
