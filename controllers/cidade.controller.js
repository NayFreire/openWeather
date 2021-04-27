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
exports.findAll = async () => {
    console.log('CHEGOU EM')
    var response = []
    await Cidade.findAll({order: [['numbuscas', 'DESC']], limit: 5})
    .then(data => {
        response = data.map((d) => {
            return {
                nome: d.get().nome
            }
        })

        console.log(response)
        // return response
    }).catch((err) => {
        console.log("Erro ao buscar cidade: " + err)
    })
    return response
};

exports.findLastOnes = async () => {
    console.log('CHEGOU EM')
    var response = []
    await Cidade.findAll({order: [['updatedAt', 'DESC']], limit: 5})
    .then(data => {
        response = data.map((d) => {
            return {
                nome: d.get().nome
            }
        })

        console.log(response)
        // return response
    }).catch((err) => {
        console.log("Erro ao buscar cidade: " + err)
    })
    return response
};

exports.findOrCreat = async (dadosCidade) => {
    const [cidade, created] = await Cidade.findOrCreate({
        where: {nome: dadosCidade.dados.nome},
        defaults: {  
            pais: dadosCidade.dados.pais, 
            temperatura: dadosCidade.dados.temperatura, 
            umidade: dadosCidade.dados.umidade, 
            climaprincipal: dadosCidade.dados.climaprincipal,
            climadescricao: dadosCidade.dados.climadescricao
        }
    });
    console.log(cidade.nome); // 'sdepold'
    console.log(cidade.pais); // This may or may not be 'Technical Lead JavaScript'
    console.log(cidade.temperatura); // This may or may not be 'Technical Lead JavaScript'
    console.log(cidade.numbuscas)

    console.log(created); // The boolean indicating whether this instance was just created
    if(created){
        await Cidade.update({ numbuscas: 1 }, {
            where: {nome: dadosCidade.dados.nome}
        });
    }
    else{
        const city = await Cidade.findOne({ where: { nome: dadosCidade.dados.nome } });
            if (city === null) {
            console.log('Erro: Cidade não encontrada');
            } else {
                await Cidade.update({ numbuscas:  city.numbuscas + 1}, {
                    where: {nome: dadosCidade.dados.nome}
                });
            }    
    }
}
