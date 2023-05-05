import { authContants } from "./constant";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {doc,setDoc,getFirestore, addDoc,getDoc, collection,query,getDocs,serverTimestamp,updateDoc} from "firebase/firestore"
import app from '../../configs/firebase';
const db=getFirestore(app)

export const getCurrentuser=()=>{
    return async(dispatch)=>{
        const jsonValue = await AsyncStorage.getItem('justgolf')
        const currentuser=jsonValue != null ? JSON.parse(jsonValue) : null;//data will come form async storage
            dispatch({
                type:authContants.currentuser,
                payload:currentuser
            })
    }
}
export const setOnlineUser=(payload)=>{
  return async(dispatch)=>{
    const documentRef = doc(db, "users", payload.id);
    await updateDoc(documentRef, {online:true});
    dispatch({
              type:authContants.online,
          })
  }
}
export const setOfflineUser=(payload)=>{
  return async(dispatch)=>{
    const documentRef = doc(db, "users", payload.id);
    await updateDoc(documentRef, {online:false});
    dispatch({
              type:authContants.offline,
          })
  }
}
export const loginaction = (payload) => {
    return async (dispatch) => {
      try {
        //logic comes here
        const jsonValue = JSON.stringify(payload);
        const dataofuser = await AsyncStorage.setItem("justgolf", jsonValue);
        dispatch({
          type: authContants.login,
          payload: payload,
        });
      } catch (error) {
        console.log("Error in loginaction: ", error);
      }
    };
  };
  
export const logoutaction=()=>{
    return async(dispatch)=>{
        //logic comes here
        await AsyncStorage.removeItem("justgolf")
        dispatch({
            type:authContants.logout
        })
    }
}