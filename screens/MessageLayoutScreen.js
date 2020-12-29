import * as React from 'react';
import { Text, View, StyleSheet, Dimensions, Platform, FlatList, TextInput, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
const { width } = Dimensions.get('window');
import { ConstantClass } from '../ConstantFile';

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
    axios.get('http://192.168.1.33/api/ChatMessages/Chatters/'+ConstantClass.myId+'?secondId='+route.params.userId)
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

    axios.post('http://192.168.1.33/api/ChatMessages/PostChatMessage',
                {  
                    sender:sendData.sender,
                    reciver:sendData.reciver,
                    message:sendData.message,          
                })
                .then((response)=>{
        
                })
                .catch((error) => {
                    console.log(error)
                })

                textInput.current.clear();
  }
    

  return (
    <View style={styles.container}>
    <View style={styles.messageContainer}>
      {fetchData()}
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
    </View>
  );

}


const styles = StyleSheet.create({
  container: {
    flex: 10,
    justifyContent: 'space-between',
  },
  messageContainer: {
    flex: 9,
  },
  sideBy: {
    flex: 1,
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
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor:'salmon',
    width: 'auto',
    alignSelf:'flex-start',
    borderRadius: 15,
  },
  me: {
    color:'black',
    paddingLeft: '1.5%',
    paddingRight: '1.5%',
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor:'lime',
    width: 'auto',
    alignSelf:'flex-end',
    borderRadius: 15,
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
});

export default MessageLayoutScreen;
