import React, { useContext, useEffect, Fragment } from 'react';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/AuthContext";

const Navbar = ({ title, icon }) => {

  const authContext = useContext(AuthContext);

  const { isAuthenticated, logout, user } = useContext(AuthContext);

  const onLogout = () => {
    logout();
  }

  const authLinks = (
    <Fragment>
      <li className="">
        Hello, {user && user.name}
      </li>
      <li>
        <a onClick={onLogout} href="#logout">
          <i className="fas fa-exit"></i>
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </Fragment>
  );
  const guestLinks = (
    <Fragment>
      <li>
        <Link to="/login">Sign in</Link>
      </li>
      <li>
        <Link to="/register">Sign up</Link>
      </li>
    </Fragment>
  );
  return (
    <div className="navbar bg-primary">
      <h1>
        <i className="icon" /> {title}
      </h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li className="mr-4">
          <Link to="/about">About</Link>
        </li>
        {isAuthenticated ? authLinks : guestLinks}
      </ul >
    </div >
  )
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
}
Navbar.defaultProps = {
  title: "Contact Keeper by Murod",
  icon: "fas fa-id-card-alt",
}

export default Navbar
