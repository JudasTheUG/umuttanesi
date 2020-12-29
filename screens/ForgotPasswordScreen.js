  
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
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const axios = require('axios');

const ForgotPasswordScreen = ({navigation}) =>{

    const [data, setData] = React.useState({
        email: '',
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

    const yeniSifre = () =>{
    if(data.email!=''){
        axios.get('http://192.168.1.33/api/Users/forgotPassword?email='+data.email)
        .then((response)=>{
            console.log(response.data);
            /*TODO false => geçerli email adresi giriniz
                    true => emailinize şifre yollanmıştır
            */
        })
        .catch((error) => {
            console.log(error)
        })
    }else{
        /*TODO Alan boş bıraklamaz */
    }
    }

    return(
        <View style={styles.container}>
            <StatusBar backgroundColor='midnightblue' barStyle="light-content"/>
        <View style={styles.header}>
            <Animatable.Image 
                animation="bounceIn"
                duraton="1500"
            source={require('../assets/forgotpassword.png')}
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
                        placeholder="Üye Olduğunuz e-mail adresinizi giriniz"
                        style={styles.textInput}
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

                <View style={styles.button}>
                    <LinearGradient
                    colors={['darkblue','darkorange']}
                    style={styles.signIn}
                    >
                        <TouchableOpacity
                        onPress={() => yeniSifre()}
                        >
                           <Text style={[styles.textSign, {color:'#fff'}]}>Yeni Şifre Yolla</Text> 
                        </TouchableOpacity>
                        
                    </LinearGradient>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={[styles.signIn, {
                            borderColor: 'orange',
                            borderWidth: 1,
                            marginTop: 10
                        }]}
                    >
                        <Text style={[styles.textSign, {color:'darkblue'}]}>Giriş Ekranına Dön</Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    );

};

export default ForgotPasswordScreen;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.30;

const styles = StyleSheet.create({
    container: {
      flex: 6, 
      backgroundColor: 'midnightblue'
    },
    header: {
        flex: 2,
        justifyContent: 'flex-end',
        paddingHorizontal: wp('4%'),
        paddingBottom: hp('3%'),
        marginTop: hp('3%'),
    },
    footer: {
        flex: 4,
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
