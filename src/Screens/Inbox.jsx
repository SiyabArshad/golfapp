import { View, Text,Modal,TouchableOpacity,Pressable,Image,StyleSheet,ImageBackground,Dimensions,Platform,Linking,ActivityIndicator,TextInput,ScrollView,FlatList } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';
import fonts from "../configs/fonts"
import colors from '../configs/colors'
import { RFPercentage as rp, RFValue as rf } from "react-native-responsive-fontsize";
import IonicIcon from 'react-native-vector-icons/Ionicons';
import SearchBox from '../Components/SearchBox';
import UpgradeAccount from '../Components/UpgradeAccount';
import { useIsFocused } from '@react-navigation/native';
import { useSelector,useDispatch } from 'react-redux';
import Loading from "../Components/Loading"
import { getallcontactaction } from '../redux/contacts/contactAction';
export default function Inbox({navigation}) {
    const focus=useIsFocused()
    const [isload,setisload]=React.useState(false)
    const [search,setsearch]=React.useState("")
    const callsearch=(state)=>{
        setsearch(state)
    }
    const [loading,setloading]=React.useState(false)
    const dispatch=useDispatch()
    const userinfo=useSelector(state=>state.authReducer)
    const contactsdata=useSelector(state=>state?.contactReducers)
    React.useEffect(()=>{
        if(focus)
        {
            setloading(true)
            dispatch(getallcontactaction({userid:userinfo?.currentUser?.userid})).finally(()=>setloading(false))
        }
    },[focus])
  return (
    <View style={styles.mnonb}>
         <Loading visible={contactsdata?.loading||loading}/>
           <UpgradeAccount navigation={navigation}/>
    <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginTop:rp(5)}}>
       <Text style={{fontSize:rp(5),fontFamily:fonts.Nextrabold}}>Inbox</Text>
    </View>
    {/* <SearchBox callinp={callsearch}/> */}
    <ScrollView showsVerticalScrollIndicator={false}>
    {
            contactsdata?.contacts?.length<=0?<View style={{height:Dimensions.get("screen").height/1.2,justifyContent:"center",alignItems:"center"}}>
                <Text>No Freind</Text>
            </View>:
           contactsdata&&contactsdata?.contacts.map((item,i)=>(
                <TouchableOpacity onPress={()=>navigation.navigate("chat",{userdata:item})} key={i} style={{display:"flex",flexDirection:"row",justifyContent:"space-between",backgroundColor:colors.black,paddingHorizontal:5,paddingVertical:10,borderRadius:10,marginBottom:rp(1)}}>
            <View style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
            <Image style={{height:50,width:50,borderRadius:25}} source={item?.profilepic===""?require("../../assets/images/user2.jpg"):{uri:item?.profilepic}}/>
            <View style={{marginLeft:rp(2)}}>
                <Text style={{color:colors.textgrey2,fontSize:rp(2.3),fontFamily:fonts.Nbold}}>{item?.name}</Text>
                <Text style={{fontFamily:fonts.Nmedium,color:colors.white}}>{item?.desc}</Text>
            </View>
            </View>
            <Text style={{color:colors.green,marginRight:rp(1),fontFamily:fonts.Nbold}}>Freind</Text>
        </TouchableOpacity>
            ))
        }
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