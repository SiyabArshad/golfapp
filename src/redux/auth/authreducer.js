import { authContants } from "./constant";

const initialState = {
  currentUser: null,
  isLoggedIn: false,
  online:true
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
    case authContants.online:
        return {
          ...state,
          online:true
        };
    case authContants.offline:
        return {
            ...state,
            online:false
          };
    default:
      return state;
  }
};