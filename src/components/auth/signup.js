import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Firebase_App, Firebase_Auth } from './firebaseconfig';
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";


const SignUp = ({ navigation }) => {
  const [displayName, setDisplayName] = useState(null);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const app = Firebase_App;
  const auth = Firebase_Auth;

  const handleCreateAccount = async() => {
    setLoading(true)
    try{
        const response = await createUserWithEmailAndPassword(auth, email, password);
        alert('Check your email!')
        

        await updateProfile(response.user,{
            displayName: displayName
        }

        )
    } catch(error){
        alert('Sign Up Failed: '+ error.message)
    } finally{
        setLoading(false)
    }
}

  const handleSignIn = () => {
    navigation.navigate('SignIn');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Conbuy!</Text>
      <Text style={styles.subheading}>be REAL</Text>
      <Text style={styles.description}>Real People! Real Opinion! Real Rewards!</Text>
      <TextInput
        style={styles.input}
        placeholder="Display Name"
        placeholderTextColor={'#57636C'}
        value={displayName}
        onChangeText={setDisplayName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={'#57636C'}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={'#57636C'}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity 
            style={styles.createAccountButton} 
            onPress={handleCreateAccount}
            disabled={loading}
            >
        <Text style={styles.buttonText}>Join us</Text>
      </TouchableOpacity>
      <Text style={styles.orText}>or signup with</Text>
      <TouchableOpacity style={styles.socialButton}>
        <Text style={styles.socialButtonText}>Join us with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialButton}>
        <Text style={styles.socialButtonText}>Join us with Apple</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSignIn}>
        <Text style={styles.signInText}>Already have an account?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff4b8',
    padding: 20,
  },
  heading: {
    fontSize: 36,
    fontWeight: '600',
    marginTop: 50,
    color: '#2F4858',
  },
  subheading: {
    fontSize: 14,
    color: '#2F4858',
  },
  description: {
    fontSize: 12,
    marginTop: 20,
    color: '#2F4858',
  },
  input: {
    height: 50,
    width: '80%',
    marginTop:10,
    borderColor: '#fffafa',
    borderWidth: 2,
    marginVertical: 10,
    padding: 15,
    borderRadius: 100,
    backgroundColor: '#fffafa',
  },
  createAccountButton: {
    backgroundColor: '#F7A70B',
    borderWidth: 2,
    borderColor: '#F7A70B',
    borderRadius: 30,
    minWidth: 170,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 22,
    fontWeight: '500',
    color: '#2F4858',
  },
  orText: {
    fontSize: 16,
    marginTop: 20,
    marginBottom: 10,
    color:'#2F4858'
  },
  socialButton: {
    backgroundColor: '#F7A70B',
    borderWidth: 2,
    borderColor: '#F7A70B',
    borderRadius: 30,
    minWidth: '70%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2F4858',
  },
  signInText: {
    fontSize: 16,
    marginTop: 20,
    textDecorationLine: 'underline',
    color:'#2F4858'
  },
});

export default SignUp;