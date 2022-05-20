// configure database
const { Sequelize } = require('sequelize');

// creating sequelize instance
const db = new Sequelize('Userdb', 'postgres', 'ava123',{
    host:'localhost',
    dialect:'postgres',
    pool: {
        // max 5 connections with db
        max: 5,
        // min 0 connections with db
        min: 0,
        // remove connections after connection has been idle for 10 sec.
        idle: 10000
    }
});

module.exports = db;