import { courseconstants } from "./coursesconstants";
import {doc,setDoc,getFirestore, addDoc,getDoc, collection,query,getDocs,serverTimestamp,updateDoc} from "firebase/firestore"
import app from '../../configs/firebase';
const db=getFirestore(app)
export const getcourses=()=>{
    return async(dispatch)=>{
        try{
            const q = query(collection(db, "golfcourses"));
            const querySnapshot = await getDocs(q);
            const availablecourses = [];
            querySnapshot.forEach((doc) => {
            const documentdata = doc.data();
            availablecourses.push(documentdata);
            });
        if(availablecourses)
                {
                    dispatch({
                        type:courseconstants.getCourses,
                        payload:availablecourses
                    })
                }
                else
                {
                    dispatch({
                        type:courseconstants.getCourses,
                        payload:[]
                    })
                }
            }
            catch(e){
                console.log(e)
                dispatch({
                    type:courseconstants.getCourses,
                    payload:[]
                })
            }
    }
}


