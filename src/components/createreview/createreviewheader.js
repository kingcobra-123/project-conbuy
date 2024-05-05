import React, { Component, useContext, useState } from 'react'
import { Text, View, SafeAreaView, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { userMetadata } from '../userprofile/usermetadata';
import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/FontAwesome5'
import {FontAwesome, FontAwesome5} from '@expo/vector-icons/FontAwesome';







const CreateReviewHeader = ({openUploadModal, handleUpload, handleUploadData}) => {


    const handleSharePress = () => {
        openUploadModal();
        handleUploadData();
    };
  


    return (
        <SafeAreaView style={{height:105,}}>          
            <View style={styles.header}>
                <Ionicons name="chevron-back" size={24} color="black" 
                    />
                    <Text style={styles.headerTitle}>Create a review</Text>
                    <TouchableOpacity  
                    style={styles.postButton}
                    onPress={()=>handleSharePress()}>
                        <Image
                            style={styles.image}
                            source={require('../../../assets/images/app-logo.png')}/>
                            <Text style={{paddingRight:5}}>Share</Text>
                </TouchableOpacity>  
            </View>
        </SafeAreaView>
    )
}

export default CreateReviewHeader;


const styles = StyleSheet.create({
    header:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingBottom:5,
        paddingRight:10,
        paddingLeft:10,
        borderBottomWidth:1,
        borderBottomColor:'lightgrey'
    },
    headerTitle:{
        fontSize:14,
        fontWeight:'bold',
        paddingLeft: 30
    },
    postButton:{
        padding: 8,
        backgroundColor: '#F7A70B', 
        borderRadius: 15, 
        alignItems: 'center',  
        justifyContent: 'center',
        width: 90,
        flexDirection: 'row',
    },
    image: {
        width: 40,
        height: 20,
        borderRadius: 10,
      },
   
    


});
