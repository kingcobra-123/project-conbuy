import { Button, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient'
import { createStackNavigator } from '@react-navigation/stack';
import Signup from './signup';
import Signin from './signin';
import React from 'react';


const Stack = createStackNavigator();




const Landingpage =({navigation}) => {

        return (
          <View style={styles.container}>
            <Image
              style={styles.image}
              source={require('../../../assets/images/app-logo.png')}
            />
            <Text style={styles.heading}>Conbuy!</Text>
            <Text style={styles.subheading}>be REAL</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.joinButton]}
                onPress={() => navigation.navigate('SignUp Page')}
              >
                <Text style={styles.buttonText}>Join us</Text>
              </TouchableOpacity>
              <Text style={styles.orText}>or</Text>
              <TouchableOpacity
                style={[styles.button, styles.signInButton]}
                onPress={() => navigation.navigate('SignIn')}
              >
                <Text style={styles.buttonText}>Sign in</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      };
export default Landingpage;





const styles = StyleSheet.create({
     container: {
      flex: 1,
      backgroundColor: '#fff4b8',
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
        width: 200,
        height: 162,
        resizeMode: 'contain',
      },
      heading: {
        fontSize: 36,
        fontWeight: 'bold',
        marginTop: 30,
        marginBottom: 10,
        color:'#2F4858'
      },
      subheading: {
        fontSize: 14,
        fontWeight: 'bold',
        color:'#2F4858'
      },

      buttonContainer: {
        marginTop: 30,
      },
    button: {
        borderWidth: 2,
        borderRadius: 30,
        minWidth: 160,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
      },
      joinButton: {
        backgroundColor: '#F7A70B',
        borderColor: '#F7A70B',
      },
      signInButton: {
        backgroundColor: '#F7A70B',
        borderColor: '#F7A70B',
      },
      buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color:'#2F4858'
      },
      orText: {
        fontSize: 14,
        color:'#2F4858',
        textAlign:'center'
      },
})