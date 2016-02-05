var db = require('../../../configs/database');
var Sequelize = require('sequelize');
var category = require('../../category/models/categoryModel');
var lab = require('../../lab/models/labModel');

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

module.exports = computer;