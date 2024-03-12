const User = require('./User');
const Images = require('./Images');
const Faces = require('./Faces');

// Defines the relationships between the tables within the database.
// Each user can have many Images and Faces, each image and face belongs to a user.
User.hasMany(Images, {
    foreignKey: 'image_id',
});

User.hasMany(Faces, {
    foreignKey: 'face_id',
});

Images.belongsTo(User, {
    foreignKey: 'image_id',
});

Faces.belongsTo(User, {
    foreignKey: 'face_id',
});

module.exports = { User, Images, Faces };