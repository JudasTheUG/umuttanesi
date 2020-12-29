import React, {useState} from 'react';
import { FlatList, StyleSheet,View, Text, TouchableOpacity } from 'react-native';
import { ConstantClass } from '../ConstantFile';

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
    axios.get('http://192.168.1.33/api/Users/ChattingPeople/'+ConstantClass.myId)
    .then((response)=>{
        setUserData(response.data)
    })
    .catch((error) => {
        console.log(error)
    })
  };




    return (
      <View style={styles.container}>
      {fetchData()}
      <FlatList
        data={userData}
        renderItem={({item,index}) => 
        <TouchableOpacity
        onPress={() => navigation.navigate('MessageLayoutScreen',item)}
        >
          <Text style={styles.border}>{"\n"}{item.userName} {item.userSurname}{"\n"} </Text>
        </TouchableOpacity>}
        keyExtractor={(item,index)=> index.toString()}
      />
    </View>
      );
}
export default MessageHomeScreen;

const styles = StyleSheet.create({
    container: {
     flex: 1,
    },
    item: {
      padding: 5,
      fontSize: 16,
      alignSelf: 'center',
    },
    border: {
        paddingLeft: 10,
        borderColor: 'black',
        borderWidth: 1,
        textAlign: 'center',
        backgroundColor:'salmon',
        padding: 10,
        height: 80,
      },
  });
  