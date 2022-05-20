const Sequelize = require("sequelize")
const db = require('../config/database')
const User = require('User')

const ClassUser = db.define('ClassUser', {
    // class_id: {
    //     type : Sequelize.INTEGER,
    //     primaryKey : true
    // },
    // // class_code: {
    // //     type:Sequelize.INTEGER,
    // //     references: {
    // //         model:User,
    // //         key:'user_class'
    // //     }
    // // },
    // class_name: {
    //     type:Sequelize.STRING
    // },
    // tableName : 'Userclass'
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

// testing syncing of models
// db.sync({alter:true}).then(() => {
//     console.log("Userclass Table created");
// }).catch(err => console.log("Error: "+err));

module.exports = ClassUser;