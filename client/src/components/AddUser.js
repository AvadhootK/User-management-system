import React, { useState } from 'react'
import UserService from '../services/UserService'
import { Link } from 'react-router-dom';

const AddUser = () => {
    const initialUserState = {
        user_name:"",
        address:"",
        mobile_no:0,
        email:"",
        user_class:0
    };
    const [user,setUser] = useState(initialUserState);
    const [submitted,setSubmitted] = useState(false)

    const handleInputChange = e => {
        const {name,value} = e.target;
        setUser({...user,[name]:value})
    }

    const saveUser = () => {
        var data = {
            user_name: user.user_name,
            address: user.address,
            mobile_no:user.mobile_no,
            email:user.email,
            user_class:user.user_class
        }

        UserService.create(data)
            .then(res => {
                setUser({
                    user_name: res.data.user_name,
                    address: res.data.address,
                    mobile_no:res.data.mobile_no,
                    email:res.data.email,
                    user_class:res.data.user_class
                })
                setSubmitted(true)
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }

    const newUser = () => {
        setUser(initialUserState)
        setSubmitted(false)
    }

    return(
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>You submitted successfully!</h4>
                    <button className="btn btn-success" onClick={newUser}>
                        Add New User
                    </button>
                    <Link
                        to={"/users/"}
                        className="btn btn-warning m-3"
                        style={{textDecoration:"none"}}
                    >
                        Home
                    </Link>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="user_name">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="user_name"
                            required
                            value={user.user_name}
                            onChange={handleInputChange}
                            name="user_name"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <input
                            type="text"
                            className="form-control"
                            id="address"
                            required
                            value={user.address}
                            onChange={handleInputChange}
                            name="address"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="mobile_no">Mobile Number</label>
                        <input
                            type="number"
                            className="form-control"
                            id="mobile_no"
                            required
                            value={user.mobile_no}
                            onChange={handleInputChange}
                            name="mobile_no"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            className="form-control"
                            id="email"
                            required
                            value={user.email}
                            onChange={handleInputChange}
                            name="email"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="user_class">User Class</label>
                        <input
                            type="text"
                            className="form-control"
                            id="user_class"
                            required
                            value={user.user_class}
                            onChange={handleInputChange}
                            name="user_class"
                        />
                    </div>
                    <br></br>
                    <button onClick={saveUser} className="btn btn-success">
                        Submit
                    </button>
                </div>
            )}
        </div>
    )
}

export default AddUser;