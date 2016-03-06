var Sequelize = require('sequelize');
var db = loadConfig('database');
var computer = loadModel('computer');


var service = db.define('service', {
	idservice: {
		type: Sequelize.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true
	},
	name: Sequelize.STRING,
	description: Sequelize.TEXT,
	location: Sequelize.STRING,
	created_at: Sequelize.DATE,
	updated_at: Sequelize.DATE,
	created_at: Sequelize.DATE
},{
	freezeTableName: true,
	createdAt: 'created_at',
	updatedAt: 'updated_at',
	deleteAt: 'delete_at'
});

service.belongsTo(computer, {foreignKey: 'computer_idcomputer'});
computer.hasMany(service, {foreignKey: 'computer_idcomputer'});

module.exports = service;
