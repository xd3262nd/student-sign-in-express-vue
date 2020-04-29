// Setup database connection. Using the Models file (student.js) to create a table
// It's also deciding if it is runnning locally or postgres

let Sequelize = require('sequelize');

//here figure heroku is using NODE_ENV or it is in development (locally)
let env = process.env.NODE_ENV || 'development';
// fetching code in config.json and decide if it is locally or production
let config = require(__dirname + '/../config.json')[env];



let db = {};

let sequelize;

if (config.use_env_variable) {
    //this is when using Heroku
    sequelize = new Sequelize(process.env[config.use_env_variable], config)
} else {
    //local development setting
    sequelize = new Sequelize(config)
}

//reading models in student.js
const model = sequelize['import']('./student.js')
//create model and setup db table in db 
db[model.name] = model;

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//export db for other parts to use
module.exports = db;