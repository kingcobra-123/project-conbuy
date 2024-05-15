import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import UserName from '../userprofile/username';
import { useNavigation } from '@react-navigation/native';

const EditProfileHeader = ({handleSaveChanges}) => {

    const navigation = useNavigation()


    const handleButton = () => {
        handleSaveChanges();
    };

    const handleNavigation = () => {
        navigation.goBack();
    }




    return (
        <SafeAreaView style={{height:105}} >
            <View style={styles.header}>
                <Ionicons name="chevron-back" size={24} color="black" onPress={()=>handleNavigation()} />
                <Text style={styles.headerTitle}>Edit Profile</Text>
                <TouchableOpacity
                style={styles.saveChangesButton}
                onPress={()=>handleButton()}>
                    <Text style={{color:'white', fontSize:12}}>Save Changes</Text>
                </TouchableOpacity>
            </View>
            
        </SafeAreaView>
    )
}

export default EditProfileHeader;


const styles = StyleSheet.create({
    header:{
        flexDirection:'row',
        alignItems:'center',
        paddingBottom:5,
        paddingRight:10,
        paddingLeft:10,
        borderBottomWidth:1,
        borderBottomColor:'lightgrey',
        height: 50,
        justifyContent: 'space-between'
    },
    headerTitle:{
        fontSize:14,
        fontWeight:'bold',
        paddingLeft: 60
    },
    saveChangesButton:{
        padding: 8,
        backgroundColor: '#F7A70B', 
        borderRadius: 15, 
        alignItems: 'center',  
        justifyContent: 'center',
        width: 90,
        flexDirection: 'row',
    },
})

