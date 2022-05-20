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

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchName, setSearchName] = useState("");
  const [open, setOpen] = useState(false);

  // will execute side effect only once(at mount time), by passing an empty array
  useEffect(() => {
    retrieveUsers();
  }, []);

  // Dialog box
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleToClose = () => {
    setOpen(false);
  };

  const onChangeSearchName = (e) => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const retrieveUsers = () => {
    UserService.getAll()
      .then((res) => {
        // TODO: Check res is null
        if (res.status === 200 && res.data.length > 0) {
          setUsers(res.data);
        }
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const refreshList = () => {
    retrieveUsers();
    setCurrentUser(null);
    setCurrentIndex(-1);
  };

  const setActiveUser = (user, index) => {
    setCurrentUser(user);
    setCurrentIndex(index);
  };

  const removeAllUsers = () => {
    //TODO: Display confirmation dialog box (Are you sure to delete all users? If yes then only delete)
    UserService.removeAll()
      .then((res) => {
        // TODO: Display toaster msg
        toast.success("All user deleted successfully", {
          position: "bottom-center",
        });
        console.log(res);
        refreshList();
      })
      .catch((err) => console.log(err));
  };

  const findByName = () => {
    UserService.findByName(searchName)
      .then((res) => {
        //TODO: Check response
        setUsers(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control border border-dark"
            placeholder="Search by Name"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Users List</h4>

        <ul className="list-group">
          {!!users &&
            users.length > 0 &&
            users.map((user, index) => (
              <li
                className={
                  "border border-dark list-group-item " +
                  (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveUser(user, index)}
                key={index}
              >
                {user.user_name}
              </li>
            ))}
        </ul>

        <button className="m-3 btn btn-sm btn-danger" onClick={handleClickOpen}>
          Remove All
        </button>
        <Dialog open={open} onClose={handleToClose}>
          <DialogTitle>{"Are you sure to delete all users?"}</DialogTitle>
          <DialogActions>
            <button
              onClick={removeAllUsers}
              className="btn btn-danger"
              autoFocus
            >
              Yes
            </button>
            <button onClick={handleToClose} className="btn btn-primary">
              No
            </button>
          </DialogActions>
        </Dialog>
      </div>
      <div className="col-md-6">
        {currentUser ? (
          <div>
            <h4>User</h4>
            <div>
              <label>
                <strong>Name:</strong>
              </label>{" "}
              {currentUser.user_name}
            </div>
            <div>
              <label>
                <strong>Address:</strong>
              </label>{" "}
              {currentUser.address}
            </div>
            <div>
              <label>
                <strong>Mobile Number:</strong>
              </label>
              {null}
              {currentUser.mobile_no}
            </div>
            <div>
              <label>
                <strong>Email:</strong>
              </label>{" "}
              {currentUser.email}
            </div>
            <div>
              <label>
                <strong>User Class:</strong>
              </label>
              {null}
              {currentUser.user_class}
            </div>
            <Link
              to={"/users/" + currentUser.id}
              className="btn btn-warning m-3"
              style={{ textDecoration: "none" }}
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a User...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersList;
