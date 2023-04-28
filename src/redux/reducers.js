import { combineReducers } from "redux";
import { authReducer } from "./auth/authreducer";
import { profilereducer } from "./profile/profilereducer";
import { coursereducer } from "./courses/coursereducers";
export default combineReducers({
    authReducer,
    profilereducer
    ,coursereducer
})