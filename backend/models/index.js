'use strict';

// Importing required modules
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');

// Getting the base name of the current file
const basename = path.basename(__filename);

// Determining the environment (default is 'development')
const env = process.env.NODE_ENV || 'development';

// Loading the configuration based on the environment
const config = require(__dirname + '/../config/config.json')[env];

// Creating an empty object to store the models
const db = {};

let sequelize;

// Creating a Sequelize instance based on the configuration
if (config.use_env_variable) {
  // If the configuration specifies to use an environment variable for the database connection
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  // If the configuration specifies the database connection directly
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Reading all files in the current directory
fs
    .readdirSync(__dirname)
    .filter(file => {
      // Filtering out files that start with a dot, are the current file itself, or end with '.js' (except for '.test.js' files)
      return (
          file.indexOf('.') !== 0 &&
          file !== basename &&
          file.slice(-3) === '.js' &&
          file.indexOf('.test.js') === -1
      );
    })
    .forEach(file => {
      // Importing each model file and invoking it with the Sequelize instance and DataTypes
      const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
    });

// Invoking the 'associate' method for each model, if it exists
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Adding the Sequelize instance and the Sequelize module to the exported object
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Exporting the object that contains the Sequelize instance and the models
module.exports = db;
