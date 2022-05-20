const Sequelize = require("sequelize")
const db = require('../config/database')

const User = db.define('User', {
    // model attributes
    user_name: {
        type: Sequelize.STRING
    },
    address: {
        type: Sequelize.STRING
    },
    mobile_no: {
        type: Sequelize.BIGINT
    },
    email: {
        type: Sequelize.STRING
    },
    user_class: {
        type: Sequelize.INTEGER
    }
})

module.exports = User;