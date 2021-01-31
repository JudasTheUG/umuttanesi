import React, {useState} from 'react';
import { FlatList, StyleSheet,View, Text, TouchableOpacity, Alert } from 'react-native';
import { ConstantClass } from '../ConstantFile';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const axios = require('axios');

const MessageHomeScreen = ({navigation}) => {

  let [userData, setUserData] = useState({
    userId: '',
    userName: '',
    userSurname: '',
    email: '',
    iban: '',
    mobil: '',
    birthdate: '',
    password: '',
  });

  const fetchData = () => {
    axios.get('http://192.168.1.38/api/Users/ChattingPeople/'+ConstantClass.myId)
    .then((response)=>{
        setUserData(response.data)
    })
    .catch((error) => {
        console.log(error)
    })
  };

  const binderDelete =(item) =>{
    Alert.alert('Dikkat!!!','Bağlantının kaldırılmasını onaylıyor musunuz?',[{text:'İptal',onPress: ()=>null},{text:'Onaylıyorum',onPress: ()=>deleteMessage(item)}])
  }

  const deleteMessage = (item) =>{
    var id = new Number(item.userId);
    axios.get('http://192.168.1.38/api/ChatMessages/deleteMessage/'+ConstantClass.myId+'?secondId='+id)
    .then((response)=>{
      
      navigation.navigate('MessageHomeScreen')
      Alert.alert('Başarılı','Bağlantı Kaldırıldı',[{text:'Tamam',onPress: ()=>null}])
    })
    .catch((error) => {
      console.log(error)
      Alert.alert('Hata!!!','Bağlantı Kaldırılamadı',[{text:'Tamam',onPress: ()=>null}])
    })
  }


    return (
      <View style={styles.container}>
      {fetchData()}
      {userData.userName!='' ?
      <FlatList
        data={userData}
        renderItem={({item,index}) => 
        <TouchableOpacity
        onPress={() => navigation.navigate('MessageLayoutScreen',item)}
        onLongPress={()=>binderDelete(item)}
        >
          <Text style={styles.border}>{"\n"}{item.userName} {item.userSurname}{"\n"} </Text>
        </TouchableOpacity>}
        keyExtractor={(item,index)=> index.toString()}
      />:
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Ooops!</Text>
      </View>
}
    </View>
      );
}
export default MessageHomeScreen;

const styles = StyleSheet.create({
    container: {
     height:hp('100%'),
    },
    border: {
      alignSelf:'center',
      fontWeight:'bold',
      color:'black',
      textAlign:'center',
      borderColor: 'darkblue',
      borderWidth: 1,
      backgroundColor:'orange',
      marginTop:hp('0.1%'),
      marginBottom:hp('0.4%'),
      width:wp('98%'),
      height:hp('6.5%'),
      borderRadius:20,
      },
  });
  