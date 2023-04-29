import { courseconstants } from "./coursesconstants"
const initialState={
    loading:true,
    courses:[]
}

export const coursereducer=(state=initialState,action)=>{
    switch(action?.type)
    {   
        case courseconstants.getCourses:
            return{...state,courses:action.payload,loading:false}     
        default:
            return {...state,loading:false}
    }
}