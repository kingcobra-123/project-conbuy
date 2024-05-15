import React, { Component, useState } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native-gesture-handler';


import MediaPickerModal from './utilities/userpicmodal';


const EditProfilePicture = ({onChange}) => {


    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState([]);

    const openMediaPickerModal = () => {
        setModalVisible(true);
    };

    const handleMediaSelect = (source) =>{
        if (!Array.isArray(source)) {
            console.error('Invalid sources:', source);
            return;
        }
        const validUris = source.flat().filter(uri => typeof uri === 'string' && uri.startsWith('http'));
    
        setModalVisible(false);
        setSelectedImage(validUris);
        onChange('photoURL', validUris);
        
    };




    return (
            <View style={{height:230, paddingTop:50, alignItems:'center', borderBottomWidth:1,
            borderBottomColor:'lightgrey',}}>
                <TouchableOpacity style={styles.pictureIconStyles}
                onPress={()=>openMediaPickerModal()}>
                    {selectedImage.length === 0 && (
                    <AntDesign name="camera" size={60} color="#F7A70B" /> )}
                    {selectedImage.length > 0 && (
                        <Image source={{uri:selectedImage[0]}} style={{width:100, height:100, borderRadius:50}} />
                    )}
                </TouchableOpacity>
                <Text style={{fontSize:14, paddingTop:10}}>Edit Picture</Text>
                <MediaPickerModal
                    visible={modalVisible}
                    onSelect={handleMediaSelect}
                    onClose={()=>setModalVisible(false)} />
            </View>
        
    )
}

export default EditProfilePicture

const styles = StyleSheet.create({
    pictureIconStyles:{
        borderRadius: 50,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderWidth: 1,
        width: 100,
        height: 100,
    }
})
