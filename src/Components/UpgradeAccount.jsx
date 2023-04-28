import { View, Text,Modal,TouchableOpacity,Pressable,Image,StyleSheet } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';
import colors from '../configs/colors';
import fonts from '../configs/fonts';
import { useIsFocused } from '@react-navigation/native';
export default function UpgradeAccount({navigation}) {
  const focus=useIsFocused()
  const[premium,setpremium]=React.useState(true)
  React.useEffect(()=>{
    if(focus)
    {
      setpremium(true)
    }
  },[focus])
  return (
    <Modal transparent visible={premium}>
    <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:"rgba(0,0,0,0.9)"}}>
        <View style={{
            minHeight:150,
    width:"80%",backgroundColor:colors.white,borderRadius:10
    ,shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity:  0.21,
    shadowRadius: 8.19,
    elevation: 11,
    display:"flex",
    flexDirection:"column",
    justifyContent:"space-between",
    alignItems:"center"
    ,paddingVertical:20
    }}>
 <View style={{ width: 100, height: 100 }}>
     
      <LottieView
        source={require('../../assets/animations/premium.json')}
        autoPlay
        loop
      />
    </View>
     <Text style={{fontSize:18,fontFamily:fonts.Nregular,color:colors.black,marginVertical:10,textAlign:"center"}}>Upgrade Account to Acess more Features</Text>
     <View style={{display:"flex",flexDirection:"row",alignItems:"center"}}>

<Pressable onPress={()=>setpremium(false)} style={{backgroundColor:colors.black,paddingHorizontal:30,paddingVertical:7,display:"flex",justifyContent:"center",alignItems:"center",borderRadius:10,marginRight:5}}>
    <Text style={{fontFamily:fonts.Nregular,color:colors.white,fontSize:16}}>Later</Text>
</Pressable>

<Pressable onPress={()=>{
  setpremium(false)
  navigation.navigate("premium")
}} style={{backgroundColor:colors.black,paddingHorizontal:15,paddingVertical:7,display:"flex",justifyContent:"center",alignItems:"center",borderRadius:10}}>
    <Text style={{fontFamily:fonts.Nregular,color:colors.white,fontSize:16}}>Upgrade</Text>
</Pressable>
     </View>
        </View>
    </View>
    </Modal>
 )
}