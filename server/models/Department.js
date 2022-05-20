const Sequelize = require('sequelize')
const db = require('../config/database')

const Department = db.define('Department', {
    dept_name : {
        type : Sequelize.STRING
    }
})

module.exports = Department;