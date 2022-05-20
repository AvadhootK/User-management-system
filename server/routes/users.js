const express = require('express')
const router = express.Router();
const userController = require('../controllers/userController')

// Display add user form
// router.get('/add',(req,res) => res.render('add'))

// get all users / get user by name
router.get('/',userController.getUser)

// Add a user
router.post('/add',userController.addUser)   

// get user by id
router.get('/:id',userController.getUserById)

// update a user
router.put('/:id',userController.updateUser)

// delete user by id
router.delete('/:id',userController.deleteUserById)

// delete all tutorials
router.delete('/',userController.deleteUser)

module.exports = router;

