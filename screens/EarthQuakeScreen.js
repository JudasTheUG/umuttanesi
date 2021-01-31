import React from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const axios = require('axios');

const EarthQuakeScreen = () => {

  let [responseData, setResponseData] = React.useState({
    tarih: '',
    saat: '',
    enlem: '',
    boylam: '',
    derinlik: '',
    buyukluk: '',
    yer: '',
    sehir: '',
  });

  const fetchData = () => {
    axios.get('https://umuttanesidepremapi.herokuapp.com/api')
    .then((response)=>{
        setResponseData(response.data)
    })
    .catch((error) => {
        console.log(error)
    })
  };

  return (
    <View style={styles.container}>
      {fetchData()}
      <FlatList
        data={responseData}
  renderItem={({item,index}) => <Text style={styles.border}>{"\n"}Deprem Yeri:{item.yer} {"\n"}Derinliği:{item.derinlik} km  {"\n"}Büyüklüğü:{item.buyukluk} {"\n"}Zamanı:{item.saat}/{item.tarih}{"\n"}</Text>}
        keyExtractor={(item,index)=> index.toString()}
      />
    </View>
  );
}
export default EarthQuakeScreen;

const styles = StyleSheet.create({
  container: {
   flex: 1,
   backgroundColor:'floralwhite',
  },
  border: {
    alignSelf:'center',
    fontWeight:'bold',
    color:'black',
    paddingLeft: wp('5%'),
    borderColor: 'darkblue',
    borderWidth: 1,
    backgroundColor:'yellow',
    marginTop:hp('0.1%'),
    marginBottom:hp('0.4%'),
    width:wp('98%'),
    borderRadius: 35,
  },
});
