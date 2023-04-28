import { View, Text,Modal,TouchableOpacity,Pressable,Image,StyleSheet,ImageBackground,Dimensions,Platform,Linking,ActivityIndicator,TextInput,ScrollView,FlatList } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';
import fonts from "../configs/fonts"
import colors from '../configs/colors'
import { RFPercentage as rp, RFValue as rf } from "react-native-responsive-fontsize";
import IonicIcon from 'react-native-vector-icons/Ionicons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FIcon from 'react-native-vector-icons/Feather';
import Enrolleduser from '../Components/Enrolleduser';
import MessageCard from '../Components/MessageCard';

const hi=Dimensions.get("window").height
const wi=Dimensions.get("window").width
export default function Course({navigation,route}) {
    const coursedetails=route.params.coursedata
    const [isload,setisload]=React.useState(false)
    const [issubmit,setissubmit]=React.useState(false)
    const [Error,setError]=React.useState('')
    const [type,settype]=React.useState(false)
    const handleform=async()=>{
        setisload(true)
        setissubmit(true)
        try{
            setError("UnEnrolled")
            setisload(false)
            settype(true)
        }
        catch{
            setError("Try again later")
            setisload(false)
            settype(false)
           
        }
    }
    const callbacksubmit=()=>{
        setissubmit(false)
    }
  return (
    <View>
        <MessageCard type={type} message={Error} show={issubmit} callshow={callbacksubmit}/>
     
      <ImageBackground
      resizeMode='cover'
      style={{height:hi/2,width:"100%",display:"flex",flexDirection:"column",justifyContent:"space-between",overflow:"hidden"}} 
      source={{uri:coursedetails?.picture}}
      >
        <View style={{display:"flex",flexDirection:"row",marginTop:rp(4),marginLeft:rp(2)}}>
        <TouchableOpacity onPress={()=>navigation.pop()}>
        <IonicIcon name="arrow-back" size={30} color={colors.black} />
        </TouchableOpacity>
        </View>
        <View style={{marginBottom:rp(4),marginLeft:rp(2)}}>
            <Text style={{color:colors.white,fontSize:rp(3),fontFamily:fonts.Nextrabold}}>{coursedetails?.course}</Text>
        </View>
        </ImageBackground>
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{display:"flex",flexDirection:"row",justifyContent:"space-around",alignItems:"center",marginVertical:rp(2)}}>
            <View style={styles.centertext}>
                <IonicIcon name='location' size={24} color={colors.black}/>
                <Text style={{marginTop:5,color:colors.black,fontSize:rp(2.2)}}>{coursedetails?.location}</Text>
            </View>

            <View style={styles.centertext}>
                <EntypoIcon name='users' size={24} color={colors.black}/>
                <Text style={{marginTop:5,color:colors.black,fontSize:rp(2.2)}}>15 Users</Text>
            </View>
            <View style={styles.centertext}>
                <FIcon name='activity' size={24} color={colors.black}/>
                <Text style={{marginTop:5,color:colors.black,fontSize:rp(2.2)}}>{coursedetails?.difficulty}</Text>
            </View>

        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-around",marginVertical:rp(2)}}>
                {
                    [1,2,3,4,5,6,6,67,4,7].map((item,i)=>(
                        <Enrolleduser/>
                    ))
                }
            </View>
          
        </ScrollView>
        <View style={{height:1,width:"90%",marginHorizontal:"5%",backgroundColor:colors.black}}></View>
        <View style={{marginVertical:rp(2),marginHorizontal:rp(2)}}>
            <Text style={{marginBottom:rp(2),color:colors.black,fontSize:rp(2.6),fontFamily:fonts.Nbold}}>
                    About
            </Text>
            <Text style={{color:colors.black,fontFamily:fonts.Nregular,textAlign:"justify"}}>
                {
                    `${coursedetails?.club} ${coursedetails?.course} ${coursedetails?.desc}`
                }
            </Text>
        </View>

        <Pressable 
                disabled={issubmit} 
                onPress={handleform} style={[{width:"90%",marginHorizontal:"5%",backgroundColor:colors.black,paddingHorizontal:rp(8),paddingVertical:rp(1),borderRadius:rp(3)},styles.centertext]}>
                   {
                        isload?
                        <ActivityIndicator size={30} color={colors.white}/>
                        :
                        <Text style={{color:colors.white,fontFamily:fonts.Nbold,fontSize:rp(3),textTransform:"uppercase"}}>Enrolled</Text>
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