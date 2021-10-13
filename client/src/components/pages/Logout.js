import React, { useContext, useEffect } from 'react';
import AuthContext from "../../context/auth/AuthContext";

const Logout = (props) => {

  const authContext = useContext(AuthContext);
  const { isAuthenticated, logout } = authContext;
  useEffect(() => {

    if (isAuthenticated) {
      logout();
      props.history.push('/login');
    }

  }, [isAuthenticated, props.history])

  return (
    <div>
      log out page
    </div>
  )
}

export default Logout
