import React, { useReducer } from "react";
import uuid from "uuid";
import ContactContext from "./ContactContext";
import contactReducer from "./contactReducer";
import { ADD_CONTACT, DELETE_CONTACT, SET_CURRENT_CONTACT, CLEAR_CURRENT_CONTACT, UPDATE_CONTACT, FILTER_CONTACTS, CLEAR_FILTER } from "../types";

const ContactState = (props) => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: "Murod Parmonov",
        email: "parmonov98@yandex.ru",
        phone: "+998972449350",
        type: "personal"
      },
      {
        id: 2,
        name: "Murod Parmonov2",
        email: "parmonov98@yandex.ru",
        phone: "+9989724493502",
        type: "personal"
      },
      {
        id: 3,
        name: "Murod Parmonov3",
        email: "parmonov98@yandex.ru",
        phone: "+9989724493503",
        type: "professional"
      },

    ],
    current: null,
    filtered: null
  };

  const [state, dispatch] = useReducer(contactReducer, initialState)

  // add contact
  const addContact = (contact) => {
    contact.id = uuid.v4();
    dispatch({
      type: ADD_CONTACT,
      payload: contact
    });
  }
  // delete contact
  const deleteContact = (contact_id) => {
    dispatch({
      type: DELETE_CONTACT,
      payload: contact_id
    });
  }
  // set current contact
  const setCurrentContact = (id) => {
    const contact = initialState.contacts.find((item) => item.id == parseInt(id));
    dispatch({
      type: SET_CURRENT_CONTACT,
      payload: contact
    })
  }
  // clear current contact
  const clearCurrentContact = () => {
    dispatch({
      type: CLEAR_CURRENT_CONTACT
    });
  }
  // update contact
  const updateContact = (contact) => {
    dispatch({
      type: UPDATE_CONTACT,
      payload: contact
    })
  }
  // filter contacts
  const filterContacts = (text) => {
    dispatch({
      type: FILTER_CONTACTS,
      payload: text
    })
  }
  // clear filter
  const clearFilter = (text) => {
    dispatch({
      type: CLEAR_FILTER
    })
  }

  return (
    <ContactContext.Provider value={
      {
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        addContact,
        deleteContact,
        setCurrentContact,
        clearCurrentContact,
        updateContact,
        filterContacts,
        clearFilter
      }
    }>
      {props.children}
    </ContactContext.Provider>
  );
};


export default ContactState;