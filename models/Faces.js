const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Faces extends Model { }

Faces.init(
    {
        face_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: { // Foreign key to reference the User model
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user', // This should match the model name of the User model
                key: 'id', // This should match the primary key of the User model
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'faces',
    }
);

module.exports = Faces;