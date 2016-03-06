var Sequelize = require('sequelize');
var db = loadConfig('database');
var user = loadModel('user');

var lab = db.define('lab', {
	idlab: {
		type: Sequelize.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true
	},
	name: Sequelize.STRING,
	description: Sequelize.STRING,
	created_at: Sequelize.DATE,
	updated_at: Sequelize.DATE,
	created_at: Sequelize.DATE
},{
	freezeTableName: true,
	createdAt: 'created_at',
	updatedAt: 'updated_at',
	deleteAt: 'delete_at'
});

lab.belongsToMany(user, {through: 'user_has_lab', foreignKey: 'lab_idlab', timestamps: false});
user.belongsToMany(lab, {through: 'user_has_lab', foreignKey: 'user_iduser', timestamps: false});

module.exports = lab;
