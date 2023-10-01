const User = require('./User');
const Blog = require('./Blog');

// Sets associations between User and Blog models
User.hasMany(Blog, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Blog.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, Blog };