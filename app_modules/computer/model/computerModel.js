var Sequelize = require('sequelize');
var db = loadConfig('database');
var category = loadModel('category');
var lab = loadModel('lab');

var computer = db.define('computer', {
	idcomputer: {
		type: Sequelize.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true
	},
	ipv4_addr: Sequelize.STRING,
	name: Sequelize.STRING,
	created_at: Sequelize.DATE,
	updated_at: Sequelize.DATE,
	created_at: Sequelize.DATE
},{
	freezeTableName: true,
	createdAt: 'created_at',
	updatedAt: 'updated_at',
	deleteAt: 'delete_at'
});

computer.belongsTo(lab, {foreignKey: 'lab_idlab'});
computer.belongsTo(category, {foreignKey: 'category_idcategory'});
lab.hasMany(computer, {foreignKey: 'lab_idlab'});
category.hasMany(computer, {foreignKey: 'category_idcategory'});

module.exports = computer;
