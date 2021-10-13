import React, { Fragment } from "react";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Logout from "./components/pages/Logout";
import PrivateRoute from "./components/routing/PrivateRoute";

import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

import Alerts from "./components/layout/Alerts";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';

import ContactState from "./context/contact/ContactState";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";

import setWebAuthToken from "./utils/setWebAuthToken";

if (localStorage.token) {
  setWebAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar />
              <div className="container">
                <Alerts />
                <Switch>
                  <PrivateRoute exact path='/' component={Home} />
                  <Route exact path='/about' component={About} />
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/login' component={Login} />
                  <Route exact path='/logout' component={Logout} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  );
}

export default App;
