import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'

const ForgetPassword = ({navigation}) => {

    const onPressHandler = ()=>{
        alert('Check your email for instructions')
        navigation.replace('SignIn')

    }

  return (
    <View style={styles.container}>
       <Text style={styles.heading}>Forget Password?</Text>
            <TextInput 
                style={styles.input}
                placeholder='Email'
                placeholderTextColor={'#57636C'}
            ></TextInput>
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
        backgroundColor: '#fff4b8',
        alignItems: 'center',
    },
    heading: {
        paddingTop:100,
        paddingBottom:10,
        paddingLeft:10,
        fontSize:36,
        fontWeight: '600',
        color:'#2F4858',
        
    },
    text2:{
        fontSize:16,
        flexShrink:1,
        textAlign:'justify',
        color: '#2F4858',
        paddingLeft:15,
        paddingRight:5
    },
    button: {
        backgroundColor: '#F7A70B',
        borderWidth:2,
        borderColor: '#F7A70B',
        borderRadius:30,
        height:45,
        width:'50%',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        margin:10,
        color: '#2F4858'
    },
    input: {
        margin:15,
        height: 50,
        width: 300,
        borderColor: '#fffafa',
        borderWidth: 2,
        marginBottom: 16,
        padding: 8,
        borderRadius: 4,
        backgroundColor: '#ffff',
        borderRadius: 100,
        backgroundColor: '#fffafa'
      },
})