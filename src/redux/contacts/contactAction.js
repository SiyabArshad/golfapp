import {doc,setDoc,getFirestore, addDoc,getDoc, collection,query,getDocs,serverTimestamp,updateDoc, where, deleteDoc} from "firebase/firestore"
import app from '../../configs/firebase';
import { contactconstants } from "./constant";
const db=getFirestore(app)
export const getallcontactaction=(payload)=>{
    return async(dispatch)=>{
        const docRef=doc(db,"users",payload?.userid)
            const q=query(collection(db,"contacts"),where("user","==",docRef))
            const reqs=await getDocs(q)
            let requsers=[]
            for(const docu of reqs.docs)
            {
                const d=docu.data()
                const userdata=await getDoc(d?.freind)
                const userObj=userdata.data()
                if(userdata.exists)
                {
                    requsers.push(userObj)
                }
               
            }
            dispatch({
                type:contactconstants.getallcontact,
                payload:requsers
            })
    }
}
