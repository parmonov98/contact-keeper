import React, { useContext, useEffect } from 'react';
import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';
import ContactFilter from '../contacts/ContactFilter';
import AuthContext from '../../context/auth/AuthContext';

const Home = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;
  useEffect(() => {
    authContext.loadUser();
  }, []);

  if (isAuthenticated !== true) {
    return (<h4>Welcome to contact keeper SPA app by Murod</h4>);
  }

  return (
    <div className="grid-2">
      {/* Home page */}
      <div>
        <ContactForm />

      </div>
      <div className="card">
        <ContactFilter />
        <Contacts />
      </div>
    </div>
  )
}

export default Home;
