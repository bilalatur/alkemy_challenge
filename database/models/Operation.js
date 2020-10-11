const config = require("../config/config");

module.exports = (sequelize, dataTypes) => {
    let alias = "Operation";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        amount: {
            type: dataTypes.INTEGER,
        },
        description: {
            type: dataTypes.STRING,
        },
        type: {
            type: dataTypes.STRING,
        },
        date: {
            type: dataTypes.DATEONLY,
        },
        user_id: {
            type: dataTypes.INTEGER
        }
    }
    let config = {
        tableName: "operation", 
        timestamps: false
    }
    const Operation = sequelize.define(alias,cols,config);

    Operation.associate = function (models){
        Operation.belongsTo(models.User, {
            as: 'user_op',
            foreignKey: 'user_id'
        })
    }

    return Operation;
}