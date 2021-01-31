import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    StatusBar,
    Image,
    ImageBackground,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const SecondIntroScreen = ({navigation}) => {
    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='black' barStyle="light-content"/>
        <View style={styles.header}>
        <ImageBackground
            source={require('../assets/taking.png')}
            style={styles.logo}
            resizeMode="stretch"
        >
        <View style={styles.button}>
            <TouchableOpacity onPress={()=>navigation.navigate('HelpeeScreen')}>
                <LinearGradient
                    colors={['royalblue','orange']}
                    style={styles.helpee}
                >
                    <Text style={styles.textSign}>Yardım İste</Text>
                    <MaterialIcons 
                        name="navigate-next"
                        color="#fff"
                        size={20}
                    />
                </LinearGradient>
            </TouchableOpacity>
            </View>
            </ImageBackground>
        </View>

        <Animatable.View 
            style={styles.footer}
            animation="fadeInUp"
        >
           <ImageBackground 
            source={require('../assets/giving.png')}
            style={styles.logo2}
            resizeMode="stretch"
            >
            <View style={styles.button2}>
            <TouchableOpacity onPress={()=>navigation.navigate('HelperScreen')}>
                <LinearGradient
                     colors={['orange','darkblue']}
                    style={styles.helper}
                >
                    <Text style={styles.textSign}>Yardım Et</Text>
                    <MaterialIcons 
                        name="navigate-next"
                        color="#fff"
                        size={20}
                    />
                </LinearGradient>
            </TouchableOpacity>
            </View>
            </ImageBackground>
        </Animatable.View>
      </View>
    );
};

export default SecondIntroScreen;

const styles = StyleSheet.create({
    container: {
        width:wp('100%'),
        height:hp('100%'),
    },
    header: {
        height:hp('47%'),
        justifyContent: 'flex-end',
        alignContent:'flex-end',
    },
    footer: {
        height:hp('50%'),
        justifyContent: 'flex-start',
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
  }
});