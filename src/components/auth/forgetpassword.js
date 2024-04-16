import React from 'react'
import SignIn from './signin'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

const ForgetPassword = ({navigation}) => {

    const onPressHandler = ()=>{
        alert('Check your email for instructions')
        navigation.replace('SignIn')

    }

  return (
    <View style={styles.container}>
        <Text style={styles.text1}> Forget Password</Text>
        <Text style={styles.text2}>We will send you an email with a link to reset your password, please enter the email associated with your account below.</Text>
        <TextInput 
        style={styles.input}
        placeholder='Email'></TextInput>
        <TouchableOpacity 
        style={styles.button}
        onPress={onPressHandler}> 
            <Text>Reset Password</Text>
        </TouchableOpacity>
    </View>
  )
}

export default ForgetPassword

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#fff4b8'
    },
    text1: {
        paddingTop:100,
        paddingBottom:10,
        paddingLeft:10,
        fontSize:36,
        fontWeight: '600',
        
    },
    text2:{
        fontSize:16,
        flexShrink:1,
        textAlign:'justify',
        
        paddingLeft:15,
        paddingRight:5
    },
    button: {
        backgroundColor: '#F7A70B',
        borderWidth:2,
        borderColor: '#F7A70B',
        borderRadius:30,
        height:45,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        margin:10,
    },
    input: {
        margin:15,
        height: 50,
        width: 300,
        borderColor: '#F7A70B',
        borderWidth: 2,
        marginBottom: 16,
        padding: 8,
        borderRadius: 4,
        backgroundColor: '#ffff'
      },
})