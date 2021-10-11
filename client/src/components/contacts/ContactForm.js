import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/ContactContext';

const ContactForm = () => {
  const contactContext = useContext(ContactContext);
  const { addContact, current, updateContact, clearCurrentContact } = contactContext;

  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal',
  });
  useEffect(() => {

    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal',
      });
    }
  }, [contactContext, current])

  const { name, email, phone, type } = contact;

  const onChange = (e) => {
    setContact({
      ...contact, [e.target.name]: e.target.value
    });
  }



  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addContact(contact);
    } else {
      updateContact(contact);
    }
    clearAll();
  }

  const clearAll = () => {
    clearCurrentContact()
  }
  return (
    <form onSubmit={onSubmit}>
      <h3 className="text-primary">{current ? 'Edit Contact' : 'Add Contact'}</h3>
      <input type="text" name="name" placeholder="Name" value={name} onChange={onChange} />
      <input type="text" name="email" placeholder="Email" value={email} onChange={onChange} />
      <input type="text" name="phone" placeholder="Phone" value={phone} onChange={onChange} />
      <h6>Contact Type</h6>
      <div className="row ">
        <div className="col-6">
          <input className="form-check-input" style={{ marginRight: "1em" }} type="radio" id="personal" name="type" onChange={onChange} value="personal" checked={type === 'personal'} />
          <label htmlFor="personal">Personal</label>
        </div>

        <div className="col-6">
          <input className="form-check-input " style={{ marginRight: "1em" }} type="radio" id="professional" name="type" onChange={onChange} value="professional" checked={type === 'professional'} />
          <label htmlFor="professional">Professional</label>
        </div>
      </div>

      <div>
        <input type="submit" value={current ? 'Update Contact' : 'Add Contact'} className="btn btn-primary btn-block" />
      </div>
      {current && <div>
        <button className="btn btn-light btn-block" onClick={clearAll}>
          Clear
        </button>
      </div>}
    </form>
  )
}

export default ContactForm
