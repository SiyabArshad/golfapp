import { View, Text,Modal,TouchableOpacity,Pressable,Image,StyleSheet,ImageBackground,Dimensions,Platform,Linking,ActivityIndicator,TextInput,ScrollView,FlatList } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';
import fonts from "../configs/fonts"
import colors from '../configs/colors'
import { RFPercentage as rp, RFValue as rf } from "react-native-responsive-fontsize";
import IonicIcon from 'react-native-vector-icons/Ionicons';
import MessageCard from '../Components/MessageCard';
import {doc,setDoc,getFirestore, addDoc,getDoc, updateDoc,serverTimestamp} from "firebase/firestore"
import app from '../configs/firebase';
import { useSelector,useDispatch } from 'react-redux';
import { getProfileinfo } from '../redux/profile/profileaction';
import Loading from '../Components/Loading';
import { ref,getDownloadURL,getStorage, uploadBytes  } from "firebase/storage"
import * as ImagePicker from 'expo-image-picker';
import { useIsFocused } from '@react-navigation/native';

export default function UpdateProfile({navigation}) {
   const focus=useIsFocused()
    const db=getFirestore(app)
    const storage=getStorage(app)
    const dispatch=useDispatch()
    const profileinfo=useSelector(state=>state?.profilereducer)
    const[emailu,setemail]=React.useState("")
    const[nameu,setname]=React.useState("")
    const[descu,setdesc]=React.useState("")
    const [isload,setisload]=React.useState(false)
    const [loading,setloading]=React.useState(false)
    const [issubmit,setissubmit]=React.useState(false)
    const [Error,setError]=React.useState('')
    const [type,settype]=React.useState(false)
    const [image, setImage] = React.useState(null);
    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
      
        if (!result.canceled) {
          const imageUri = result.uri;
          setImage(imageUri);
        }
      };
    const updateDocument = async (collectionName, documentId, updatedFields) => {
        const documentRef = doc(db, collectionName, documentId);
        try {
          await updateDoc(documentRef, updatedFields);
        } catch (e) {
          console.error("Error updating document: ", e);
        }
      };
    const handleform = async () => {
      setisload(true);
      try {
        const { email, name, desc,userid,profilepic } = profileinfo?.profile || {};
    
        let updateData = {
          email: emailu.length < 10 ? email : emailu,
          name: nameu.length < 3 ? name : nameu,
          desc: descu.length < 3 ? desc : descu,
        };
    
        if (image !== null) {
          const userId = profileinfo?.profile?.userid;
          const storageRef = ref(
            storage,
            `justgolfprofiles/${userId}profile+image1${new Date().toLocaleString()}`
          );
          const img = await fetch(image);
          const bytes = await img.blob();
    
          const snapshot = await uploadBytes(storageRef, bytes);
          const downloadURL = await getDownloadURL(snapshot.ref);
    
          updateData.profilepic = downloadURL ||profilepic;
        }
    
        await updateDocument("users",userid, updateData);
    
        setError("Updated Successfully");
        settype(true);
      } catch (error) {
        console.error(error);
        setError("Updated Failed");
        settype(false);
      } finally {
        setisload(false);
        setissubmit(true);
      }
    };
    
    const callbacksubmit=()=>{
        setissubmit(false)
    }
    const getprofilefordevice=async()=>{
        setloading(true)
        try{
          dispatch(getProfileinfo(profileinfo?.profile?.userid))
        }
        catch(e){
          console.log(e)
        }
        finally{
          setloading(false)
        }
      }
      
      React.useEffect(()=>{
        getprofilefordevice()
      },[focus])
  return (
    <View style={styles.mnonb}>
         <MessageCard type={type} message={Error} show={issubmit} callshow={callbacksubmit}/>
         <Loading visible={loading||profileinfo?.isloading}/>
     <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginTop:rp(5)}}>
        <Pressable onPress={()=>navigation.pop()} style={styles.btn}>
        <IonicIcon name="arrow-back" size={24} color={colors.white} />
        </Pressable>
        <Text style={{fontSize:rp(2.8),fontFamily:fonts.Nbold}}>Edit Profile</Text>
        <Text></Text>
    </View>
    <ScrollView showsVerticalScrollIndicator={false}>    
    <View style={{height:200,width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
        <Pressable onPress={pickImage} style={{display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:colors.black,paddingHorizontal:rp(2),paddingVertical:rp(1),width:150,height:150,borderRadius:75}}>
            <Image resizeMode='cover' style={{width:150,height:150,borderRadius:75}} source={image===null?require("../../assets/images/user2.jpg"):{uri:image}}/>
        </Pressable>
    </View>
    <View style={{marginVertical:rp(3)}}>
        <Text style={{fontSize:rp(3),color:colors.black,fontFamily:fonts.Nextrabold}}>Profile info</Text>
        <View style={{marginTop:rp(8),marginHorizontal:rp(2)}}>
     <View style={{marginBottom:rp(7)}}>
        <Text style={styles.lable}>Email</Text>
        <TextInput 
        value={emailu} onChangeText={(e)=>setemail(e)}
        style={{marginTop:rp(1),borderBottomWidth:1,borderBottomColor:colors.black,paddingHorizontal:rp(1.2),paddingVertical:rp(.6),color:colors.black,fontFamily:fonts.Rregular}}/>
     </View>
     <View style={{marginBottom:rp(7)}}>
        <Text style={styles.lable}>Username</Text>
        <TextInput value={nameu} onChangeText={(e)=>setname(e)} style={{marginTop:rp(1),borderBottomWidth:1,borderBottomColor:colors.black,paddingHorizontal:rp(1.2),paddingVertical:rp(.6),color:colors.black,fontFamily:fonts.Rregular}}/>
     </View>
     <View style={{marginBottom:rp(7)}}>
        <Text style={styles.lable}>Description</Text>
        <TextInput value={descu} onChangeText={(e)=>setdesc(e)} style={{marginTop:rp(1),borderBottomWidth:1,borderBottomColor:colors.black,paddingHorizontal:rp(1.2),paddingVertical:rp(.6),color:colors.black,fontFamily:fonts.Rregular}}/>
     </View>
     </View>
    </View>
    <Pressable disabled={issubmit||emailu.length===0&&nameu.length===0&&descu.length===0&&image===null} onPress={handleform} style={[{backgroundColor:colors.black,marginBottom:rp(8),paddingHorizontal:rp(2),paddingVertical:rp(2),borderRadius:rp(3)},styles.centertext]}>
        {
            isload?
            <ActivityIndicator size={30} color={colors.white}/>
            :
            <Text style={{color:colors.white,fontFamily:fonts.Nbold,fontSize:rp(2),textTransform:"uppercase"}}>Update</Text>
        
        }
    </Pressable>
    </ScrollView>
    </View>
  )
}

const styles=StyleSheet.create({
    mnonb:{
        flex:1,
        backgroundColor:colors.white,
        paddingHorizontal:rp(3)
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