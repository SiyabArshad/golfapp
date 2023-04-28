import { View, Text,Modal,TouchableOpacity,Pressable,Image,StyleSheet,ImageBackground,Dimensions,Platform,Linking,ActivityIndicator,TextInput,ScrollView,FlatList } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';
import fonts from "../configs/fonts"
import colors from '../configs/colors'
import { RFPercentage as rp, RFValue as rf } from "react-native-responsive-fontsize";
import IonicIcon from 'react-native-vector-icons/Ionicons';
export default function Coursecard({detail,navigation}) {
  const [enroll,setenroll]=React.useState(false)
    return (
    <TouchableOpacity onPress={()=>navigation.navigate("course",{coursedata:detail})} style={{width:"46%",marginRight:rp(1),overflow:"hidden",marginBottom:rp(1)}}>
      <Image resizeMode='cover' style={{width:"100%",height:180,borderRadius:rp(1)}} source={{uri:detail?.picture}}/>
      <Text style={{marginTop:rp(1),color:colors.black,fontFamily:fonts.Nbold,fontSize:rp(2.2)}}>{detail?.club}</Text>
      {/* <IonicIcon style={{position:"absolute",right:5,top:5}} name="checkmark-done-circle" size={24} color={colors.green} /> */}
    </TouchableOpacity>
  )
}