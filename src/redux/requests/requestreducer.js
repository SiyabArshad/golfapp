import { requestconstants } from "./constants";
const initialState={
    requests:[],
    loading:true
}

export const requestReducers=(state=initialState,action)=>{
    switch(action?.type)
    {
        case requestconstants.getallrequests:
            return {...state,loading:false,requests:action?.payload}
        default:
            return {...state,loading:false};
    }
}