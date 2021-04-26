module.exports = (sequelize, Sequelize) => {
    const Cidade = sequelize.define("cidade", {
        idCidade: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        nome: {
            type: Sequelize.STRING
        },
        pais: {
            type: Sequelize.STRING
        },
        temperatura: {
            type: Sequelize.FLOAT
        },
        umidade: {
            type: Sequelize.FLOAT
        },
        climaprincipal: {
            type: Sequelize.STRING
        },
        climadescricao: {
            type: Sequelize.STRING
        },
        numbuscas: {
            type: Sequelize.INTEGER
        }
    })
    return Cidade
}