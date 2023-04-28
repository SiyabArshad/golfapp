import { combineReducers } from "redux";
import { authReducer } from "./auth/authreducer";
import { profilereducer } from "./profile/profilereducer";
export default combineReducers({
    authReducer,
    profilereducer
})