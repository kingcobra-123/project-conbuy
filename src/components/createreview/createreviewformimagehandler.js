import React, { Component, useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import MediaPickerModal from './utilities/mediapickermodal'
import { Feather, Fontisto } from '@expo/vector-icons';

const CreateReviewFormImageHandler = ({onChangeImage}) => {


    const [modalVisible, setModalVisbile] = useState(false);
    const [selectedImage, setSelectedImage] = useState([]);
    const [reviewImage, setReviewImage] = useState([]);

    const openMediaPickerModal = () => {
        setModalVisbile(true);
    };
    const handleMediaSelect = (source) =>{
        if (!Array.isArray(source)) {
            console.error('Invalid sources:', source);
            return;
        }
        const validUris = source.flat().filter(uri => typeof uri === 'string' && uri.startsWith('http'));
    
        setModalVisbile(false);
        setSelectedImage(oldImages => [...oldImages, ...validUris]);
        setReviewImage(oldImages => [...oldImages, ...validUris]);
        
    };


    useEffect(() => {
        onChangeImage('reviewImage', reviewImage);
    }, [reviewImage]);
    
    const handleDeleteImage = (index) => {
            const newImages = selectedImage.filter((_, i) => i !== index);
            setSelectedImage(newImages);
            setReviewImage(newImages);
            console.log('Deleted image at index', index);
        };


    return (
        <View style={styles.imageheader}>
            {selectedImage.length === 0 && (
        <View >
                <TouchableOpacity style={styles.mediaButton}
                onPress={()=>openMediaPickerModal()}>
                    <Icon name="camera" size={20} color="#F7A70B" />
                </TouchableOpacity>
                <MediaPickerModal
                    visible={modalVisible}
                    onSelect={handleMediaSelect}
                    onClose={()=>setModalVisbile(false)}
                />
         </View>)}
         <View>
                {selectedImage.length > 0 && (
                    <ScrollView horizontal style={styles.imageContainer}>
                        {selectedImage.map((uri, index) => uri && (
                            <View style = {styles.imagewrapper}>
                                <Image key={index} source={{ uri }} style={styles.imageStyle} />
                                <TouchableOpacity style = {styles.deleteIcon}
                                onPress={()=>handleDeleteImage(index)} >
                                    <Icon name="times" size={10} color="black" />
                                </TouchableOpacity>
                            </View>))}
                        <View style={{
                            borderWidth: 0.3,
                            borderColor: '#F7A70B',
                            borderRadius: 10,
                            height: 60,
                            width: 60,
                            marginRight: 5,
                        }}>
                        <Feather 
                            style={{paddingLeft: 4, paddingTop: 3}}
                            name="plus" size={50} 
                            color="#F7A70B" 
                            onPress={openMediaPickerModal} /></View>
                        <MediaPickerModal
                            visible={modalVisible}
                            onSelect={handleMediaSelect}
                            onClose={()=>setModalVisbile(false)}
                />
                    </ScrollView>
                )}

            </View>
         </View>
    )
}

export default CreateReviewFormImageHandler;

const styles = StyleSheet.create({

    imageheader:{
        flexDirection:'row-reverse',
        justifyContent:'space-between',
        paddingBottom:5,
        paddingRight:10,
        paddingLeft:10,
        borderBottomWidth:1,
        borderBottomColor:'lightgrey'
    },
   
    mediaButton: {
        padding: 10,
        margin: 10,
        backgroundColor: '#e0e0e0', 
        borderRadius: 5, 
        alignItems: 'center', 
        borderWidth: 0.5,
        borderColor: 'lightgrey', 
    },

    imageContainer: {
        flexDirection: 'row-reverse',
        borderRadius: 10,
        height: 70,
    },
    imageStyle: {
        width: 55,  
        height: 55
    },
    imagewrapper: {
        margin: 5,
        overflow: 'visible' 
    },
    deleteIcon: {
        top: -10, 
        right: -40,
        backgroundColor: 'lightgrey',
        borderRadius: 15,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#F7A70B',
        borderWidth: 1,
        zIndex: 10 
    }

})
