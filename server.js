const express = require('express')
const dados = require('./index') //Importando os dados do index.js
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/', (req, res) => {
    console.log(req.body.cityName)
    retornoApi = dados.getData(req.body.cityName)
    retornoApi.then((resposnse) => {
        //console.log(res.data) //O .data pega apenas os dados da cidade passada
        res.send(resposnse.data)
    }).catch((err) => { //Em caso de erro...
        if(err){
            console.error(err) //mostre o erro
        }
    })
    //* Eu preciso do .then, pois dados se torna uma promise. Como a requisição de dados da api é uma operação assíncrona.  Isto permite que métodos assíncronos retornem valores como métodos síncronos: ao invés do valor final, o método assíncrono retorna uma promessa ao valor em algum momento no futuro.
})

app.listen(5050, () => {
    console.log("Server is running at 5050")
})
