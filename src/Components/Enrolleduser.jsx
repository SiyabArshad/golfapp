import { View, Text,Modal,TouchableOpacity,Pressable,Image,StyleSheet,ImageBackground,Dimensions,Platform,Linking,ActivityIndicator,TextInput,ScrollView,FlatList } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';
import fonts from "../configs/fonts"
import colors from '../configs/colors'
import { RFPercentage as rp, RFValue as rf } from "react-native-responsive-fontsize";
import IonicIcon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import {doc,setDoc,getFirestore, addDoc,getDoc, collection,query,getDocs,serverTimestamp,updateDoc,where, deleteDoc} from "firebase/firestore"
import app from '../configs/firebase';
const db=getFirestore(app)
export default function Enrolleduser({data}) {
  const {name,profilepic,userid}=data
  const userinfo=useSelector(state=>state.authReducer)
 const [issent,setissent]=React.useState(false)
 const sendfreindrequest=async()=>{
  setissent(true)
  try{
        const fromRef=doc(db,"users",userinfo?.currentUser?.userid)
        const toRef=doc(db,"users",userid)
        const q2=query(collection(db,"requests"),where("from","==",toRef),where("to","==",fromRef))
        const q=query(collection(db,"requests"),where("from","==",fromRef),where("to","==",toRef))
        const existdoc=await getDocs(q)
        const existdoc2=await getDocs(q2)
        if(existdoc?.docs?.length>0)
        {
          alert(`You Already Sended a Freind Request to ${name}`)
        }
        else if(existdoc2?.docs?.length>0)
        {
          alert(`${name} Already Sended a Freind Request to You`)
        }
        else
        {
          await addDoc(collection(db,"requests"),{from:fromRef,to:toRef,status:false})  
          alert(`Freind Request Sended to ${name}`)
        }
        
      }
  catch{
      alert("Request Failed")
  }
  finally{
    setissent(false)
  }
 }
 
 return (
    <View style={{marginHorizontal:rp(2)}}>
      <ImageBackground borderRadius={20} style={{height:80,width:70,display:"flex",overflow:"hidden"}} source={profilepic===''?require("../../assets/images/user2.jpg"):{uri:profilepic}}>
        <TouchableOpacity onPress={sendfreindrequest} disabled={issent} style={{backgroundColor:colors.green,width:30,height:30,borderRadius:15,display:userid===userinfo?.currentUser?.userid?"none":"flex",justifyContent:"center",alignItems:"center"}}>
           {
            issent?
           <ActivityIndicator size={20} color={colors.white}/>
           :<IonicIcon name='add' size={24} color={colors.white}/>
           
           }
           </TouchableOpacity>
      </ImageBackground>
      <Text style={{marginTop:5,fontSize:rp(2),fontFamily:fonts.Nregular,textAlign:"center"}}>{name&&name}</Text>
    </View>
  )
}