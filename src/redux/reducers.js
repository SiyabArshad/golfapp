import { combineReducers } from "redux";
import { authReducer } from "./auth/authreducer";
import { profilereducer } from "./profile/profilereducer";
import { coursereducer } from "./courses/coursereducers";
import { enrolledreducer } from "./enrollment/enrollreducer";
import { requestReducers } from "./requests/requestreducer";
export default combineReducers({
    authReducer,
    profilereducer
    ,coursereducer,
    enrolledreducer,
    requestReducers
})