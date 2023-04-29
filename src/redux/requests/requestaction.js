import { requestconstants } from "./constants";
import {doc,setDoc,getFirestore, addDoc,getDoc, collection,query,getDocs,serverTimestamp,updateDoc, where, deleteDoc} from "firebase/firestore"
import app from '../../configs/firebase';
const db=getFirestore(app)
export const getallrequestaction=(payload)=>{
    return async(dispatch)=>{
        const docRef=doc(db,"users",payload?.userid)
            const q=query(collection(db,"requests"),where("to","==",docRef),where("status","==",false))
            const reqs=await getDocs(q)
            let requsers=[]
            for(const docu of reqs.docs)
            {
                const d=docu.data()
                const userdata=await getDoc(d?.from)
                const userObj=userdata.data()
                Object.assign(userObj,{parentid:docu.id})
                if(userdata.exists)
                {
                    requsers.push(userObj)
                }
               
            }
            dispatch({
                type:requestconstants.getallrequests,
                payload:requsers
            })
    }
}

export const acceptrequestaction=(payload)=>{
    return async(dispatch)=>{
        const documentRef = doc(db,"requests", payload?.documentId);
        const freindRef=doc(db,"users",payload?.freindid)
        const ownRef=doc(db,"users",payload?.userid)
        try {
          await updateDoc(documentRef, {status:true});
          await addDoc(collection(db,"contacts"),{
            user:ownRef,
            freind:freindRef            
          })
          await addDoc(collection(db,"contacts"),{
            user:freindRef,
            freind:ownRef            
          })
            dispatch(getallrequestaction({userid:payload?.userid}))
        } catch (e) {
          console.error("Error updating document: ", e);
            
        }
        
    }
}

export const rejectrequestaction=(payload)=>{
    return async(dispatch)=>{
        const documentRef = doc(db,"requests", payload?.documentId);
        try {
          await deleteDoc(documentRef);
            dispatch(getallrequestaction({userid:payload?.userid}))
        } catch (e) {
          console.error("Error updating document: ", e);
            
        }
        
    }
}
