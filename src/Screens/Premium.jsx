import { View, Text,Modal,TouchableOpacity,Pressable,Image,StyleSheet,ImageBackground,Dimensions,Platform,Linking,ActivityIndicator,TextInput,ScrollView,FlatList, Alert } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';
import fonts from "../configs/fonts"
import colors from '../configs/colors'
import { RFPercentage as rp, RFValue as rf } from "react-native-responsive-fontsize";
import IonicIcon from 'react-native-vector-icons/Ionicons';
import MessageCard from '../Components/MessageCard';

export default function Premium({navigation}) {
    const [isload,setisload]=React.useState(false)
  return (
    <View style={styles.mnonb}>
     <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginTop:rp(5)}}>
        <Pressable onPress={()=>navigation.pop()} style={styles.btn}>
        <IonicIcon name="arrow-back" size={24} color={colors.white} />
        </Pressable>
        <Text style={{fontSize:rp(2.8),fontFamily:fonts.Nbold}}>Premium</Text>
        <Text></Text>
    </View>
    <ScrollView showsVerticalScrollIndicator={false}>    
    <View style={{height:200,width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
        <View style={{display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:colors.black,paddingHorizontal:rp(2),paddingVertical:rp(1),width:150,height:120,borderRadius:rp(1)}}>
            <Text style={{color:colors.white,fontSize:rp(2.5),fontFamily:fonts.Nextrabold}}>$45</Text>
            <Text style={{color:colors.white,fontSize:rp(2.5),fontFamily:fonts.Nbold}}>Annual</Text>
            <Text style={{color:colors.white,fontSize:rp(2.5),fontFamily:fonts.Nbold}}>Subscription</Text>
        </View>
    </View>
    <View style={{marginVertical:rp(3)}}>
        <Text style={{fontSize:rp(3),color:colors.black,fontFamily:fonts.Nextrabold}}>Perks</Text>
        <Text style={{marginTop:rp(2),fontFamily:fonts.Nregular,textAlign:"justify",fontSize:rp(2.1)}}>
            {
               "As a premium user of JustGolf, you will have access to additional features and benefits that normal users do not have."
            }
            {
                "\n"
            }
                        {
                "\n"
            }
            {
            "One of the key benefits of being a premium user is the ability to interact with other premium users within the app. This means that you can connect with a community of passionate golfers who share your interests and goals, and have exclusive access to forums and groups that are not available to normal users. These exclusive groups are designed to provide a more personalized and tailored experience to premium users, allowing them to discuss advanced golf techniques and get advice from other experienced players."
            }
            {
                "\n"
            }
                        {
                "\n"
            }
            {
              "Other benefits of being a premium user include access to exclusive discounts and offers on golf Courses, as well as priority support from the JustGolf team. This means that if you ever have any issues or questions, you can be sure that you will receive prompt and personalized support from the app's dedicated team."
              }
            {
                "\n"
            }
                        {
                "\n"
            }
            {
                "Overall, JustGolf is an interactive and engaging app that provides a unique experience for golf enthusiasts. Whether you are a beginner or an experienced player, the app is designed to help you improve your skills and connect with other golfers, making it the perfect platform for anyone looking to take their golf game to the next level."
            }

        </Text>
    </View>
    <Pressable onPress={()=>Alert.alert("App is Free in next few updates Subscription Feature will be Added.")} style={[{backgroundColor:colors.black,marginBottom:rp(8),paddingHorizontal:rp(2),paddingVertical:rp(2),borderRadius:rp(3)},styles.centertext]}>
        {
            isload?
            <ActivityIndicator size={30} color={colors.white}/>
            :
            <Text style={{color:colors.white,fontFamily:fonts.Nbold,fontSize:rp(2),textTransform:"uppercase"}}>Subscribe</Text>
        
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