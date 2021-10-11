import React from 'react';
import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';
import ContactFilter from '../contacts/ContactFilter';

const Home = () => {
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
