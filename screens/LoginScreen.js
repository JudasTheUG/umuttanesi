  
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
import { ConstantClass } from '../ConstantFile';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const axios = require('axios')

const LoginScreen = ({navigation}) =>{

    const [data, setData] = React.useState({
        myId: '',
        email: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,

    });

    const textInputChange = (val) => {
        if(val.length != 0){
            setData({
                ...data,
                email: val,
                check_textInputChange: true
            });
        }else {
            setData({
                ...data,
                email: val,
                check_textInputChange: false
            });
        }
    }

    const PasswordChangeHandler = (val) => {
            setData({
                ...data,
                password: val,
            });
    }

    const updateSTE = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const sendLogin = () => {
        axios.get('http://192.168.1.38/api/Users/Login?email='+data.email+'&password='+data.password)
        .then((response)=>{
            if(response.data==true){
                axios.get('http://192.168.1.38/api/Users/getUserId?email='+data.email)
                .then((response)=>{
                     axios.get('http://192.168.1.38/api/Users/getUserInfo/'+response.data)
                    .then((response)=>{
                        ConstantClass.myId=response.data.userId
                        ConstantClass.userName = response.data.userName
                        ConstantClass.userSurname = response.data.userSurname
                        ConstantClass.userPassword = response.data.userPassword
                        ConstantClass.iban = response.data.iban
                        ConstantClass.mobile = response.data.mobile
                        ConstantClass.email = response.data.email
                        ConstantClass.birthdate = response.data.birthdate

                        navigation.navigate('MaterialTopTabScreen')
                })
                .catch((error) => {
                    console.log(error)
                })
                    
                })
                .catch((error) => {
                    console.log(error)
                })

            }else{
                Alert.alert('Hata!','Girilen email adresi veya şifre yanlış',[{text:'Tamam',onPress: ()=>null}])
            }
        })
        .catch((error) => {
            console.log(error)
        })
      };



    return(
        <View style={styles.container}>
            <StatusBar backgroundColor='black' barStyle="light-content"/>
        <View style={styles.header}>
            <Animatable.Image 
                animation="bounceIn"
                duraton="1500"
            source={require('../assets/logo.png')}
            style={styles.logo}
            resizeMode="stretch"
            />
        </View>
            <Animatable.View animation="fadeInUp" style={styles.footer}>
                <Text style={styles.text_footer}>E-mail</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="user-o"
                        color="#05375a"
                        size={20}
                        style={styles.icon}
                    />
                    <TextInput
                        placeholder="E-mail adresiniz"
                        style={styles.textInput}
                        keyboardType='email-address'
                        autoCapitalize="none"
                        onChangeText={(val) => textInputChange(val)}
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
                <Text style={[styles.text_footer, {marginTop: 30 }]}>Şifre</Text>
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
                <View>
                    <TouchableOpacity 
                onPress={() => navigation.navigate('ForgotPasswordScreen')}
                >
                    <Text style={[styles.text2, {color:'darkblue'}]}>Şifremi Unuttum!</Text>
                </TouchableOpacity>
                </View>
                <View style={styles.button}>
                <TouchableOpacity
                    onPress={sendLogin}
                    >
                    <LinearGradient
                    colors={['orange','black']}
                    style={styles.signIn}
                    >
                    <Text style={[styles.textSign, {color:'#fff'}]}>Giriş Yap</Text>
                    </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('SignUpScreen')}
                        style={[styles.signIn, {
                            borderColor: 'orange',
                            borderWidth: 1,
                            marginTop: 10
                        }]}
                    >
                        <Text style={[styles.textSign, {color:'black'}]}>Üye Ol</Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    );

};

export default LoginScreen;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.29;

const styles = StyleSheet.create({
    container: {
      flex: 4, 
      backgroundColor: 'black'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: wp('4%'),
        paddingBottom: hp('1.1%'),
        marginTop: hp('11%'),
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: wp('4.2%'),
        paddingVertical: hp('3.5%')
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
        marginTop: hp('6.2%')
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
        width: height_logo,
        height: height_logo,
        alignSelf:'center',
    },
    icon: {
        marginTop: hp('1.7%')
    },
  });
