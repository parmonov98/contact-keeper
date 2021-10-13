import { SET_ALERT, REMOVE_ALERT } from "../types";

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default (state, action) => {
  switch (action.type) {
    case SET_ALERT:
      return [...state, action.payload]

    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== action.payload)
    default:
      return state;
  }
};