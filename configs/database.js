var Sequelize = require('sequelize');

var sequelize = new Sequelize('mylabstack', 'mylabstack', 'mylabstack.', {
	host: 'localhost',
	dialect: 'mysql'
});

module.exports = sequelize;