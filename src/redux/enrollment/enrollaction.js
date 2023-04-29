import { enrollconstant } from "./enrollconstant";
import {doc,setDoc,getFirestore, addDoc,getDoc, collection,query,getDocs,serverTimestamp,updateDoc,where, deleteDoc} from "firebase/firestore"
import app from '../../configs/firebase';
const db=getFirestore(app)
export const enrollAction=(payload)=>{
    return async(dispatch)=>{
        try{
            const userRef=doc(db,"users",payload.userid)
            const courseRef=doc(db,"golfcourses",payload.userid)
            const newdoc=await addDoc(collection(db,"enrolled"),{course:payload.courseid,user:payload?.userid,courseref:courseRef,userref:userRef})     
            dispatch(getallenrolledAction({courseid:payload?.courseid,userid:payload?.userid}))
        }
        catch(e){
            console.log(e)
            dispatch(getallenrolledAction({courseid:payload?.courseid,userid:payload?.userid}))
        }
    }
}

export const unenrollAction=(payload)=>{
    return async(dispatch)=>{
        try{
                const q = query(collection(db,"enrolled"),where("course","==",payload?.courseid),where("user","==",payload?.userid))
                const querySnapshot = await getDocs(q);
                for (const doc of querySnapshot.docs)
                {
                    await deleteDoc(doc.ref)
                }     
            dispatch(getallenrolledAction({courseid:payload?.courseid,userid:payload?.userid}))
        }
        catch(e){
            console.log(e)
            dispatch(getallenrolledAction({courseid:payload?.courseid,userid:payload?.userid}))
        }
    }
}
export const getallenrolledAction=(payload)=>{
    return async(dispatch)=>{
        try{
            let userenrollflag=false
            const q=query(collection(db,"enrolled"),where("course","==",payload?.courseid))
            const querySnapshot = await getDocs(q);
            const availableenrolleduser = [];
            for (const doc of querySnapshot.docs) {
                const documentdata = doc.data();
                if(documentdata?.user===payload?.userid)
                {
                    
                    userenrollflag=true
                }
                const userdetail=await getDoc(documentdata?.userref)
                availableenrolleduser.push(userdetail?.data());
                // any other code that needs to be executed for each document
              }
            if(availableenrolleduser)
            {
                dispatch({
                    type:enrollconstant.totalenrollment,
                    payload:{
                        data:availableenrolleduser,
                        exist:userenrollflag
                    }
                })
            }
            else
            {
                dispatch({
                    type:enrollconstant.totalenrollment,
                    payload:{
                        data:[]
                    }
                })
            }
        }
        catch(e){
            dispatch({
                type:enrollconstant.totalenrollment,
                payload:{
                    data:[]
                }
            })
        }
    }
}