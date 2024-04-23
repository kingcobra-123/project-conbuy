import React, {useState, useEffect} from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import Uploading from './uploading';
import PostScreen from './postscreen';
import {ref, uploadBytesResumable,getDownloadURL } from 'firebase/storage';
import {addDoc, collection, onSnapshot} from 'firebase/firestore';
import { Firebase_db } from '../auth/firebaseconfig';
import { Firebase_storage } from '../auth/firebaseconfig';
import { set } from 'firebase/database';
import { source } from 'deprecated-react-native-prop-types/DeprecatedImagePropType';

const MediaPickerModal = ({ visible, onSelect, onClose }) => {

    const [image, setImage] = useState([]);
    const [video, setVideo] = useState([]);
    const[uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [pickervisible, setPickerVisible] = useState(false);
    const [selectedImageUrls, setSelectedImageUrls] = useState([]);
    const [selectedVideoUrls, setSelectedVideoUrls] = useState([]);

    const pickImage = async () => {
        
        let result  = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            aspect: [3, 4],
            quality: 1,
            allowsMultipleSelection: true,
            
           
    });
   if (!result.canceled && result.assets) {
        setUploading(true);
         result.assets.forEach((asset) => {
            const source = {uri: asset.uri};
              setImage(oldimage => [...oldimage, source])
              uploadImage(asset.uri, 'image');
              setPickerVisible(false);
              onClose();
               
   }) }else{
        alert('No image selected');
   }
};





    const uploadImage = async (uri, filetype) => {
        
        const response = await fetch(uri);
        const blob = await response.blob();
        const storageref = ref(Firebase_storage, 'apptestupload-images/' + new Date().getTime());
        const uploadTask = uploadBytesResumable(storageref, blob, {contentType: 'image/jpeg'});

        uploadTask.on('state_changed', (snapshot) => {
            const progress1 = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(progress1.toFixed());
        },
        (error) => {
            alert('An error occured: ' + error.message);
        },
        async () => {

        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setSelectedImageUrls((prevUrls) => [...prevUrls, downloadURL]);
        setUploading(false);
        setImage([]);
    })

    useEffect(() => {
        if (selectedImageUrls.length > 0) {
            onSelect(selectedImageUrls);
            setSelectedImageUrls([]);
        }
    }, [selectedImageUrls, onSelect])}
    


    const pickVideo = async () => {
        let result  = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            aspect: [3, 4],
            quality: 1,
            allowsMultipleSelection: true
        })
        if (!result.canceled && result.assets) {
            setUploading(true);
            result.assets.forEach((asset) => {
                const source = {uri: asset.uri};
                setVideo(oldvideo => [...oldvideo, source])
                uploadVideo(asset.uri, 'video');
                setPickerVisible(false);
                onClose();
            })
    };

    const uploadVideo = async (uri, filetype) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        const storageref = ref(Firebase_storage, 'apptestupload-videos/' + new Date().getTime());
        const uploadTask = uploadBytesResumable(storageref, blob, {contentType: 'video/mp4'});

        uploadTask.on('state_changed', (snapshot) => {
            const progress1 = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(progress1.toFixed());
        },
        (error) => {
            alert('An error occured: ' + error.message);
        },
        async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            setSelectedVideoUrls((prevUrls) => [...prevUrls, downloadURL]);
            setUploading(false);
            setVideo([]);
        })

        useEffect(() => {
            if (selectedVideoUrls.length > 0) {
                onSelect(selectedVideoUrls);
                setSelectedVideoUrls([]);
            }
        }, [selectedVideoUrls, onSelect])
    };



    return (
        <>
        <Modal
            animationType= 'fade'
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
               
                    <View style={styles.modalView}>
                        <TouchableOpacity style={styles.optionButton} onPress={pickImage}>
                            <Text style={styles.optionText}>Select Images</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionButton} onPress={pickVideo}>
                            <Text style={styles.optionText}>Select Videos</Text>
                        </TouchableOpacity>
                    </View>
                    <View  style={styles.modalView}>
                        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
        </Modal>
        {uploading && <Uploading 
        progress={progress} onClose={()=>setUploading(false)}/>}
        </>
    );
};
}

export default MediaPickerModal;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: '80%',
        backgroundColor: "white",
        borderRadius:20,
        paddingHorizontal: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        marginBottom: 15
    },
    optionButton: {
        paddingTop:10,
        paddingBottom:10,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth:1,
        borderColor: '#ccc'
    },
    optionText: {
        fontSize: 16,
    },
    cancelButton: {
        paddingTop:10,
        paddingBottom:10,
        alignItems: 'center',
        borderColor: '#ccc', 
    },
    cancelText: {
        fontSize: 16,
    }
});