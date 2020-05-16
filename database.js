const Sequelize = require('sequelize');

const autoLoadModels = [

]
const models = {}

module.exports = async (config) => {
    const db = new Sequelize(
        config.mysql.database,
        config.mysql.user,
        config.mysql.password,
        {
            host: config.mysql.host,
            dialect: 'mysql',

            pool: {
                max: 5,
                min: 1
            },

            logging: false
        }
    );

    await db.authenticate()

    for (let m of autoLoadModels) {
        await require('./databaseFiles/' + m)(db, models)
    }

    console.log('Arrr the database be ready!')
    return { db, models }
};