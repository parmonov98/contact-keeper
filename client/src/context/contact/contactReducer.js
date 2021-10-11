import { ADD_CONTACT, DELETE_CONTACT, SET_CURRENT_CONTACT, CLEAR_CURRENT_CONTACT, UPDATE_CONTACT, FILTER_CONTACTS, CLEAR_FILTER } from "../types";

export default (state, action) => {
  switch (action.type) {
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, action.payload]
      }
      break;
    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map(contact => contact.id === action.payload.id ? action.payload : contact)
      }
      break;
    case DELETE_CONTACT:
      const filteredContacts = state.contacts.filter((item) => item.id !== parseInt(action.payload));
      return {
        ...state,
        contacts: filteredContacts
      }
      break;
    case SET_CURRENT_CONTACT:
      return {
        ...state,
        current: action.payload
      }
      break;
    case CLEAR_CURRENT_CONTACT:
      return {
        ...state,
        current: null
      }
      break;

    case FILTER_CONTACTS:
      const filtered = state.contacts.filter((item) => {
        const regex = new RegExp(`${action.payload}`, 'gi');
        return item.name.match(regex) || item.email.match(regex);
      });
      return {
        ...state,
        filtered: filtered
      }
      break;

    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      }
      break;

    default:
      break;
  }
}
