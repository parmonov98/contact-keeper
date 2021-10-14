import { GET_CONTACTS, ADD_CONTACT, DELETE_CONTACT, SET_CURRENT_CONTACT, CLEAR_CURRENT_CONTACT, UPDATE_CONTACT, FILTER_CONTACTS, CLEAR_FILTER, GET_CONTACTS_FAIL } from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload
      }
    case GET_CONTACTS_FAIL:
      return {
        ...state,
        contacts: []
      }
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, action.payload]
      }
    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map(contact => contact._id === action.payload._id ? action.payload : contact)
      }
    case DELETE_CONTACT:

      console.log(action.payload);
      const filteredContacts = state.contacts.filter((item) => item._id !== parseInt(action.payload.id));
      return {
        ...state,
        contacts: filteredContacts
      }
    case SET_CURRENT_CONTACT:
      const contact = state.contacts.find((item) => item._id === action.payload);
      return {
        ...state,
        current: contact
      }
    case CLEAR_CURRENT_CONTACT:
      return {
        ...state,
        current: null
      }

    case FILTER_CONTACTS:
      const filtered = state.contacts.filter((item) => {
        const regex = new RegExp(`${action.payload}`, 'gi');
        return item.name.match(regex) || item.email.match(regex);
      });
      return {
        ...state,
        filtered: filtered
      }

    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      }

    default:
      return state;
  }
}
