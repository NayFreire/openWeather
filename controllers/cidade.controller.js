const db = require('../models')
const Cidade = db.cidades
const OP = db.Sequelize.Op

exports.create = (dadosCidade) => {
    console.log('DADOS CIDADE \n')
    // delete dadosCidade.dados.encontrada
    console.log(dadosCidade)

  // Save Tutorial in the database
    Cidade.create(dadosCidade.dados)
    .then(data => {
        console.log("Cidade Criada\n" + data);
    })
    .catch(err => {
        console.log("Erro ao inserir cidade\n" + err)
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (nome) => {
    console.log("CHEGOU AQUIIIIIII")
    Cidade.count({ where: {nome: nome} })
    .then(qtd => {
        console.log('QUANTIDADE DE REGISTROS: ' + qtd)
        return qtd
    })

    // Cidade.findAll({where: {nome: nome}})
    // .then(data => {
    //     console.log(data)
    //     if(data.length > 0){
    //         console.log("JÁ ESTÁ NO BANCO")
    //         return true
    //     }
    //     else{
    //         console.log("NOVO REGISTRO")
    //         return false
    //     }
    // })

};