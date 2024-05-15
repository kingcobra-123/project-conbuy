import React, { Component, useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import VerifyEmailModal from './utilities/verifyemailmodal';
import { signOut } from 'firebase/auth';
import { Firebase_Auth } from '../../components/auth/firebaseconfig';


const EditProfileDetails = ({onChange, emailVerified}) => {

    const [userFullName, setUserFullName] = useState('');
    const [userUserName, setUserUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [emailVerifyModal, setEmailVerifyModal] = useState(false);
    const [signOut1, setSignOut1] = useState(false);

    const handleEmailVerify = () => {
        setEmailVerifyModal(!emailVerifyModal)
    }

    const logout = async() =>{
        setSignOut1(true)
        try{
            const response = await signOut(Firebase_Auth);
            setSignOut1(false)

            if(response.user){
                
                navigation.replace('LandingPage')
            }
        } catch(error){
            alert('Sign In Failed: '+ error.message)
        } finally{
            setSignOut1(false)}
    }


    return (
        <View>
        <View style={styles.reviewCategory}>
            <View style={styles.nameStyle}>
                <Text style={styles.nameFontStyle}>Name</Text>
                <TextInput style={styles.nameInput}
                placeholder='Full Name'
                placeholderTextColor={'grey'}
                onChangeText={(text)=>onChange('user_full_name', text)}
                autoCapitalize='none'>
                </TextInput>
            </View>
            <View style={styles.nameStyle}>
                <Text style={styles.nameFontStyle}>UserName</Text>
                <TextInput style={styles.nameInput}
                placeholder='displayname'
                placeholderTextColor={'grey'}
                onChangeText={(text)=>onChange('displayName', text)}
                autoCapitalize='none'>
                </TextInput>
            </View>
            <View style={styles.nameStyle}>
                <Text style={styles.nameFontStyle}>Email</Text>
                {emailVerified ? 
                <TextInput style={styles.nameInput}
                placeholder='email-address'
                placeholderTextColor={'grey'}
                onChangeText={(text)=>onChange('email', text)}
                autoCapitalize='none'
                keyboardType='email-address'>
                </TextInput>:
                <TouchableOpacity 
                    style={{flexDirection:'row',width:250}}
                    onPress={()=>handleEmailVerify()}>
                    <Text> Verify your email</Text>
                </TouchableOpacity>}
            </View>
            {emailVerifyModal ? <VerifyEmailModal 
                                    modalVisible = {emailVerifyModal}
                                    emailVerify={()=>handleEmailVerify()}/> : null}
            <View style={styles.nameStyle}>
                <Text style={styles.nameFontStyle}>Password</Text>
                <TextInput style={styles.nameInput}
                placeholder='password'
                placeholderTextColor={'grey'}
                onChangeText={(text)=>onChange('password', text)}
                autoCapitalize='none'
                secureTextEntry>
                </TextInput>
            </View>
            
        </View>
        <View style={{flexDirection:'row', paddingLeft:10, paddingTop:10}}>
            <TouchableOpacity style={{flexDirection:'row'}} onPress={()=>logout()}>
            <MaterialCommunityIcons name="logout" size={26} color="black" />
            <Text style={{paddingTop:5}}>Logout</Text>
            </TouchableOpacity>
        </View>
        </View>
    )
}

export default EditProfileDetails;

const styles = StyleSheet.create({
    reviewCategory:{
        paddingRight:10,
        paddingLeft:10,
        borderBottomWidth:1,
        borderBottomColor:'lightgrey',
        height:230
    },
    nameStyle:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingBottom:10,
        paddingRight:10,
        borderBottomWidth:1,
        borderBottomColor:'lightgrey',
        height:55,
        paddingTop:10,
        },
    nameInput:{
        width: 250,
        height: 40,
        borderRadius: 5,
        paddingLeft: 10
    },
    nameFontStyle:{
        fontSize:16,
        paddingBottom: 2,
        paddingLeft: 10,
        paddingTop: 5
    },

})
