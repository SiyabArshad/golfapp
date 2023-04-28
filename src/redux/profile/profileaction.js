import profileconstants from "./profileconstants";
import {doc,setDoc,getFirestore, addDoc,getDoc, collection,query,getDocs,serverTimestamp,updateDoc} from "firebase/firestore"
import app from '../../configs/firebase';
const db=getFirestore(app)
export const getProfileinfo=(payload)=>{
    return async(dispatch)=>{
            const docRef=doc(db,"users",payload)
            const Profiledata=await getDoc(docRef)
            try{
                if(Profiledata.exists())
                {
                    dispatch({
                        type:profileconstants.getprofile,
                        payload:Profiledata.data()
                    })
                }
                else
                {
                    dispatch({
                        type:profileconstants.getprofile,
                        payload:null
                    })
                }
            }
            catch(e){
                console.log(e)
                dispatch({
                    type:profileconstants.getprofile,
                    payload:null
                })
            }
    }
}
