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

const HelperScreen = ({navigation}) => {

  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
  const [isDatePickerVisible2, setDatePickerVisibility2] = React.useState(false);

  const [isCeptelStatus, setCeptelStatus] = React.useState(false);
  const [isMoneyStatus, setMoneyStatus] = React.useState(false);

  const showCeptelStatus = () => {
    setCeptelStatus(!isCeptelStatus);
  };

  const showMoneyStatus = () => {
    setMoneyStatus(!isMoneyStatus);
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
    setHelperData({
      ...helperData,
      beginDate: date,
  });
  hideDatePicker();
  };

  const EndConfirm = (date) => {
    setHelperData({
      ...helperData,
      endDate: date,
  });
    hideDatePicker2();
  };


    const [helperData, setHelperData] = React.useState({
        helpType: '',
        personCount: 0,
        beginDate:new Date(),
        endDate:'Bitiş Tarihi Seç',
        ceptelStatus: false,
        ibanStatus: false,
        moneyStatus: false,
      });
  
  
      const updateCount = (sayi) => {
          setHelperData({
              ...helperData,
              personCount: Number(sayi),
          })
      }

    const yardimEt = () => {

        if(helperData.helpType > 0 && helperData.personCount > 0 && helperData.endDate != 'Bitiş Tarihi Seç'){
            
                axios.post('http://192.168.1.33/api/Requests/PostRequest',
                {  
                    reqTypeId: helperData.helpType,
                    helpId: 1,
                    userId: ConstantClass.myId,
                    personCount: helperData.personCount,
                    moneyStatus: isMoneyStatus ,
                    ibanStatus: false,
                    mobileStatus: isCeptelStatus,
                    latitude: null,
                    longitude: null,
                    beginDate: helperData.beginDate,
                    endDate: helperData.endDate
                    
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
                <Text style={styles.text_header}>Yardım Et</Text>
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
                      selectedValue={helperData.helpType}
                      style={{width: 350}}
                      onValueChange={(itemValue, itemIndex) =>
                      setHelperData({helpType: itemValue})
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
                <Text style={[styles.text_footer, {marginTop: 10 }]}>Yardımın parasal karşılığı</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="money"
                        color="#05375a"
                        size={25}
                    />
                    <Text style={[styles.textSign, {color:'#009387'},{marginLeft:3},{marginTop:1}]}>Yardımın parasal gönderilebilir mi?</Text>
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
                        {helperData.beginDate == 'Başlangıç Tarihi Seç' ?
                        <Text style={[styles.textSign, {color:'#fff'},{paddingLeft:0}]}>{helperData.beginDate}</Text>
                        :
                        <Text style={[styles.textSign, {color:'#fff'},{paddingLeft:0}]}>{Moment(helperData.beginDate).format('YYYY-MM-DD')}</Text>
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
                        {helperData.endDate == 'Bitiş Tarihi Seç' ?
                        <Text style={[styles.textSign, {color:'#fff'},{paddingLeft:0}]}>{helperData.endDate}</Text>
                        :
                        <Text style={[styles.textSign, {color:'#fff'},{paddingLeft:0}]}>{Moment(helperData.endDate).format('YYYY-MM-DD')}</Text>
                        }
                        </TouchableOpacity>
                        <MaterialIcons 
                        name="keyboard-arrow-up"
                        color="#fff"
                        size={20}
                    />
                    </LinearGradient>
                    <DateTimePickerModal
                      minimumDate={helperData.beginDate}
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
                        onPress={()=>yardimEt()}
                        >
                            <Text style={[styles.textSign, {color:'#fff'}]}>Yardım Ekle</Text>
                        </TouchableOpacity>
                        
                    </LinearGradient>
                    <TouchableOpacity
                        onPress={() => {console.log(helperData.beginDate);console.log(helperData.endDate)}}
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

export default HelperScreen;

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
