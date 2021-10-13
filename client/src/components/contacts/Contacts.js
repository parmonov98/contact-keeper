import React, { Fragment, useContext } from 'react';
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ContactContext from '../../context/contact/ContactContext';
import ContactItem from './ContactItem';

const Contacts = () => {
  const contactContext = useContext(ContactContext);
  let { contacts, filtered } = contactContext;
  // useEffect(() => {

  //   if (filtered != null) {

  //   }

  // }, [filtered, contactContext])

  if (contacts.length === 0) {
    return <h3>Add some contacts</h3>;
  }

  return (
    <Fragment>

      {filtered !== null ? (
        <TransitionGroup>
          {
            (filtered.map(contact => (
              <CSSTransition key={contact.id} timeout={500} classNames="item">
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
                <CSSTransition key={contact.id} timeout={500} classNames="item">
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
