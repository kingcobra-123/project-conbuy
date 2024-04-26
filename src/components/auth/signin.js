import React, {useState} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, TextInput} from 'react-native'
import { Firebase_App } from './firebaseconfig'
import { Firebase_Auth } from './firebaseconfig'
import {signInWithEmailAndPassword} from 'firebase/auth'
import SignUp from './signup'
import ForgetPassword from './forgetpassword'
import HomePage from '../Homepage/homepage'

function SignIn({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)
    const app = Firebase_App
    const auth = Firebase_Auth;

    const logIn = async() =>{
        setLoading(true)
        try{
            const response = await signInWithEmailAndPassword(auth, email, password);
            setLoading(false)

            if(response.user){
                
                navigation.replace('HomePage')
            }
        } catch(error){
            alert('Sign In Failed: '+ error.message)
        } finally{
            setLoading(false)}
    }

    const onPressNoAccountHandler = () =>{
        navigation.replace('SignUp Page')
    }
    const onPressForgetPasswordHandler = ()=>{
        navigation.navigate('ForgetPassword')

    }

  return (
    <View style={styles.container}>
        <Text style={styles.text1}> Conbuy!</Text>
        <Text style={styles.text2}>be REAL</Text>
        <Text style={styles.text3}>Welcome back!</Text>
        <Text style={styles.text4}>Help your community in purchase decisions</Text>
        <TextInput
        style={styles.input}
        placeholder='Email'
        autoCapitalize='none'
        keyboardType='email-address'
        onChangeText={(text)=>setEmail(text)}
        ></TextInput>
        <TextInput
        style={styles.input}
        placeholder='Password'
        secureTextEntry
        onChangeText={(text)=>setPassword(text)}
        ></TextInput>
        <TouchableOpacity 
            style = {styles.button}
            onPress={logIn}
            disabled= {loading}>
                {loading?(<ActivityIndicator size="small" color="#fff" />):(<Text style={styles.text5}>Sign In</Text>)}
            
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressForgetPasswordHandler}>
        <Text style={styles.text6}>Forgot Password</Text>
        </TouchableOpacity>
        <Text style={styles.text7}>or Sign in With</Text>
        <TouchableOpacity style = {styles.button1}>
        <Text style={styles.text8}>Continue with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.button1}>
        <Text style={styles.text8}>Continue with Apple</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        onPress={onPressNoAccountHandler}>
        <Text style={styles.text6}>Dont have an account?</Text>
        </TouchableOpacity>

    </View>
  )
}

export default SignIn

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        backgroundColor: '#fff4b8'
    },
    text1: {
        paddingTop:100,
        fontSize:36,
        fontWeight: '600',

    },
    text2: {
        fontSize:14
    },
    text3: {
        fontSize:16,
        paddingTop:70,
        fontWeight: '500'
    },
    text4: {
        fontSize:12,
        paddingBottom:30
    },
    text5: {
        fontSize:22,
        fontWeight:'500'
    },
    text6: {
        fontSize:16,
        paddingTop:8,
        textDecorationLine: 'underline'
    },
    text7: {
        fontSize:16,
        paddingTop:8,
        paddingBottom:5
    },
    text8: {
        fontSize:16,
        fontWeight: '500'
    },
    input: {
        
        height: 50,
        width: 300,
        borderColor: '#F7A70B',
        borderWidth: 2,
        marginBottom: 16,
        padding: 8,
        borderRadius: 4,
        backgroundColor: '#ffff'
      },
    
      button: {
        backgroundColor: '#F7A70B',
        borderWidth:2,
        borderColor: '#F7A70B',
        borderRadius:30,
        minWidth:160,
        height:45,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
        
        
    },
    button1: {
        backgroundColor: '#F7A70B',
        borderWidth:2,
        borderColor: '#F7A70B',
        borderRadius:30,
        minWidth:300,
        height:45,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        margin:5
    }
})