import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Picker} from '@react-native-picker/picker';
import CheckBox from '@react-native-community/checkbox';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Moment from 'moment';
import { ConstantClass } from '../ConstantFile';

const axios = require('axios')

const HelpeeScreen = ({navigation}) => {

  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
  const [isDatePickerVisible2, setDatePickerVisibility2] = React.useState(false);

  const [isCeptelStatus, setCeptelStatus] = React.useState(false);
  const [isMoneyStatus, setMoneyStatus] = React.useState(false);
  const [isIbanStatus, setIbanStatus] = React.useState(false);

  const showCeptelStatus = () => {
    setCeptelStatus(!isCeptelStatus);
  };

  const showMoneyStatus = () => {
    setMoneyStatus(!isMoneyStatus);
  };

  const showIbanStatus = () => {
    setIbanStatus(!isIbanStatus);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const showDatePicker2 = () => {
    setDatePickerVisibility2(true);
  };

  const hideDatePicker2 = () => {
    setDatePickerVisibility2(false);
  };

  const BeginConfirm = (date) => {
    setHelpeeData({
      ...helpeeData,
      beginDate: date,
  });
  hideDatePicker();
  };

  const EndConfirm = (date) => {
    setHelpeeData({
      ...helpeeData,
      endDate: date,
  });
    hideDatePicker2();
  };


    const [helpeeData, setHelpeeData] = React.useState({
      reqType: '',
      personCount: 0,
      beginDate:new Date(),
      endDate:'Bitiş Tarihi Seç',
      ceptelStatus: false,
      ibanStatus: false,
      moneyStatus: false,
    });


    const updateCount = (sayi) => {
        setHelpeeData({
            ...helpeeData,
            personCount: Number(sayi),
        })
    }

    const yardimIste = () => {

        if(helpeeData.reqType > 0 && helpeeData.personCount > 0 && helpeeData.endDate != 'Bitiş Tarihi Seç'){
            
                axios.post('http://192.168.1.33/api/Requests/PostRequest',
                {  
                    reqTypeId: helpeeData.reqType,
                    helpId: 2,
                    userId: ConstantClass.myId,
                    personCount: helpeeData.personCount,
                    moneyStatus: isMoneyStatus ,
                    ibanStatus: isIbanStatus,
                    mobileStatus: isCeptelStatus,
                    latitude: null,
                    longitude: null,
                    beginDate: helpeeData.beginDate,
                    endDate: helpeeData.endDate
                    
                })
                .then((response)=>{
        
                })
                .catch((error) => {
                    console.log(error)
                })
            
        }else{
            /*TODO Mesaj Alanlar boş bırakılamaz*/
        }    

    }


    return(
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.text_header}>Yardım İste</Text>
            </View>
            <Animatable.View useNativeDriver={false} animation="fadeInUp" style={styles.footer}>
            <Text style={styles.text_footer}>Yardım Türü</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="gift"
                        color="#05375a"
                        size={20}
                    />
                    <Picker
                      selectedValue={helpeeData.reqType}
                      style={{width: 350}}
                      onValueChange={(itemValue, itemIndex) =>
                      setHelpeeData({reqType: itemValue})
                    }>
                    <Picker.Item label="Yardım Türü Seçiniz" value={0} />
                    <Picker.Item label="Barınma" value={1} />
                    <Picker.Item label="Yiyecek-İçecek" value={2} />
                    <Picker.Item label="Giyecek" value={3} />
                    <Picker.Item label="Ulaşım" value={4} />
                    <Picker.Item label="Sağlık" value={5} />
                    </Picker>
                </View>
                <Text style={[styles.text_footer, {marginTop: 10 }]}>Kişi Sayısı</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="users"
                        color="#05375a"
                        size={20}
                    />
                    <TextInput
                        placeholder="Kişi Sayısı"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(sayi)=>updateCount(sayi)}
                    />
                </View>
                <Text style={[styles.text_footer, {marginTop: 10 }]}>Ceptel Göster/Gösterme</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="mobile"
                        color="#05375a"
                        size={35}
                    />
                    <Text style={[styles.textSign, {color:'#009387'},{marginLeft:9},{marginTop:1}]}>Cep telefon numarınız gösterilsin mi?</Text>
                    <CheckBox
                        disabled={false}
                        value={isCeptelStatus}
                        onValueChange={showCeptelStatus}
                    />
                </View>
                <Text style={[styles.text_footer, {marginTop: 10 }]}>Iban Göster/Gösterme</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="bank"
                        color="#05375a"
                        size={20}
                    />
                    <Text style={[styles.textSign, {color:'#009387'},{marginLeft:3},{marginTop:1}]}>Iban numarınız gösterilsin mi?</Text>
                    <CheckBox
                    disabled={false}
                    value={isIbanStatus}
                    onValueChange={showIbanStatus}
                    />
                </View>
                <Text style={[styles.text_footer, {marginTop: 10 }]}>Yardımın parasal karşılığı</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="money"
                        color="#05375a"
                        size={25}
                    />
                    <Text style={[styles.textSign, {color:'#009387'},{marginLeft:3},{marginTop:1}]}>Sadece parasal karşılığı istensin mi?</Text>
                    <CheckBox
                    disabled={false}
                    value={isMoneyStatus}
                    onValueChange={showMoneyStatus}
                    />
                </View>
                <Text style={[styles.text_footer, {marginTop: 10 }]}>Başlangıç Tarihi</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="calendar"
                        color="#05375a"
                        size={20}
                    />
                    <LinearGradient
                    colors={['#08d4c4','#01ab9d']}
                    style={styles.dp}
                    >
                        <TouchableOpacity
                        onPress={()=>showDatePicker()}
                        >
                        {helpeeData.beginDate == 'Başlangıç Tarihi Seç' ?
                        <Text style={[styles.textSign, {color:'#fff'},{paddingLeft:0}]}>{helpeeData.beginDate}</Text>
                        :
                        <Text style={[styles.textSign, {color:'#fff'},{paddingLeft:0}]}>{Moment(helpeeData.beginDate).format('YYYY-MM-DD')}</Text>
                        }
                        </TouchableOpacity>
                        <MaterialIcons 
                        name="keyboard-arrow-up"
                        color="#fff"
                        size={20}
                    />
                    </LinearGradient>
                    <DateTimePickerModal
                      minimumDate={new Date()}
                      isVisible={isDatePickerVisible}
                      mode="date"
                      onConfirm={(date)=>BeginConfirm(date)}
                      onCancel={()=>hideDatePicker()}
                    />
                </View>
                <Text style={[styles.text_footer, {marginTop: 10 }]}>Bitiş Tarihi</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="calendar"
                        color="#05375a"
                        size={20}
                    />
                     <LinearGradient
                    colors={['#08d4c4','#01ab9d']}
                    style={styles.dp}
                    >
                        <TouchableOpacity
                        onPress={()=>showDatePicker2()}
                        >
                        {helpeeData.endDate == 'Bitiş Tarihi Seç' ?
                        <Text style={[styles.textSign, {color:'#fff'},{paddingLeft:0}]}>{helpeeData.endDate}</Text>
                        :
                        <Text style={[styles.textSign, {color:'#fff'},{paddingLeft:0}]}>{Moment(helpeeData.endDate).format('YYYY-MM-DD')}</Text>
                        }
                        </TouchableOpacity>
                        <MaterialIcons 
                        name="keyboard-arrow-up"
                        color="#fff"
                        size={20}
                    />
                    </LinearGradient>
                    <DateTimePickerModal
                      minimumDate={helpeeData.beginDate}
                      isVisible={isDatePickerVisible2}
                      mode="date"
                      onConfirm={(date)=>EndConfirm(date)}
                      onCancel={()=>hideDatePicker2()}
                    />
                </View>
                <View style={styles.button}>
                    <LinearGradient
                    colors={['#08d4c4','#01ab9d']}
                    style={styles.signIn}
                    >
                        <TouchableOpacity
                        onPress={() => yardimIste()}
                        >
                            <Text style={[styles.textSign, {color:'#fff'}]}>Yardım Ekle</Text>
                        </TouchableOpacity>
                        
                    </LinearGradient>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={[styles.signIn, {
                            borderColor: '#009387',
                            borderWidth: 1,
                            marginTop: 10
                        }]}
                    >
                        <Text style={[styles.textSign, {color:'#009387'}]}>SecondIntro</Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    );
};

export default HelpeeScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 10
    },
    footer: {
        flex: 19,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 12
    },
    action: {
        flexDirection: 'row',

        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2'
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'android' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 15
    },
    signIn: {
        width: '100%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    dp: {
        width: 350,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginLeft: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
  });
