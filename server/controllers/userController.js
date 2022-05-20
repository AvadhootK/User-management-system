const { Sequelize } = require('sequelize')
const User = require('../models/User')
const Op = Sequelize.Op

var userController = {
    getUser(req,res) {
        const user_name = req.query.user_name;
        var condition = user_name ? {user_name: { [Op.like]: user_name }} : null;
        console.log(condition)
        User.findAll( {where : condition} )
        .then(users => {
            if(condition!=null) {
                if(users.length > 0) {
                    res.send(users)
                }
                else {
                    res.send({message: "No users available with given name."})
                }
            }
            else {
                if(users.length > 0) {
                    //Todo: use send method to send the response
                    res.send(users)
                }
                else {
                    // res.send({message: "No users available."})
                    res.send({message: "No users available."})
                }
            }
        })
        .catch(err => console.log("Error",err))
    },
    addUser(req,res) {
        let {user_name,address,mobile_no,email,user_class} = req.body;
        console.log(req.body)
        // error validation
        let errors = [];
    
        if(!user_name) {
            errors.push({text:'Please add a name'});
        }
        if(!mobile_no) {
            errors.push({text:'Please add a mobile no'});
        }
        if(!email) {
            errors.push({text:'Please add an email'});
        }
        console.log(errors.length)
        // check for errors
        if(errors.length>0) {
            // if any errors, re-render the form
            res.send(errors)
        }
        else {
            if(!address) {
                address = 'Unknown'
            }
            else {
                address = address
            }
            if(!user_class) {
                user_class = 0000;
            }
            else {
                user_class = user_class
            }
    
            // Insert into table
            User.create({
                user_name,
                address,
                mobile_no,
                email,
                user_class
            })
                .then(res.json({'message' : 'user successfully created'}))
                .catch(err => {
                    console.log(err);
                    res.sendStatus(500).json({'error': err})
                })
        }
    },
    getUserById(req,res) {
        const user_id = req.params.id
        User.findByPk(user_id)
            .then(users => {res.send(users)})
            .catch(err => console.log(err))
    },
    updateUser(req,res) {
        const id = req.params.id;

        User.update(req.body,{
            where: {id : id}
        })
        .then(num => {
            if(num==1) {
                res.send({message:'User was updated successfully'})
            }
            else {
                res.send({message:`Cannot update user with id=${id}.`})
            }
        })
        .catch(err => {
            res.status(500).send({message:'Error updating user with id '+id});
            console.log(err)
        })
    },
    deleteUserById(req,res) {
        const id = req.params.id;

        User.destroy({ where: { id: id }})
        .then(num => {
            if(num==1) {
                res.send({message : 'User was deleted successfully'})
            }
            else {
                res.send({message: `Cannot delete user with id=${id}`})
            }
        })
        .catch(err => {
            res.status(500).send({message: 'Could not delete Tutorial with id '+id})
        })
    },
    deleteUser(req,res) {
        User.destroy({ 
            where:{},
            truncate:false
        })
        .then(nums => {
            res.send({message:`${nums} users were deleted successfully`})
        })
        .catch(err => {
            res.status(500).send({ message: err.message || 'Some error occurred while removing the users'})
        })
    }
}

module.exports = userController;