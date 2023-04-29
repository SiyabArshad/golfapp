import profileconstants from "./profileconstants"
const initialState={
    profile:null,
    isloading:true
}

export const profilereducer=(state=initialState,action)=>{
    switch(action.type)
    {
        case profileconstants.getprofile:
            {
                return {
                    ...state,
                    profile:action.payload,
                    isloading:false
                };
            }
        default:
            return {...state,isloading:false};
    }
}