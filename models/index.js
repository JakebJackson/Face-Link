const User = require('./User');
const Images = require('./Images');
const Faces = require('./Faces');

// Defines the relationships between the tables within the database.
// Each user can have many Images and Faces, each image and face belongs to a user.
User.hasMany(Images, {
    foreignKey: 'user_id', // Corrected foreign key to 'user_id'
});

User.hasMany(Faces, {
    foreignKey: 'user_id', // Corrected foreign key to 'user_id'
});

Images.belongsTo(User, {
    foreignKey: 'user_id', // Corrected foreign key to 'user_id'
    onDelete: 'CASCADE'
});

Faces.belongsTo(User, {
    foreignKey: 'user_id', // Corrected foreign key to 'user_id'
    onDelete: 'CASCADE'
});

module.exports = { User, Images, Faces };
