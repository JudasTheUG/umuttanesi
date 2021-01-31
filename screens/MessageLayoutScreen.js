import * as React from 'react';
import { Text, View, StyleSheet, Dimensions, Platform, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
const { width } = Dimensions.get('window');
import { ConstantClass } from '../ConstantFile';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const axios = require('axios');

const MessageLayoutScreen  = ({route,navigation}) => {  

  textInput = React.createRef();
    
  let [chatData, setChatData] = React.useState({
    messageId: '',
    senderId: '',
    reciverId: '',
    messageTime: '',
    currentMessage: '',
    otherPerson: '',
  });

  let [sendData, setSendData] = React.useState({
    sender: '',
    reciver: '',
    message: '',
  });

  const fetchData = () => {
    axios.get('http://192.168.1.38/api/ChatMessages/Chatters/'+ConstantClass.myId+'?secondId='+route.params.userId)
    .then((response)=>{
        setChatData(response.data)
    })
    .catch((error) => {
        console.log(error)
    })
  };

  const textInputChange = (val) => {

    if(val.length > 0){
        setSendData({
            ...sendData,
            sender: ConstantClass.myId,
            reciver: route.params.userId,
            message: val,
        });
    }
  }

  const sendMessage = () =>{
if (sendData.message.length>0)
{    axios.post('http://192.168.1.38/api/ChatMessages/PostChatMessage',
                {  
                    sender:sendData.sender,
                    reciver:sendData.reciver,
                    message:sendData.message,          
                })
                .then((response)=>{
                  setSendData({
                    message:'',
                  });
                })
                .catch((error) => {
                    console.log(error)
                })

                textInput.current.clear();}
  }
    

  return (
    <View style={styles.container}>
    <View style={styles.messageContainer}>
      {fetchData()}
      <Text style={styles.border}>{"\n"} {route.params.userName} {route.params.userSurname} {"\n"}</Text>
      <FlatList
        data={chatData}
        renderItem={({item,index}) => 
          <View>
            {item.otherPerson==route.params.userId ?
            <Text style={item.senderId==ConstantClass.myId ? styles.me : styles.others}>{"\n"}{item.currentMessage}{"\n"}</Text>
            :
            null}
          </View>}
        keyExtractor={(item,index)=> index.toString()}
      />
    </View>
    <View style={styles.sideBy}>

<TextInput
   placeholder="Bir Mesaj Yazın"
   style={styles.textInput}
   autoCapitalize="none"
   ref={textInput}
   onChangeText={(val) => textInputChange(val)}
  />
  <TouchableOpacity
  onPress={()=>sendMessage()}
  >
    <LinearGradient
    colors={['#08d4c4','#01ab9d']}
    style={styles.signIn}
    >
    <Text style={[styles.textSign, {color:'#fff'}]}>Gönder</Text>                          
    </LinearGradient>
  </TouchableOpacity>

</View>
    </View>
  );

}


const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    flex:1
  },
  messageContainer: {
    width: wp('100%'),
    height: hp('86%'),
  },
  sideBy: {
    flex:1,
    flexDirection: 'row',
    alignSelf: 'baseline',
    justifyContent: 'space-between',
    width: '100%', 
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  others: {
    color:'black',
    paddingLeft: '1.5%',
    paddingRight: '1.5%',
    borderColor: 'salmon',
    borderWidth: 1,
    backgroundColor:'salmon',
    width: 'auto',
    alignSelf:'flex-start',
    borderRadius: 15,
    marginBottom:hp('0.1%'),
  },
  me: {
    color:'black',
    paddingLeft: '1.5%',
    paddingRight: '1.5%',
    borderColor: 'lime',
    borderWidth: 1,
    backgroundColor:'lime',
    width: 'auto',
    alignSelf:'flex-end',
    borderRadius: 15,
    marginBottom:hp('0.1%'),
  },
  textInput: {
    paddingLeft: 10,
    marginBottom: 1,
    color: '#05375a',
    borderColor: 'black',
    borderWidth: 1,
    width: 305,
    height: 40,
},
signIn: {
  width: 105,
  height: 40,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 50,
},
border: {
  alignSelf:'center',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign:'center',
  fontWeight:'bold',
  color:'black',
  borderColor: 'orange',
  borderWidth: 1,
  backgroundColor:'orange',
  marginBottom:hp('0.2%'),
  width:wp('100%'),
  height:wp('12%'),
},
});

export default MessageLayoutScreen;
