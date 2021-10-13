import React, { useState, useEffect, useContext } from 'react';
import AlertContext from "../../context/alert/AlertContext";
import AuthContext from "../../context/auth/AuthContext";
import "../../styles/components/login.css";

const Login = (props) => {

  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { login, error, clearErrors, isAuthenticated } = authContext;
  const [emailError, setEmailError] = useState({});
  const [passwordError, setPasswordError] = useState({});

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }
    if (error === 'Invalid credentials') {
      setAlert(error, 'danger', 3000);
      setTimeout(() => {
        clearErrors();
      }, 3000);
    }
    if (error && error.hasOwnProperty('msg') && error.msg === 'Invalid credentials!') {
      setAlert(error, 'danger', 3000);
      setTimeout(() => {
        clearErrors();
      }, 3000);

    }

    if (error && error.hasOwnProperty('errors')) {

      console.log(error.errors);
      error.errors.map((item) => {
        if (item.param === 'email') {
          setEmailError(item);
        }
        if (item.param === 'password') {
          setPasswordError(item);
        }
      });
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;

  const onChange = (e) => {
    setUser({
      ...user, [e.target.name]: e.target.value
    });
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert("Please, Enter input values ", 'danger', 3000);
    } else {
      login({
        email, password
      });
    }
    console.log('Login submit');
  }

  return (
    <div className="form-container">
      <h2>Account <span className="text-primary">Login</span></h2>
      <form onSubmit={onSubmit} className="was-validated">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={email} onChange={onChange} />
          <div className="invalid-feedback">
            {emailError.msg}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" value={password} onChange={onChange} />
          <div className="invalid-feedback">
            {passwordError.msg}
          </div>
        </div>
        <input type="submit" value="Login" className="btn btn-primary btn-block" />
      </form>
    </div>
  )
}

export default Login
