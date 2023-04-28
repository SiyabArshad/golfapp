import { enrollconstant } from "./enrollconstant"
const initialState={
    loading:true,
    users:[],
    numberofuser:0,
    exist:false
}

export const enrolledreducer=(state=initialState,action)=>{
    
    switch(action.type)
    {
        case enrollconstant.totalenrollment:
            return {
                ...state,loading:false,exist:action?.payload?.exist,numberofuser:action?.payload?.data?.length,users:action?.payload?.data
            };
        default:
            return state;
    }
}

