import React, {useState} from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import Uploading from './uploading';
import {ref, uploadBytesResumable,getDownloadURL } from 'firebase/storage';
import {addDoc, collection, onSnapshot} from 'firebase/firestore';
import { Firebase_db } from '../auth/firebaseconfig';
import { Firebase_storage } from '../auth/firebaseconfig';

const MediaPickerModal = ({ visible, onSelect, onClose }) => {

    const [image, setImage] = useState([]);
    const [video, setVideo] = useState([]);
    const[uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);

    const pickImage = async () => {
        let result  = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            aspect: [3, 4],
            quality: 1,
            allowsMultipleSelection: true,
    });

    if (!result.canceled) {
        setImage(oldImage => [...oldImage, result.uri])
        setUploading(true)
       await uploadImage(result.uri, 'image');
    }}

    const uploadImage = async (uri, filetype) => {
        try{

            const blob = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
            const blobData = new Blob([new Uint8Array(atob(blob).split("").map(char => char.charCodeAt(0)))], { type: `image/${filetype}` });
            const fileref = ref(Firebase_storage, 'appupload_testimages/' + new Date().getTime() + '.' + filetype);
            const uploadTask = uploadBytesResumable(fileref, blob);
            uploadTask.on('state_changed',
            
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress.toFixed(0));
            },
            (error) => {
                setUploading(false);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
                    console.log('File available at', downloadURL);
                    // Save the download URL to Firestore
                    setImage([]);
                    setVideo([]);
                    setUploading(false);
                }).catch(error => {
                    console.error("Getting download URL failed: ", error);
                    setUploading(false);
                    // Handle or notify user of the error
                });;
            })
        }catch (error) {
            // This catches errors in fetching the blob or unexpected issues in starting the upload
            console.error("Failed to start upload: ", error);
            setUploading(false);
        }}
    


    const pickVideo = async () => {};

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
        {uploading && <Uploading image={image} video={video} progress={progress} onClose={()=>setUploading(false)}/>}
        </>
    );
};

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