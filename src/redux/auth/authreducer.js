import { authContants } from "./constant";

const initialState = {
  currentUser: null,
  isLoggedIn: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authContants.currentuser:
      return {
        ...state,
        currentUser: action.payload,
        isLoggedIn: action.payload===null?false:true,
      };
    case authContants.login:
      return {
        ...state,
        currentUser: action.payload,
        isLoggedIn: true,
      };
    case authContants.logout:
      return {
        ...state,
        currentUser: null,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};