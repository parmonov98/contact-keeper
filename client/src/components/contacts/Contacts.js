import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ContactContext from '../../context/contact/ContactContext';
import ContactItem from './ContactItem';

const Contacts = () => {
  const contactContext = useContext(ContactContext);
  let { contacts, filtered, getContacts } = contactContext;
  useEffect(() => {

    getContacts();

    // eslint-disable-next-line
  }, [])

  if (contacts.length === 0) {
    return <h3>Add some contacts</h3>;
  }

  return (
    <Fragment>

      {filtered !== null ? (
        <TransitionGroup>
          {
            (filtered.map(contact => (
              <CSSTransition key={contact._id} timeout={500} classNames="item">
                <ContactItem contact={contact} />
              </CSSTransition>
            )))
          }
        </TransitionGroup>
      ) :
        (
          <TransitionGroup>
            {
              (contacts.map(contact => (
                <CSSTransition key={contact._id} timeout={500} classNames="item">
                  <ContactItem contact={contact} />
                </CSSTransition>
              )))

            }
          </TransitionGroup>
        )
      }
    </Fragment>
  )
}

export default Contacts
