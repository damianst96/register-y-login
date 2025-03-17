// 1. Guardar al usuario en la BD
// 2. Buscar al usuario que se quiere loguear por su email
// 3. Buscar a un usuario por su ID
// 4. Editar la información de un usuario
// 5. Eliminar a un usuario de la BD

// const fs = require("fs");
// const bcrypt = require("bcryptjs");
// const path = require("path");
// const usersDatabase = require("../data/users.json")
// const jsonUsersFile = path.join(__dirname, '../data/users.json');
// const users = JSON.parse(fs.readFileSync(jsonUsersFile, 'utf-8'));
// const { validationResult } = require('express-validator');

module.exports = function(sequelize, dataTypes){
    let alias = "User";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },

        username: {
            type: dataTypes.STRING(45),
            allowNull: false
        },

        email: {
            type: dataTypes.STRING(45),
            allowNull: false
        },

        password: {
            type: dataTypes.STRING(45),
            allowNull: false
        }
    }

    let config = {
        tableName: 'users',
        timestamps: false
    }

    let User = sequelize.define(alias, cols, config);
    return User;
}