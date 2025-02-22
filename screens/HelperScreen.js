import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    Alert,
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
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const axios = require('axios')

const HelperScreen = ({navigation}) => {

  textInput = React.createRef();

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
        if(sayi!='.' && sayi!=',' && sayi!='-' && sayi!=' ' && sayi!='0'){
            setHelperData({
            ...helperData,
            personCount: Number(sayi),
            })
        }else{
            Alert.alert('Hata!','0 dan büyük tam sayı girilmelidir',[{text:'Tamam',onPress: ()=>null}])
            textInput.current.clear();
        }
    }

    const yardimEt = () => {

        if(helperData.helpType > 0 && helperData.personCount > 0 && helperData.endDate != 'Bitiş Tarihi Seç'){
            
                axios.post('http://192.168.1.38/api/Requests/PostRequest',
                {  
                    reqTypeId: helperData.helpType,
                    helpId: 1,
                    userId: ConstantClass.myId,
                    personCount: helperData.personCount,
                    moneyStatus: isMoneyStatus ,
                    ibanStatus: false,
                    mobileStatus: isCeptelStatus,
                    beginDate: helperData.beginDate,
                    endDate: helperData.endDate
                    
                })
                .then((response)=>{
                    Alert.alert('Başarılı','Lütfen eşleşme alanına geçip kontrol ediniz \nYardımınızın görünmemesi durumunda ilgili başlığa tıklayarak sayfayı yenileyebilirsiniz',[{text:'Tamam',onPress: ()=>null}])
                })
                .catch((error) => {
                    console.log(error)
                })
            
        }else{
            Alert.alert('Hata!','Alanlar boş bırakılamaz',[{text:'Tamam',onPress: ()=>null}])
        }    

    }


    return(
        <View style={styles.container}>
            <StatusBar backgroundColor='orange' barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.text_header}>Yardım Et</Text>
            </View>
            <Animatable.View useNativeDriver={false} animation="fadeInUp" style={styles.footer}>
            <Text style={styles.text_footer}>Yardım Türü</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="gift"
                        color="#05375a"
                        size={30}
                        style={styles.icon}
                    />
                    <Picker
                      selectedValue={helperData.helpType}
                      style={[{width: wp('90%')},{color:'darkblue'}]}
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
                <Text style={styles.text_footer}>Kişi Sayısı</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="users"
                        color="#05375a"
                        size={20}
                        style={styles.icon}
                    />
                    <TextInput
                        placeholder="Kişi Sayısı"
                        keyboardType = 'numeric'
                        style={styles.textInput}
                        autoCapitalize="none"
                        ref={textInput}
                        maxLength={1}
                        onChangeText={(sayi)=>updateCount(sayi)}
                    />
                </View>
                <Text style={styles.text_footer}>Ceptel Göster/Gösterme</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="mobile"
                        color="#05375a"
                        size={35}
                        style={styles.icon}
                    />
                    <Text style={[styles.textSign, {color:'darkblue'},{marginLeft:10},{marginTop:hp('1.4%')}]}>Cep telefon numarınız gösterilsin mi?</Text>
                    <CheckBox
                        disabled={false}
                        value={isCeptelStatus}
                        onValueChange={showCeptelStatus}
                        style={{marginTop:hp('1%')}}
                    />
                </View>
                <Text style={styles.text_footer}>Yardımın parasal karşılığı</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="money"
                        color="#05375a"
                        size={25}
                        style={styles.icon}
                    />
                    <Text style={[styles.textSign, {color:'darkblue'},{marginLeft:5},{marginTop:hp('1%')}]}>Yardımın parasal gönderilebilir mi?</Text>
                    <CheckBox
                    disabled={false}
                    value={isMoneyStatus}
                    onValueChange={showMoneyStatus}
                    style={{marginTop:hp('0.6%')}}
                    />
                </View>
                <Text style={styles.text_footer}>Başlangıç Tarihi</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="calendar"
                        color="#05375a"
                        size={20}
                        style={styles.icon}
                    />
                    <LinearGradient
                    colors={['floralwhite','floralwhite']}
                    style={styles.dp}
                    >
                        <TouchableOpacity
                        onPress={()=>showDatePicker()}
                        >
                        {helperData.beginDate == 'Başlangıç Tarihi Seç' ?
                        <Text style={[styles.textSign2, {color:'#8e8e8e'},{paddingLeft:0}]}>{helperData.beginDate}</Text>
                        :
                        <Text style={[styles.textSign2, {color:'darkblue'},{paddingLeft:0}]}>{Moment(helperData.beginDate).format('DD.MM.YYYY')}</Text>
                        }
                        </TouchableOpacity>
                    </LinearGradient>
                    <DateTimePickerModal
                      minimumDate={new Date()}
                      isVisible={isDatePickerVisible}
                      mode="date"
                      onConfirm={(date)=>BeginConfirm(date)}
                      onCancel={()=>hideDatePicker()}
                    />
                </View>
                <Text style={styles.text_footer}>Bitiş Tarihi</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="calendar"
                        color="#05375a"
                        size={20}
                        style={styles.icon}
                    />
                     <LinearGradient
                    colors={['floralwhite','floralwhite']}
                    style={styles.dp}
                    >
                        <TouchableOpacity
                        onPress={()=>showDatePicker2()}
                        >
                        {helperData.endDate == 'Bitiş Tarihi Seç' ?
                        <Text style={[styles.textSign2, {color:'#8e8e8e'},{paddingLeft:0}]}>{helperData.endDate}</Text>
                        :
                        <Text style={[styles.textSign2, {color:'darkblue'},{paddingLeft:0}]}>{Moment(helperData.endDate).format('DD.MM.YYYY')}</Text>
                        }
                        </TouchableOpacity>
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
                    <TouchableOpacity
                        onPress={() => yardimEt()}
                        >
                    <LinearGradient
                    colors={['darkblue','orange']}
                    style={styles.signIn}
                    >

                            <Text style={[styles.textSign, {color:'floralwhite'}]}>Yardım Yolla</Text>
                        
                    </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={[styles.signIn, {
                            borderColor: 'orange',
                            borderWidth: 1,
                            marginTop: 10
                        }]}
                    >
                        <Text style={[styles.textSign, {color:'darkblue'}]}>Yardım Menü</Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    );
};

export default HelperScreen;

const styles = StyleSheet.create({
    container: {
        width:wp('100%'),
        height:hp('100%'),
      backgroundColor: 'orange'
    },
    header: {
        width:wp('100%'),
        height:hp('6%'),
        justifyContent: 'center',
        paddingHorizontal: wp('4%'),
        paddingBottom: hp('0%'),
        marginTop: hp('0%'),
    },
    footer: {
        width:wp('100%'),
        height:hp('94%'),
        backgroundColor: 'floralwhite',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: wp('4.2%'),
        paddingVertical: hp('0%')
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30,
        paddingBottom: hp('1%'),
        alignSelf:'center',
    },
    text_footer: {
        color: 'darkblue',
        fontSize: 16,
        marginTop: hp('0.5%'),
    },
    action: {
        flexDirection: 'row',
        marginTop: hp('0%'),
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: hp('0%'),
        height:hp('5.5%'),
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
        color: 'darkblue',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: hp('1%')
    },
    signIn: {
        width: wp('90%'),
        height: hp('5%'),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textSign2: {
        fontSize: 14,
    },
    text2: {
        fontSize: 16,
    },
    icon: {
        marginTop: hp('1.2%')
    },
    dp: {
        width: wp('85%'),
        height: hp('5%'),
        justifyContent: 'center',
        borderRadius: 10,
        marginLeft: 10,
    }
  });
