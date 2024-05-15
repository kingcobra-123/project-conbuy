import React, { Component } from 'react'
import { Text, View, Modal, StyleSheet } from 'react-native'
import { BlurView } from 'expo-blur';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { getAuth, sendEmailVerification } from "firebase/auth";
import UserName from '../../userprofile/username';
import EvilIcons from '@expo/vector-icons/EvilIcons';




const VerifyEmailModal = ({modalVisible, emailVerify}) => {

    const sendVerificationEmail =  async () => {
        const auth = getAuth();
        const user = auth.currentUser;
    
        if (user) {
            sendEmailVerification(user)
                .then(() => {
                    console.log("Verification email sent.");
                    alert("Verification email sent. Please check your email.");
                    emailVerify();
                    
                })
                .catch((error) => {
                    console.error("Error sending verification email:", error);
                    alert("Failed to send verification email. Please try again.");
                });
        } else {
            alert("No user is currently signed in.");
        }

        
    };

    return (
        <Modal  
        transparent animationType="fade"

        // onRequestClose={onClose}
        >
            <View  style ={styles.container}>
                <BlurView 
                intensity = {80}
                style = {[StyleSheet.absoluteFill ]}
                ></BlurView>
                <View
                style = {styles.blurContainer}
                >
                        <MaterialCommunityIcons name="email-alert-outline" size={45} color="black" />
                       <View style = {styles.separator}></View>
                        <TouchableOpacity onPress={()=>sendVerificationEmail()}>
                            <Text style={{fontWeight:'bold', color: '#F7A70B'}}>Verify your Email</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>emailVerify()}>
                            <EvilIcons name="close-o" size={30} color="black" />
                        </TouchableOpacity>
                    

                </View>
            </View>
        </Modal>
    )
}

export default VerifyEmailModal;

const styles = StyleSheet.create({
    separator:{
        height: 1, 
        width: '90%',
        backgroundColor: 'lightgrey',
    },
   container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
   },
   blurContainer:{
    width: '70%',
    height:140,
    backgroundColor:  '#E0E3E7',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    borderRadius: 12,
     rowGap:15

   }
})
