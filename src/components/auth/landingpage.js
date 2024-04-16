import { Button, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient'
import { createStackNavigator } from '@react-navigation/stack';
import Signup from './signup';
import Signin from './signin';
import React from 'react';


const Stack = createStackNavigator();




const Landingpage =({navigation}) => {

    const onPressHandler = ()=>{
        navigation.replace("SignUp Page")

    }

    return(
        <View style={styles.container}>
            <LinearGradient
                colors={['#fff4b8', '#fff4b8']}
                start={{x:0, y:1}}
                end={{x:0, y:0}}
                
                style={styles.gradient}
            >
                <View style= {styles.container}>
                    <Image 
                        style= {styles.image}
                        source={require('../../../assets/images/app-logo.png')}
                    ></Image>
                    <Text style= {styles.Text1}> ConBuy!</Text>
                    <Text style= {styles.Text2}>Real Opinions! Real People! Real Rewards!</Text>
                    <Text style = {styles.Text3}>Thanks for joining! Access or create your account below, and get started on your journey!</Text>
                    
                </View>
            </LinearGradient>
            <View style={styles.buttoncontainer}>
                <TouchableOpacity 
                    style = {styles.button}
                    onPress={onPressHandler}
                    >
                    <Text style={styles.buttontext}>Get Started</Text>

                </TouchableOpacity>
            </View>
        </View>
    )
}
export default Landingpage;





const styles = StyleSheet.create({
    image:{
        width: 200,
        height:162,
        resizeMode: 'contain',
        
    },
    Text1: {
       fontSize:28,
       fontWeight:'bold',
       paddingTop: 30,
       paddingBottom:10
       
    },
    Text2:{
        fontSize:14,
        fontWeight: 'bold',
        alignItems: 'center'
    },
    Text3: {
        fontSize: 14,
        fontWeight: 'normal',
        paddingHorizontal:44,
        paddingTop: 8,
        
        textAlign: 'center'
    },

    container: {
        flex: 1,
        backgroundColor: '#fff4b8',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop:50
    
        
      },
    gradient:{
       width: '100%',
       height: '80%',
       alignItems: 'center',
       justifyContent: 'center'
       
        
    },
    buttoncontainer: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        
        
    },
    button: {
        backgroundColor: '#ffff',
        borderWidth:2,
        borderColor: '#F7A70B',
        borderRadius:30,
        minWidth:160,
        height:50,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        
        
    },
    buttontext: {
        fontSize: 16,
        
        textAlign: 'center'
    }
})