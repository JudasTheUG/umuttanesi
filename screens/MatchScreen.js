import React,{useEffect} from 'react';
  import { 
      View, 
      Text, 
      TouchableOpacity, 
      Dimensions,
      StyleSheet,
      StatusBar,
      FlatList,
      ImageBackground,
      Alert,
  } from 'react-native';
  import * as Animatable from 'react-native-animatable';
  import LinearGradient from 'react-native-linear-gradient';
  import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
  import { ConstantClass } from '../ConstantFile';
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
  import Moment from 'moment'; 
  
  const axios = require('axios')

  const MatchScreen = ({navigation}) => {

    const [myData, setMyData] = React.useState({
      requestId:'',
      reqTypeId: '',
      reqType: '',
      helpId:'',
      userId:'',
      personCount: '',
      ceptelStatus: false,
      ibanStatus: false,
      moneyStatus: false,
      beginDate:'',
      endDate:'',
    });

    const [matchData, setMatchData] = React.useState({
      requestId:'',
      reqTypeId: '',
      reqType: '',
      helpId:'',
      userId:'',
      personCount: '',
      ceptelStatus: false,
      ibanStatus: false,
      moneyStatus: false,
      beginDate:'',
      endDate:'',
      userName:'',
      userSurname:'',
    });

    const showMyInfo = (item) =>{
      var temp =item.helpId=='1' ? 'Yardım' : 'İstek';
      var myInfo ='Yardım/İstek :' + temp + '\nTipi:' + item.reqType + '\nKişi Sayısı:' + item.personCount +
                  '\nSahibi:' + ConstantClass.userName + ' ' + ConstantClass.userSurname + '\nBaşlangıç Tarihi : '+  Moment(item.beginDate).format('DD.MM.YYYY') +
                  '\nBitiş Tarihi : ' + Moment(item.endDate).format('DD.MM.YYYY');
                  console.log(item);
      Alert.alert('Detaylı Bilgiler',myInfo,[{text:'Tamam',onPress: ()=>null}])
    }

    const showReqInfo = (item) =>{
      var temp =item.helpId=='1' ? 'Yardım' : 'İstek';
      var info ='Yardım/İstek :' + temp + '\nTipi:' + item.reqType + '\nKişi Sayısı:' + item.personCount +
                '\nSahibi:' + item.userName + ' ' + item.userSurname + '\nBaşlangıç Tarihi : '+  Moment(item.beginDate).format('DD.MM.YYYY') +
                '\nBitiş Tarihi : ' + Moment(item.endDate).format('DD.MM.YYYY');
      Alert.alert('Detaylı Bilgiler',info,[{text:'Tamam',onPress: ()=>null}])
    }

    const binderDelete =(item) =>{
      Alert.alert('Dikkat!!!','İsteğin kaldırılmasını onaylıyor musunuz?',[{text:'İptal',onPress: ()=>null},{text:'Onaylıyorum',onPress: ()=>deleteRequest(item)}])
    }

    const binderMessage =(item) =>{
      Alert.alert('İletişime Geç','İstek/Yardım sahibine mesaj yollansın mı?',[{text:'İptal',onPress: ()=>null},{text:'Merhaba!',onPress: ()=>communicateRequester(item)}])
    }

    const deleteRequest = (item) =>{
      var id = new Number(item.requestId);
      axios.get('http://192.168.1.38/api/Requests/GetDeleteRequest/'+id)
      .then((response)=>{
        fetchRequestData()
        Alert.alert('Başarılı','İstek Kaldırıldı',[{text:'Tamam',onPress: ()=>null}])
      })
      .catch((error) => {
        console.log(error)
        Alert.alert('Hata!!!','İstek Kaldırılamadı',[{text:'Tamam',onPress: ()=>null}])
      })
    }

    const communicateRequester = (item) =>{
      var message = 'Merhaba!';
      axios.post('http://192.168.1.38/api/ChatMessages/PostChatMessage',
                {  
                    sender:ConstantClass.myId,
                    reciver:item.userId,
                    message:message,          
                })
                .then((response)=>{
                  navigation.navigate('MessageLayoutScreen',item)
                })
                .catch((error) => {
                    console.log(error)
                })
    }

    const fetchRequestData = () => {
      axios.get('http://192.168.1.38/api/Requests/MyRequests/'+ConstantClass.myId)
      .then((response)=>{
          setMyData(response.data)
      })
      .catch((error) => {
          console.log(error)
      })
    };


    const fetchMatchData = () => {
      axios.get('http://192.168.1.38/api/Requests/MatchingRequests/'+ConstantClass.myId)
      .then((response)=>{
          setMatchData(response.data)
          
      })
      .catch((error) => {
          console.log(error)
      })
    };



      return (
        <View style={styles.container}>
            <StatusBar backgroundColor='orange' barStyle="light-content"/>
          <View style={styles.header}>
          {useEffect(()=>fetchRequestData(),[])}
          <Text onPress={()=> fetchRequestData()} style={styles.border2}>{"\n"} {'Benim Gönerdiğim/İstediğim Yardımlar'} {"\n"}</Text>
      {myData.userId!='' ?
      <FlatList
        data={myData}
        renderItem={({item,index}) => 
        <TouchableOpacity
        onPress={() => showMyInfo(item)}
        onLongPress={()=>binderDelete(item)}
        >
          <Text style={styles.border}>{"\n"} {item.reqType} {'=>'} {Moment(item.beginDate).format('DD.MM.YYYY')} {'-'} {Moment(item.endDate).format('DD.MM.YYYY')}{"\n"} </Text>
        </TouchableOpacity>}
        keyExtractor={(item,index)=> index.toString()}
      />:
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Ooops!</Text>
      </View>
      }
          </View>
  
          <Animatable.View 
              style={styles.footer}
              animation="fadeInUp"
          >
      {useEffect(()=>fetchMatchData(),[])}
      <Text onPress={()=> fetchMatchData()} style={styles.border2}>{"\n"} {'Gönerdiğim/İstediğim İle Eşleşen Yardımlar'} {"\n"}</Text>
      {matchData.userName!='' ?
      <FlatList
        data={matchData}
        renderItem={({item,index}) => 
        <TouchableOpacity
        onPress={() => showReqInfo(item)}
        onLongPress={()=>binderMessage(item)}
        >
          <Text style={styles.border3}>{"\n"}{item.userName} {item.userSurname} {'=>'} {item.reqType} {"\n"} </Text>
        </TouchableOpacity>}
        keyExtractor={(item,index)=> index.toString()}
      />:
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Ooops!</Text>
      </View>
      }   
          </Animatable.View>
        </View>
      );
  };
  
  export default MatchScreen;
  
  const styles = StyleSheet.create({
      container: {
          width:wp('100%'),
          height:hp('100%'),
          backgroundColor:'darkblue'
      },
      header: {
          height:hp('42%'),
          justifyContent: 'flex-end',
          alignContent:'flex-end',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
          backgroundColor:'orange'
      },
      footer: {
          height:hp('49.1%'),
          width:wp('100%'),
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
          justifyContent: 'flex-start',
          backgroundColor:'floralwhite'
      },
      text_header: {
          color: '#fff',
          fontWeight: 'bold',
          fontSize: 30,
          paddingBottom: hp('4.4%')
      },
      text_footer: {
          color: 'darkblue',
          fontSize: 18
      },
      action: {
          flexDirection: 'row',
          marginTop: hp('1%'),
          borderBottomWidth: 1,
          borderBottomColor: '#f2f2f2',
          paddingBottom: 5
      },
      actionError: {
          flexDirection: 'row',
          marginTop: hp('1%'),
          borderBottomWidth: 1,
          borderBottomColor: '#FF0000',
          paddingBottom: hp('0.5%')
      },
      textInput: {
          flex: 1,
          marginTop: Platform.OS === 'android' ? 0 : -12,
          paddingLeft: wp('2.5%'),
          color: 'black',
      },
      errorMsg: {
          color: '#FF0000',
          fontSize: 14,
      },
      button: {
          alignItems: 'center',
          marginTop: hp('43.5%'),
      },
      button2: {
          alignItems: 'center',
          marginTop: hp('1%'),
          marginBottom: hp('1%')
      },
      signIn: {
          width: wp('90%'),
          height: hp('6%'),
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10
      },
      textSign: {
          fontSize: 18,
          fontWeight: 'bold'
      },
      text2: {
          fontSize: 16,
      },
      logo: {
          width: wp('100%'),
          height: hp('50%'),
          alignSelf:'center',
      },
      logo2: {
          width: wp('100%'),
          height: hp('44.25%'),
          alignSelf:'center',
      },
      icon: {
          marginTop: hp('1.7%')
      },
    helpee: {
      width: wp('85%'),
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      flexDirection: 'row',
      marginBottom: 0,
  },
  helper: {
      width: wp('85%'),
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      flexDirection: 'row',
      marginTop: '0%',
  },
    textSign: {
        color: 'white',
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
    },
    border: {
      alignSelf:'center',
      fontWeight:'bold',
      color:'black',
      textAlign:'center',
      borderColor: 'floralwhite',
      borderWidth: 1,
      backgroundColor:'blue',
      marginTop:hp('0.1%'),
      marginBottom:hp('0.4%'),
      width:wp('98%'),
      height:hp('6.5%'),
      borderRadius:20,
      },
      border3: {
        alignSelf:'center',
        fontWeight:'bold',
        color:'black',
        textAlign:'center',
        borderColor: 'orange',
        borderWidth: 1,
        backgroundColor:'blue',
        marginTop:hp('0.1%'),
        marginBottom:hp('0.4%'),
        width:wp('98%'),
        height:hp('6.5%'),
        borderRadius:20,
        },
      border2: {
        alignSelf:'center',
        fontWeight:'bold',
        color:'darkorange',
        textAlign:'center',
        borderColor: 'darkblue',
        borderWidth: 1,
        backgroundColor:'floralwhite',
        marginTop:hp('0.1%'),
        marginBottom:hp('0.4%'),
        width:wp('98%'),
        borderRadius:20,
        height:hp('6.5%'),
        },
  });