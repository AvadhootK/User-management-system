import React, { useState, useEffect } from "react";
import UserService from "../services/UserService";
import { Link } from "react-router-dom";
import { Dialog } from "@material-ui/core";
import { DialogTitle } from "@material-ui/core";
import { DialogActions } from "@material-ui/core";
// Importing toastify module
import { toast } from "react-toastify";

// Import toastify css file
import "react-toastify/dist/ReactToastify.css";

// toast-configuration method
toast.configure();

const User = (props) => {
  const initialUserState = {
    user_name: "",
    address: "",
    mobile_no: 0,
    email: "",
    user_class: 0,
  };
  const [currentUser, setCurrentUser] = useState(initialUserState);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  const getUser = (id) => {
    UserService.get(id)
      .then((res) => {
        setCurrentUser(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getUser(props.match.params.id);
  }, [props.match.params.id]);

  // Dialog box
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleToClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  const updateUser = () => {
    UserService.update(currentUser.id, currentUser)
      .then((res) => {
        console.log(res.data);
        setMessage("The User was updated successfully!");
        console.log(message);
        toast.success(<div>{message}</div>, { position: "bottom-center" });
      })
      .catch((err) => console.log(err));
  };

  const deleteUser = () => {
    UserService.remove(currentUser.id)
      .then((res) => {
        console.log(res.data);
        props.history.push("/users");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {currentUser ? (
        <div className="edit-form">
          <h4>User</h4>
          <form>
            <div className="form-group">
              <label htmlFor="user_name">Name</label>
              <input
                type="text"
                className="form-control"
                id="user_name"
                required
                value={currentUser.user_name}
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
                value={currentUser.address}
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
                value={currentUser.mobile_no}
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
                value={currentUser.email}
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
                value={currentUser.user_class}
                onChange={handleInputChange}
                name="user_class"
              />
            </div>
          </form>

          <button className="m-3 btn btn-danger" onClick={handleClickOpen}>
            Delete
          </button>
          <Dialog open={open} onClose={handleToClose}>
            <DialogTitle>{"Are you sure to delete this user?"}</DialogTitle>
            <DialogActions>
              <button onClick={deleteUser} className="btn btn-danger" autoFocus>
                Yes
              </button>
              <button onClick={handleToClose} className="btn btn-primary">
                No
              </button>
            </DialogActions>
          </Dialog>

          <button
            type="submit"
            className="btn btn-success m-3"
            onClick={updateUser}
          >
            Update
          </button>

          <Link
            to={"/users/"}
            className="btn btn-warning m-3"
            style={{ textDecoration: "none" }}
          >
            Home
          </Link>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a User...</p>
        </div>
      )}
    </div>
  );
};

export default User;
