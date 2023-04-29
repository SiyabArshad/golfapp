import { contactconstants } from "./constant";
const initialState={
    contacts:[],
    loading:true
}

export const contactReducers=(state=initialState,action)=>{
    switch(action?.type)
    {
        case contactconstants.getallcontact:
            return {...state,loading:false,contacts:action?.payload}
        default:
            return {...state,loading:false};
    }
}