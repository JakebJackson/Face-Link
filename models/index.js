const User = require('./User');
const Images = require('./Images');
const Reader = require('./Faces');

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