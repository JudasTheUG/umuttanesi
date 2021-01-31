  
import React from 'react';
import { 
    View,
    Text, 
    TouchableOpacity,
    Dimensions, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Moment from 'moment';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { ScrollView } from 'react-native-gesture-handler';

const axios = require('axios')

const SignUpScreen = ({navigation}) => {

    const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);

    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
  
    const handleBirthConfirm = (date) => {
        updateBirthdate(date);
      hideDatePicker();
    };
    
    const [data, setData] = React.useState({
        name: '',
        surname: '',
        ceptel: '',
        iban: '',
        birthDate: 'Doğum Tarihinizi Seçiniz',
        email: '',
        password: '',
        confirm_password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
    });

    const PasswordChangeHandler = (val) => {
            setData({
                ...data,
                password: val,
            });
    }

    const PasswordConfirmChangeHandler = (val) => {
        setData({
            ...data,
            confirm_password: val,
        });
    }

    const updateSTE = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }
    const updateCSTE = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        });
    }

    const updateName = (ad) => {
        setData({
            ...data,
            name: ad,
        })
    }

    const updateSurname = (soyad) => {
        setData({
            ...data,
            surname: soyad,
        })
    }
    
    const updateIban = (ib) => {
        setData({
            ...data,
            iban: ib,
        })
    }

    const updateMobile = (mob) => {
        setData({
            ...data,
            ceptel: mob,
        })
    }

    const updateEmail = (mail) => {
        if(mail.length != 0){
            setData({
                ...data,
                email: mail,
                check_textInputChange: true
            });
        }else {
            setData({
                ...data,
                email: mail,
                check_textInputChange: false
            });
        }
    }

    const updateBirthdate = (bd) => {
        setData({
            ...data,
            birthDate: bd,
        })
    }

    const kayitOl = () => {

        if(data.password.length > 0 && data.confirm_password.length > 0 && data.email.length > 0 && 
           data.name.length > 0 && data.surname.length > 0 && data.birthDate.length !='Doğum Tarihinizi Seçiniz'){
            if(data.password==data.confirm_password){

                axios.post('http://192.168.1.38/api/Users/Register',
                {  
                    userName:data.name,
                    userSurname:data.surname,
                    email:data.email,
                    iban:data.iban,
                    mobile:data.ceptel,
                    birthdate: data.birthDate,
                    userPassword:data.password
                    
                })
                .then((response)=>{
                    navigation.navigate('LoginScreen')
                })
                .catch((error) => {
                    console.log(error)
                })
            }else{
                Alert.alert('Hata!','Girilen şifreler uyuşmamaktadır',[{text:'Tamam',onPress: ()=>null}])
            }
        }else{
            Alert.alert('Hata!','Alanlar boş bırakılamaz',[{text:'Tamam',onPress: ()=>null}])
        }    

    }


    return(
        <View style={styles.container}>
            <StatusBar backgroundColor='orange' barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.text_header}>Şimdi Kaydolun</Text>
            </View>
            <Animatable.View animation="fadeInUp" style={styles.footer}>
            <Text style={styles.text_footer}>Ad</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="user"
                        color="#05375a"
                        size={20}
                        style={styles.icon}
                    />
                    <TextInput
                        placeholder="Adınız"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(ad)=>updateName(ad)}
                    />
                </View>
                <Text style={styles.text_footer}>Soyad</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="users"
                        color="#05375a"
                        size={20}
                        style={styles.icon}
                    />
                    <TextInput
                        placeholder="Soyadınız"
                        style={styles.textInput}
                        onChangeText={(soyad)=>updateSurname(soyad)}
                    />
                </View>
                <Text style={styles.text_footer}>Ceptel</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="mobile"
                        color="#05375a"
                        size={30}
                        style={styles.icon}
                    />
                    <TextInput
                        placeholder="Cep Telefonu Numaranız"
                        style={styles.textInput}
                        keyboardType= 'phone-pad'
                        autoCapitalize="none"
                        onChangeText={(mob)=>updateMobile(mob)}
                    />
                </View>
                <Text style={styles.text_footer}>Iban</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="bank"
                        color="#05375a"
                        size={20}
                        style={styles.icon}
                    />
                    <TextInput
                        placeholder="İnternet Bankacılığı Numaranız(Opsiyonal)"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(ib)=>updateIban(ib)}
                    />
                </View>
                <Text style={styles.text_footer}>Doğum Tarihi</Text>
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
                        onPress={showDatePicker}
                        >
                          {data.birthDate == 'Doğum Tarihinizi Seçiniz' ?
                        <Text style={[styles.textSign2, {color:'#8e8e8e'},{paddingLeft:0}]}>{data.birthDate}</Text>
                        :
                        <Text style={[styles.textSign2, {color:'darkblue'},{paddingLeft:0}]}>{Moment(data.birthDate).format('DD.MM.YYYY')}</Text>
                        }
                        </TouchableOpacity>
                    </LinearGradient>
                    <DateTimePickerModal
                      minimumDate={new Date('1950-01-01')}
                      isVisible={isDatePickerVisible}
                      mode="date"
                      onConfirm={handleBirthConfirm}
                      onCancel={hideDatePicker}
                    />
                </View>
                <Text style={styles.text_footer}>E-mail</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="envelope"
                        color="#05375a"
                        size={20}
                        style={styles.icon}
                    />
                    <TextInput
                        placeholder="E-mail Adresiniz"
                        style={styles.textInput}
                        keyboardType='email-address'
                        autoCapitalize="none"
                        onChangeText={(mail) =>updateEmail(mail)}
                    />
                    {data.check_textInputChange ? 
                    <Animatable.View
                        animation="bounceIn" >
                    <Feather
                        name="check-circle"
                        color="green"
                        size={20}
                        style={styles.icon}
                    />
                    </Animatable.View>
                    : null}
                </View>
                <Text style={styles.text_footer}>Şifre</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="lock"
                        color="#05375a"
                        size={20}
                        style={styles.icon}
                    />
                    <TextInput
                        placeholder="Şifreniz"
                        secureTextEntry={data.secureTextEntry ? true : false}
                        style={styles.textInput}
                        autoCapitalize="none"
                        maxLength={8}
                        onChangeText={(val) => PasswordChangeHandler(val)}
                    />
                    <TouchableOpacity
                    onPress={updateSTE}
                    >
                        {data.secureTextEntry ? 
                      <Feather
                        name="eye-off"
                        color="black"
                        size={20}
                        style={styles.icon}
                    /> 
                    :
                      <Feather
                        name="eye"
                        color="black"
                        size={20}
                        style={styles.icon}
                    /> 
                        }
                    </TouchableOpacity>
                    
                </View>
                <Text style={styles.text_footer}>Şifre Tekrarı</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="lock"
                        color="#05375a"
                        size={20}
                        style={styles.icon}
                    />
                    <TextInput
                        placeholder="Şifrenizi Doğrulayınız"
                        secureTextEntry={data.confirm_secureTextEntry ? true : false}
                        style={styles.textInput}
                        autoCapitalize="none"
                        maxLength={8}
                        onChangeText={(val) => PasswordConfirmChangeHandler(val)}
                    />
                    <TouchableOpacity
                    onPress={updateCSTE}
                    >
                        {data.confirm_secureTextEntry ? 
                      <Feather
                        name="eye-off"
                        color="black"
                        size={20}
                        style={styles.icon}
                    /> 
                    :
                      <Feather
                        name="eye"
                        color="black"
                        size={20}
                        style={styles.icon}
                    /> 
                        }
                    </TouchableOpacity>
                    
                </View>

                <View style={styles.button}>
                    <LinearGradient
                    colors={['royalblue','orange']}
                    style={styles.signIn}
                    >
                        <TouchableOpacity
                        onPress={() => kayitOl()}
                        >
                            <Text style={[styles.textSign, {color:'#fff'}]}>Üye Ol</Text>
                        </TouchableOpacity>
                        
                    </LinearGradient>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('LoginScreen')}
                        style={[styles.signIn, {
                            borderColor: 'navy',
                            borderWidth: 1,
                            marginTop: hp('1%')
                        }]}
                    >
                        <Text style={[styles.textSign, {color:'darkorange'}]}>Giriş Yap</Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    );
};

export default SignUpScreen;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.29;

const styles = StyleSheet.create({
    container: {
        width:wp('100%'),
        height:hp('100%'),
      backgroundColor: 'orange',
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
    logo: {
        width: height_logo,
        height: height_logo,
        alignSelf:'center',
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
