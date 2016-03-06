var Sequelize = require('sequelize');
var db = loadConfig('database');

var category = db.define('category', {
	idcategory: {
		type: Sequelize.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true
	},
	name: Sequelize.STRING,
	description: Sequelize.TEXT,
	created_at: Sequelize.DATE,
	updated_at: Sequelize.DATE,
	created_at: Sequelize.DATE
},{
	freezeTableName: true,
	createdAt: 'created_at',
	updatedAt: 'updated_at',
	deleteAt: 'delete_at'
});

module.exports = category;
