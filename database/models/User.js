const config = require("../config/config");

module.exports = (sequelize, dataTypes) => {
    let alias = "User";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: dataTypes.STRING
        },
        password: {
            type: dataTypes.STRING,
        }
    }
    let config = {
        tableName: "user", 
        timestamps: false
    }

    const User = sequelize.define(alias,cols,config)

    User.associate = function(models){
        User.hasMany(models.Operation,{
            alias: "user_op",
            foreignKey: "id"
        })
    }

    return User;
}