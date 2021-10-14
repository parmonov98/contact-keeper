import React, { useContext } from 'react';
import ContactContext from '../../context/contact/ContactContext';

const ContactItem = ({ contact }) => {
  const contactContext = useContext(ContactContext);
  const { _id: id, name, email, phone, type } = contact;
  const { deleteContact, setCurrentContact, clearCurrentContact } = contactContext;

  const removeContact = (e) => {
    // console.log(e.target.dataset.id);
    deleteContact(e.target.dataset.id);
    clearCurrentContact();
  }
  const onClickEdit = (e) => {
    setCurrentContact(e.target.dataset.id);
  }
  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {name}{' '}
        <span
          style={{ float: 'right' }}
          className={
            'badge ' +
            (type === 'professional' ? 'badge-success' : 'badge-primary')
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className='list'>
        {email && (
          <li>
            <i className='fas fa-envelope-open' /> {email}
          </li>
        )}
        {phone && (
          <li>
            <i className='fas fa-phone' /> {phone}
          </li>
        )}
      </ul>
      <p>
        <button
          className='btn btn-dark btn-sm'
          data-id={id}
          onClick={onClickEdit}
        >
          Edit
        </button>
        <button className='btn btn-danger btn-sm'
          data-id={id}
          onClick={removeContact}>
          Delete
        </button>
      </p>
    </div>
  )
}

export default ContactItem
