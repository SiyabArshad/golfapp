import { View, Text,Modal,TouchableOpacity,Pressable,Image,StyleSheet,ImageBackground,Dimensions,Platform,Linking,ActivityIndicator } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';
import fonts from "../configs/fonts"
import colors from '../configs/colors'
import { RFPercentage as rp, RFValue as rf } from "react-native-responsive-fontsize";
import IonicIcon from 'react-native-vector-icons/Ionicons';
import { useSelector,useDispatch } from 'react-redux';

export default function Onboard({navigation}) {
  return (
    <View style={styles.mnonb}>
      <Image resizeMode='contain' style={{height:rp(30) ,width:"90%"}} source={require("../../assets/images/splashicon.png")}/>
        <Text style={styles.headtext}>JUSTGOLF!</Text>
        <Text style={styles.desc}>
        Improve your golf skills with us by enrolling in our courses and chat with other golfers.
        </Text>
        <Pressable onPress={()=>navigation.navigate("login")} style={[styles.centertext,styles.btn]}>
        <IonicIcon name="arrow-forward" size={30} color={colors.green} />
        </Pressable>
    </View>
  )
}

const styles=StyleSheet.create({
mnonb:{
    flex:1,
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:colors.green
},
centertext:{
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
},
headtext:{
    fontSize:rp(6),
    fontFamily:fonts.Nextrabold
    ,color:colors.white
},
desc:{
    width:"60%",
    marginTop:rp(1),
    textAlign:"center",
    color:colors.white,
    fontFamily:fonts.Nlight,
    fontSize:rp(2.3)
},
btn:{
    backgroundColor:colors.white,
    marginTop:rp(3),
    height:60,
    width:60,
    borderRadius:30
}
})