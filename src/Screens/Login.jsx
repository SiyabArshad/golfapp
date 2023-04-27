import { View, Text,Modal,TouchableOpacity,Pressable,Image,StyleSheet,ImageBackground,Dimensions,Platform,Linking,ActivityIndicator,TextInput,ScrollView,FlatList } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';
import fonts from "../configs/fonts"
import colors from '../configs/colors'
import { RFPercentage as rp, RFValue as rf } from "react-native-responsive-fontsize";
import IonicIcon from 'react-native-vector-icons/Ionicons';
import MessageCard from '../Components/MessageCard';
import { useSelector,useDispatch } from 'react-redux';
import { loginaction } from '../redux/auth/authaction';
//firebase stuff
import {createUserWithEmailAndPassword,getAuth,deleteUser,updateProfile,sendEmailVerification,signInWithEmailAndPassword} from "firebase/auth"
import {doc,setDoc,getFirestore, addDoc,getDoc, serverTimestamp} from "firebase/firestore"
import app from '../configs/firebase.js';
//end
export default function Login({navigation}) {
    const db=getFirestore(app)
    const auth=getAuth(app)
    const[email,setemail]=React.useState("")
    const[password,setpassword]=React.useState("")
    const [isload,setisload]=React.useState(false)
    const [issubmit,setissubmit]=React.useState(false)
    const [Error,setError]=React.useState('')
    const [type,settype]=React.useState(false)
    const dispatch=useDispatch()
    const handleform=async()=>{
        setisload(true)
        try{
            if(email.length===0&&password.length===0)
            {
            setError("Some Feilds are Missing")
            settype(false)
            }
            const userinfo=await signInWithEmailAndPassword(auth,email,password)
            const myDocRef = doc(db, "users", userinfo.user.uid);
            const response = await getDoc(myDocRef);
            if(response.exists())
            {
            dispatch(loginaction(response.data()))
            setError("Logged in Sucessfully")
            settype(true)   
            }
            else
            {
            setError("Login Failed")
            settype(false)   
            }
        }
        catch(e){
            console.log(e)
            setError("Try again later")
            settype(false)
           
        }
        finally{
            setisload(false)
            setissubmit(true)
       
        }
    }
    const callbacksubmit=()=>{
        setissubmit(false)
    }
  return (
    <ScrollView style={styles.mnonb} showsVerticalScrollIndicator={false}>
     <MessageCard type={type} message={Error} show={issubmit} callshow={callbacksubmit}/>
     <View style={{display:"flex",flexDirection:"row",marginTop:rp(5),marginHorizontal:rp(2)}}>
        
     <Pressable onPress={()=>navigation.pop()} style={styles.btn}>
     <IonicIcon name="arrow-back" size={24} color={colors.white} />
     </Pressable>
     </View>
     <View style={{marginVertical:rp(5),marginHorizontal:rp(2)}}>
     <Text style={styles.text1}>
       Welcome Back!
     </Text>
     <Text style={styles.text2}>Enter Your Email and Password</Text>
     </View>
     <View style={{marginTop:rp(8),marginHorizontal:rp(2)}}>
     <View style={{marginBottom:rp(7)}}>
        <Text style={styles.lable}>Email</Text>
        <TextInput 
        value={email} onChangeText={(e)=>setemail(e)}
        style={{marginTop:rp(1),borderBottomWidth:1,borderBottomColor:colors.black,paddingHorizontal:rp(1.2),paddingVertical:rp(.6),color:colors.black,fontFamily:fonts.Rregular}}/>
     </View>
     <View style={{marginBottom:rp(7)}}>
        <Text style={styles.lable}>Password</Text>
        <TextInput secureTextEntry value={password} onChangeText={(e)=>setpassword(e)} style={{marginTop:rp(1),borderBottomWidth:1,borderBottomColor:colors.black,paddingHorizontal:rp(1.2),paddingVertical:rp(.6),color:colors.black,fontFamily:fonts.Rregular}}/>
     </View>
     </View>
     <View style={[{marginBottom:rp(5),zIndex:999},styles.centertext]}>
                <Pressable 
                disabled={issubmit} 
                onPress={
                    handleform
                    //()=>navigation.navigate("home")
                } style={{backgroundColor:colors.black,paddingHorizontal:rp(8),paddingVertical:rp(1),borderRadius:rp(3)}}>
                   {
                        isload?
                        <ActivityIndicator size={30} color={colors.white}/>
                        :
                        <Text style={{color:colors.white,fontFamily:fonts.Nbold,fontSize:rp(3),textTransform:"uppercase"}}>Login</Text>
                    }
                </Pressable>
                <Pressable onPress={()=>navigation.navigate("forgot")} style={{marginTop:rp(3)}}>
                    <Text style={{fontFamily:fonts.Nregular,fontSize:rp(2.5),color:colors.textgrey}}>
                    Forgotten Password?
                    </Text>
                </Pressable>
                <Pressable onPress={()=>navigation.navigate("signup")} style={{marginTop:rp(.3)}}>
                    <Text style={{fontFamily:fonts.Nregular,fontSize:rp(2.5),color:colors.textgrey}}>
                    or Create a New Account?
                    </Text>
                </Pressable>
     </View>
     <Image 
     style={{
        position:"absolute",
       top:rp(34),
       left:-20,
       zIndex:-9
     }}
     resizeMode='contain'
     source={require("../../assets/images/Uniondesign.png")}/>     
    </ScrollView>
  )
}

const styles=StyleSheet.create({
    mnonb:{
        flex:1,
        backgroundColor:colors.white
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
    text1:{
        color:colors.black,
        fontFamily:fonts.Nextrabold,
        fontSize:rp(5)
    },
    text2:{
        color:colors.textgrey,
        fontFamily:fonts.Nmedium,
        fontSize:rp(2.5)
    },
    lable:{
        fontFamily:fonts.Nregular,
        fontSize:rp(3.5),
        color:colors.textgrey
    }
})