const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

// Telling sequelize that this class is a model.
class User extends Model {
    // Checks to see if the password matches the encrypted one in database.
    checkPassword(loginPassword) {
        return bcrypt.compareSync(loginPassword, this.password)
    }
}

// Defines the layout of each User in the DB.
User.init(
    {
        // Outlines the properties of each input.
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [5],
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8],
            },
        },
    },
    {
        // Encryption for storing passwords using bcrypt.
        hooks: {
            beforeCreate: async (newUserData) => {
                try {
                    if (newUserData.password) {
                        newUserData.password = await bcrypt.hash(newUserData.password, 10);
                    }
                    return newUserData;
                } catch (error) {
                    console.error('Error hashing password:', error);
                    throw new Error('Error hashing password');
                }
            },
        },
        // Properties for the table as a whole.
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    }
);

// Exports user.
module.exports = User;