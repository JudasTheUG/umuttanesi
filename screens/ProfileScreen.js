import React, { useContext, useEffect } from 'react';
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
import { ConstantClass } from '../ConstantFile';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const axios = require('axios')

const ProfileScreen = ({route,navigation}) => {

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
        email: ConstantClass.email,
        newPassword: '',
        confirm_password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
    });

    const [putData, setPutData] = React.useState({
        userId:ConstantClass.myId,
        userName:ConstantClass.userName,
        userSurname:ConstantClass.userSurname,
        userPassword:ConstantClass.userPassword,
        iban: ConstantClass.iban,
        mobile:ConstantClass.mobile,
        email: ConstantClass.email,
        birthdate:ConstantClass.birthdate,
    });


    const PasswordChangeHandler = (val) => {
            setData({
                ...data,
                newPassword: val,
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
        setPutData({
            ...putData,
            userName: ad,
        })
    }

    const updateSurname = (soyad) => {
        setPutData({
            ...putData,
            userSurname: soyad,
        })
    }
    
    const updateIban = (ib) => {
        setPutData({
            ...putData,
            iban: ib,
        })
    }

    const updateMobile = (mob) => {
        setPutData({
            ...putData,
            mobile: mob,
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
        setPutData({
            ...putData,
            email: mail,
        })
    }

    const updateBirthdate = (bd) => {
        setPutData({
            ...putData,
            birthdate: bd,
        })
    }

    const bilgilerimiGuncelle = () => {

        if(data.newPassword.length > 0){
            if(data.newPassword==data.confirm_password){
                ConstantClass.userPassword=data.newPassword
                setPutData({
                    ...putData,
                    userPassword:data.newPassword,
                })

                axios.post('http://192.168.1.33/api/Users/UpdateUserPost',
                {  
                    userId:putData.userId,
                    userName:putData.userName,
                    userSurname:putData.userSurname,
                    email:putData.email,
                    iban:putData.iban,
                    mobile:putData.mobile,
                    birthdate: putData.birthdate,
                    userPassword:data.newPassword
                    
                })
                .then((response)=>{
        
                })
                .catch((error) => {
                    console.log(error)
                })
            }else{
                /*TODO Mesaj Şifreler aynı değil*/
            }
        }else{
            axios.post('http://192.168.1.33/api/Users/UpdateUserPost',
                {  
                    userId:putData.userId,
                    userName:putData.userName,
                    userSurname:putData.userSurname,
                    email:putData.email,
                    iban:putData.iban,
                    mobile:putData.mobile,
                    birthdate: putData.birthdate,
                    userPassword:putData.userPassword
                    
                })
                .then((response)=>{
        
                })
                .catch((error) => {
                    console.log(error)
                })
        }    

    }

    const logout = () => {
        ConstantClass.myId=0;
        navigation.goBack();
    }

    if(ConstantClass.myId==0)
   { 
    useEffect(()=>setPutData({
        ...putData,
        userId:ConstantClass.myId,
        userName:ConstantClass.userName,
        userSurname:ConstantClass.userSurname,
        userPassword:ConstantClass.userPassword,
        iban: ConstantClass.iban,
        mobile:ConstantClass.mobile,
        email: ConstantClass.email,
        birthdate:ConstantClass.birthdate,
    }),[])}
    
    return(
        <View style={styles.container}> 
            <StatusBar backgroundColor='orange' barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.text_header}>Profil</Text>
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
                        value={putData.userName}
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
                        value={putData.userSurname}
                        style={styles.textInput}
                        autoCapitalize="none"
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
                        value={putData.mobile}
                        style={styles.textInput}
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
                        value={putData.iban}
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
                        <Text style={[styles.textSign2, {color:'darkblue'},{paddingLeft:0}]}>{Moment(new Date(putData.birthdate)).format('DD.MM.YYYY')}</Text>
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
                        value={putData.email}
                        style={styles.textInput}
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
                <Text style={styles.text_footer}>Yeni Şifre</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="lock"
                        color="#05375a"
                        size={20}
                        style={styles.icon}
                    />
                    <TextInput
                        placeholder="Yeni Şifreniz"
                        value={data.newPassword}
                        secureTextEntry={data.secureTextEntry ? true : false}
                        style={styles.textInput}
                        autoCapitalize="none"
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
                        value={data.confirm_password}
                        secureTextEntry={data.confirm_secureTextEntry ? true : false}
                        style={styles.textInput}
                        autoCapitalize="none"
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
                    colors={['orange','orange']}
                    style={styles.signIn}
                    >
                        <TouchableOpacity
                        onPress={()=>{bilgilerimiGuncelle();logout();}}
                        >
                        <Text style={[styles.textSign, {color:'#fff'}]}>Bilgilerimi Güncelle</Text>
                        </TouchableOpacity>
                        
                    </LinearGradient>
                    <TouchableOpacity
                        onPress={() => logout()}
                        style={[styles.signIn, {
                            borderColor: 'orange',
                            borderWidth: 1,
                            marginTop: hp('1%')
                        }]}
                    >
                        <Text style={[styles.textSign, {color:'black'}]}>Çıkış Yap</Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    );
};

export default ProfileScreen;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.29;

const styles = StyleSheet.create({
    container: {
      flex: 20, 
      backgroundColor: 'orange'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: wp('4%'),
        paddingBottom: hp('0%'),
        marginTop: hp('2%'),
    },
    footer: {
        flex: 19,
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
        marginTop: hp('0.5%'),
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: hp('0.5%'),
        height:hp('5%'),
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
        marginTop: hp('2%')
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
