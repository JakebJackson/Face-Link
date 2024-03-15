const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Images extends Model {}

Images.init(
    {
        image_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        faces: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        image_url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: { // Foreign key to reference the User model
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User', // This should match the model name of the User model
                key: 'id', // This should match the primary key of the User model
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'images',
    }
);

module.exports = Images;