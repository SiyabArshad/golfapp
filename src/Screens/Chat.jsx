import { View, Text,Modal,TouchableOpacity,Pressable,Image,StyleSheet,ImageBackground,Dimensions,Platform,Linking,ActivityIndicator,TextInput,ScrollView,FlatList } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';
import fonts from "../configs/fonts"
import colors from '../configs/colors'
import { RFPercentage as rp, RFValue as rf } from "react-native-responsive-fontsize";
import IonicIcon from 'react-native-vector-icons/Ionicons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MessageCard from '../Components/MessageCard';
import SearchBox from '../Components/SearchBox';
import golfCourses from '../configs/golfcourses';
import Coursecard from '../Components/Coursecard';
import { BottomSheet, Button, ListItem } from "react-native-elements"
import { GiftedChat,Bubble,BubbleProps,InputToolbar,Send,Composer } from 'react-native-gifted-chat';
import UpgradeAccount from '../Components/UpgradeAccount';
import { useSelector } from 'react-redux';
import {doc,setDoc,getFirestore, addDoc,getDoc, collection,query,orderBy,where,onSnapshot,updateDoc,serverTimestamp} from "firebase/firestore"
import app from '../configs/firebase';
export default function Chat({navigation,route}) {
  const db=getFirestore(app)
  const freinddatainfo=route?.params?.userdata
  const userinfo=useSelector(state=>state?.authReducer)
  const {userid,name,profilepic,email}=userinfo?.currentUser  
  const [indicator,showindicator]=React.useState(false)
  const [messages, setMessages] = React.useState([]);

const renderAvatar = (props) => {
  return (
    <View>
      <Image
        source={freinddatainfo?.profilepic===''?require("../../assets/images/user2.jpg"):{uri:freinddatainfo?.profilepic}}
        style={{ width: 40, height: 40, borderRadius: 20 }}
      />
    </View>
  );
};
  React.useEffect(() => {
    const docid  =freinddatainfo?.userid > userid ? userid+ "-" + freinddatainfo?.userid : freinddatainfo?.userid+"-"+userid
    const messageref=collection(db,"chatrooms",docid,"messages")
    const messagesQuery = query(messageref, orderBy('createdAt',"desc"));  
    const unsubscribe=onSnapshot(messagesQuery, (snapshot) => {
    const allmsg=snapshot.docs.map((doc) =>{
      const data=doc.data()
      if(data.createdAt){
          return {
             ...doc.data(),
             createdAt:doc.data().createdAt.toDate()
         }
      }else {
         return {
             ...doc.data(),
             createdAt:new Date()
         }
      }
  }
)
setMessages(allmsg)
})
return ()=>{
  unsubscribe()
}


}, [])
const onSend =(messageArray) => {
const msg = messageArray[0]
const mymsg = {
    ...msg,
    sentBy:userid,
    sentTo:freinddatainfo?.userid,
    createdAt:new Date()
}
setMessages(previousMessages => GiftedChat.append(previousMessages,mymsg))
const docid  = freinddatainfo?.userid > userid ? userid+ "-" + freinddatainfo?.userid :freinddatainfo?.userid+"-"+userid 
const messageref=collection(db,"chatrooms",docid,"messages") 
addDoc(messageref,{...mymsg,createdAt:serverTimestamp()}).then(()=>{
}).catch(()=>{

})
}
  return (
    <View style={styles.mnonb}>
      <UpgradeAccount navigation={navigation}/>
<View style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginTop:rp(5),marginHorizontal:rp(3)}}>
<View style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
  <Image resizeMode='cover' style={{height:50,width:50,borderRadius:10}} source={freinddatainfo?.profilepic===""?require("../../assets/images/user2.jpg"):{uri:freinddatainfo?.profilepic}}/>
   <View style={{marginLeft:rp(2)}}>
   <Text style={{fontFamily:fonts.Nbold,color:colors.black,fontSize:rp(2.4)}}>{freinddatainfo?.name}</Text>
   <View style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
   <Text style={{fontFamily:fonts.Nregular}}>Active</Text>
   <EntypoIcon name="dot-single" size={24} color={colors.green} />
   </View>
   </View>
</View>
<Pressable onPress={()=>navigation.pop()}>
<IonicIcon name="exit-outline" size={30} color={colors.black} />
</Pressable>
</View>
<GiftedChat
      messages={messages}
      onSend={text => onSend(text)}
      user={{
          _id:userid,
      }}
      renderInputToolbar={renderInputToolbar}
      renderSend={renderSend}
      messagesContainerStyle={{backgroundColor:colors.white,paddingBottom:rp(5)}}
      renderBubble={renderBubble}
      renderAvatar={renderAvatar}
    
    />
    </View>
  )
}
const renderInputToolbar = (props) => (
  <InputToolbar {...props} containerStyle={{ borderTopWidth: 0,paddingHorizontal:rp(1),marginBottom:rp(1) }}
  textInputStyle={{
    color:colors.black,
    fontFamily:fonts.Nregular
  }}
  >
    <Composer {...props} />
    <Send {...props} />
  </InputToolbar>
);

const renderSend = (props) => (
  <Send {...props}>
    <View style={{ marginRight: 10,paddingHorizontal:rp(1),paddingVertical:rp(1),borderRadius:rp(1), marginBottom: 5,backgroundColor:colors.green }}>
      <Text style={{ color:colors.white, fontFamily:fonts.Nregular }}>SEND</Text>
    </View>
  </Send>
);

function renderBubble (props) {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: colors.green,
        },
        left:{
          backgroundColor:colors.textgrey2,
         
        }
      }}
      textStyle={{
        left: {
          color: colors.white,
          fontFamily:fonts.Nregular
        },
        right: {
          color: colors.white,
          fontFamily:fonts.Nregular
        },
      }}
    />
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
  containerStyle:{
      
  },
  title:{
      color:colors.black,
      fontSize:rp(2.4)
      ,fontFamily:fonts.Nregular
  },
  sendButton:{
    backgroundColor:"red"
  }

})

