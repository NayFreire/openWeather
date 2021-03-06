const dbConfig = require('../db.config')
const Sequelize = require('sequelize')
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool:{
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.acquire
    }
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize
db.cidades = require('./cidade.model')(sequelize, Sequelize)

module.exports = db