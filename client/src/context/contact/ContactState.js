import React, { useReducer } from "react";
import uuid from "uuid";
import axios from "axios";
import ContactContext from "./ContactContext";
import contactReducer from "./contactReducer";
import { GET_CONTACTS_FAIL, ADD_CONTACT, DELETE_CONTACT, DELETE_CONTACT_FAIL, SET_CURRENT_CONTACT, CLEAR_CURRENT_CONTACT, UPDATE_CONTACT, FILTER_CONTACTS, CLEAR_FILTER, GET_CONTACTS } from "../types";

const ContactState = (props) => {
  const initialState = {
    contacts: [],
    current: null,
    filtered: null
  };

  const [state, dispatch] = useReducer(contactReducer, initialState)

  // get contacts 
  const getContacts = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.get('/api/contacts', config);

      console.log(res.data);
      // return true;
      dispatch({
        type: GET_CONTACTS,
        payload: res.data
      });

      // loadUser();
    } catch (error) {
      dispatch({
        type: GET_CONTACTS_FAIL
      });
    }
  }

  // add contact
  const addContact = async (contact) => {
    // contact.id = uuid.v4();
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post(`/api/contacts/`, contact, config);

      console.log(res.data);
      // return true;
      dispatch({
        type: ADD_CONTACT,
        payload: res.data
      });

      // loadUser();
    } catch (error) {
      dispatch({
        type: DELETE_CONTACT_FAIL
      });
    }

  }
  // delete contact
  const deleteContact = async (contact_id) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.delete(`/api/contacts/${contact_id}`, config);

      console.log(res.data);
      // return true;
      dispatch({
        type: DELETE_CONTACT,
        payload: {
          id: contact_id,
          response: res.data
        }
      });

      // loadUser();
    } catch (error) {
      dispatch({
        type: DELETE_CONTACT_FAIL
      });
    }

  }
  // set current contact
  const setCurrentContact = (id) => {
    dispatch({
      type: SET_CURRENT_CONTACT,
      payload: id
    })
  }
  // clear current contact
  const clearCurrentContact = () => {
    dispatch({
      type: CLEAR_CURRENT_CONTACT
    });
  }
  // update contact
  const updateContact = async (contact) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(`/api/contacts/${contact._id}`, contact, config);

      console.log(res.data);
      // return true;
      dispatch({
        type: UPDATE_CONTACT,
        payload: res.data
      });

      // loadUser();
    } catch (error) {
      dispatch({
        type: DELETE_CONTACT_FAIL
      });
    }
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
        clearFilter,
        getContacts
      }
    }>
      {props.children}
    </ContactContext.Provider>
  );
};


export default ContactState;