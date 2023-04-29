import { View, Text,Modal,TouchableOpacity,Pressable,Image,StyleSheet,ImageBackground,Dimensions,Platform,Linking,ActivityIndicator,TextInput,ScrollView,FlatList } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';
import fonts from "../configs/fonts"
import colors from '../configs/colors'
import { RFPercentage as rp, RFValue as rf } from "react-native-responsive-fontsize";
import AntIcon from 'react-native-vector-icons/AntDesign';
import SearchBox from '../Components/SearchBox';
import UpgradeAccount from '../Components/UpgradeAccount';
import { getallrequestaction,acceptrequestaction,rejectrequestaction } from '../redux/requests/requestaction';
import { useSelector,useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import Loading from "../Components/Loading"
export default function Request({navigation}) {
    const [isload,setisload]=React.useState(false)
    const [loading,setloading]=React.useState(false)
    const focus=useIsFocused()
    const dispatch=useDispatch()
    const userinfo=useSelector(state=>state.authReducer)
    const reqdata=useSelector(state=>state?.requestReducers)
    const acceptFreindRequest=async(id)=>{
        setisload(true)
        try{
            dispatch(acceptrequestaction({documentId:id,userid:userinfo?.currentUser?.userid})).finally(()=>setisload(false))
        }
        catch{
            setisload(false)
        }
    }
    const rejectFreindRequest=async(id)=>{
        setisload(true)
        try{
            dispatch(rejectrequestaction({documentId:id,userid:userinfo?.currentUser?.userid})).finally(()=>setisload(false))
        }
        catch{
            setisload(false)
        }
    }
    React.useEffect(()=>{
        if(focus)
        {
            setloading(true)
            dispatch(getallrequestaction({userid:userinfo?.currentUser?.userid})).finally(()=>setloading(false))
        }
    },[focus])
    return (
    <View style={styles.mnonb}>
        <Loading visible={reqdata?.loading||loading}/>
           <UpgradeAccount navigation={navigation}/>
    <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginTop:rp(5)}}>
       <Text style={{fontSize:rp(5),fontFamily:fonts.Nextrabold}}>Requests</Text>
    </View>
    {/* <SearchBox callinp={callsearch}/> */}
    <ScrollView showsVerticalScrollIndicator={false}>
        {
            reqdata?.requests?.map((item,i)=>(
                <View key={i} style={{display:"flex",flexDirection:"row",justifyContent:"space-between",backgroundColor:colors.black,paddingHorizontal:5,paddingVertical:10,borderRadius:10,marginBottom:rp(1)}}>
            <View style={{display:"flex",flexDirection:"row",alignItems:"center",width:"60%"}}>
            <Image style={{height:50,width:50,borderRadius:25}} source={item?.profilepic===''?require("../../assets/images/user2.jpg"):{uri:item?.profilepic}}/>
            <View style={{marginLeft:rp(2)}}>
                <Text style={{color:colors.textgrey2,fontSize:rp(2.3),fontFamily:fonts.Nbold}}>{item?.name}</Text>
                <Text style={{fontFamily:fonts.Nmedium,color:colors.white}}>{item?.desc}</Text>
            </View>
            </View>
            <View style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
                {
                    isload?<ActivityIndicator size={24} color={colors.white}/>:
                    <>
                <TouchableOpacity onPress={()=>acceptFreindRequest(item?.parentid)}>
                <AntIcon name="like1" size={24} color={colors.green} />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>rejectFreindRequest(item?.parentid)} style={{marginLeft:10}}>
                <AntIcon name="dislike1" size={24} color="red" />
                </TouchableOpacity>
                </>
}
            </View>
        </View>
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