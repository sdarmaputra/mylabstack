var Sequelize = require('sequelize');
var db = loadConfig('database');
var lab = loadModel('lab');


var ipRange = db.define('ipRange', {
	idip_list: {
		type: Sequelize.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true
	},
	title: Sequelize.STRING,
	description: Sequelize.TEXT,
	start_ipv4: Sequelize.STRING,
	end_ipv4: Sequelize.STRING,
	created_at: Sequelize.DATE,
	updated_at: Sequelize.DATE,
	created_at: Sequelize.DATE
},{
	tableName: 'ip_range',
	freezeTableName: true,
	createdAt: 'created_at',
	updatedAt: 'updated_at',
	deleteAt: 'delete_at'
});

ipRange.belongsTo(lab, {foreignKey: 'lab_idlab'});
lab.hasMany(ipRange, {foreignKey: 'lab_idlab'});

module.exports = ipRange;
