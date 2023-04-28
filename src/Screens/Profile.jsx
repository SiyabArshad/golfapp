import { View, Text,Modal,TouchableOpacity,Pressable,Image,StyleSheet,ImageBackground,Dimensions,Platform,Linking,ActivityIndicator,TextInput,ScrollView,FlatList } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';
import fonts from "../configs/fonts"
import colors from '../configs/colors'
import { RFPercentage as rp, RFValue as rf } from "react-native-responsive-fontsize";
import IonicIcon from 'react-native-vector-icons/Ionicons';
import EIcon from 'react-native-vector-icons/Entypo';
import FIcon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import * as Re from "react-native-elements"
import MessageCard from '../Components/MessageCard';
import { useSelector,useDispatch } from 'react-redux';
import { loginaction,logoutaction } from '../redux/auth/authaction';
//firebase stuff
import {createUserWithEmailAndPassword,getAuth,deleteUser,updateProfile,sendEmailVerification,signInWithEmailAndPassword,signOut} from "firebase/auth"
import {doc,setDoc,getFirestore, addDoc,getDoc, serverTimestamp} from "firebase/firestore"
import app from '../configs/firebase.js';
import Loading from '../Components/Loading';
//end
import { getProfileinfo } from '../redux/profile/profileaction';
import { useIsFocused } from '@react-navigation/native';

export default function Profile({navigation}) {
  const focus=useIsFocused()
  const db=getFirestore(app)
  const auth=getAuth(app)
  const [loading,setloading]=React.useState(false)
  const dispatch=useDispatch()
  const userinfo=useSelector(state=>state?.authReducer)
  const profileinfo=useSelector(state=>state?.profilereducer)
  const logoutfromdevice=async()=>{
    setloading(true)
    try{
      await signOut(auth)
      dispatch(logoutaction())
    }
    catch(e){
      console.log(e)
    }
    finally{
      setloading(false)
    }
  }
  const getprofilefordevice=async()=>{
    setloading(true)
    try{
      dispatch(getProfileinfo(userinfo?.currentUser?.userid))
    }
    catch(e){
      console.log(e)
    }
    finally{
      setloading(false)
    }
  }
  const shareoption=async()=>{
    try {
      await Linking.openURL("https://www.privacypolicies.com/live/a9d10653-06f3-412b-8271-6b2f3f91a201");
    } catch (error) {
      console.log('Error opening browser:', error);
    }
  }
  React.useEffect(()=>{
    if(focus)
    {
      getprofilefordevice()
    }
  },[focus])
  if(loading||profileinfo?.isloading)
  {
    return <Loading visible={true}/>
  }
  return (
    <View style={styles.mnonb}>
      <View style={[styles.centertext,{marginTop:rp(4)}]}>
        <Image style={{height:80,width:80,borderRadius:40}} resizeMode='cover' source={profileinfo?.profile?.profilepic===''?require("../../assets/images/user2.jpg"):{uri:profileinfo?.profile?.profilepic}}/>
          <Text style={{color:colors.black,fontFamily:fonts.Nextrabold,fontSize:rp(3),marginTop:rp(1)}}>{profileinfo?.profile?.name}</Text>
          <Text style={{color:colors.black,fontFamily:fonts.Nregular}}>{profileinfo?.profile?.email}</Text>
      </View>
      <View style={{marginTop:rp(2)}}>
            <Pressable onPress={()=>navigation.navigate("edit")} style={{backgroundColor:colors.black,paddingHorizontal:rp(2),paddingVertical:rp(1.3),borderRadius:rp(1),marginBottom:rp(1),display:"flex",flexDirection:"row",alignItems:"center"}}>
            <FIcon name="edit" size={20} color={colors.white} />
              <Text style={{color:colors.white,fontSize:rp(2.3),fontFamily:fonts.Nmedium,marginLeft:rp(2)}}>Edit Profile</Text>
            </Pressable>
            <Pressable onPress={()=>navigation.navigate("premium")} style={{backgroundColor:colors.black,paddingHorizontal:rp(2),paddingVertical:rp(1.3),borderRadius:rp(1),marginBottom:rp(1),display:"flex",flexDirection:"row",alignItems:"center"}}>
            <IonicIcon name="card" size={20} color={colors.white} />
              <Text style={{color:colors.white,fontSize:rp(2.3),fontFamily:fonts.Nmedium,marginLeft:rp(2)}}>Upgrade Account</Text>
            </Pressable>
            <Pressable onPress={()=>navigation.navigate("about")} style={{backgroundColor:colors.black,paddingHorizontal:rp(2),paddingVertical:rp(1.3),borderRadius:rp(1),marginBottom:rp(1),display:"flex",flexDirection:"row",alignItems:"center"}}>
            <EIcon name="info" size={20} color={colors.white} />
              <Text style={{color:colors.white,fontSize:rp(2.3),fontFamily:fonts.Nmedium,marginLeft:rp(2)}}>About us</Text>
            </Pressable>
            <Pressable onPress={shareoption} style={{backgroundColor:colors.black,paddingHorizontal:rp(2),paddingVertical:rp(1.3),borderRadius:rp(1),marginBottom:rp(1),display:"flex",flexDirection:"row",alignItems:"center"}}>
            <EIcon name="share" size={20} color={colors.white} />
              <Text style={{color:colors.white,fontSize:rp(2.3),fontFamily:fonts.Nmedium,marginLeft:rp(2)}}>Privacy Policy</Text>
            </Pressable>
            <Pressable onPress={logoutfromdevice} style={{backgroundColor:colors.black,paddingHorizontal:rp(2),paddingVertical:rp(1.3),borderRadius:rp(1),marginBottom:rp(1),display:"flex",flexDirection:"row",alignItems:"center"}}>
            <MaterialIcon name="logout" size={20} color={colors.white} />
              <Text style={{color:colors.white,fontSize:rp(2.3),fontFamily:fonts.Nmedium,marginLeft:rp(2)}}>Logout</Text>
            </Pressable>
         </View>
    </View>
  )
}

const styles=StyleSheet.create({
    mnonb:{
        flex:1,
        backgroundColor:colors.white,
        paddingHorizontal:rp(3),
        paddingVertical:rp(5)
    },
    centertext:{
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
    },
    btn:{
        backgroundColor:colors.black,
        paddingHorizontal:5,
        paddingVertical:4,
        borderRadius:5
    },
})