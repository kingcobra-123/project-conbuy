import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Modal, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';


const CreatePostRender = ({uploadStatus, onClose}) => {
    const [animation, setAnimation] = useState(new Animated.Value(0));
    useEffect(() => {
        if (uploadStatus === 'success' || uploadStatus === 'failed') {
            Animated.timing(animation, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true
            }).start();
        }
    }, [uploadStatus]);

    const iconY = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [-50, 0] // Adjust range for desired effect
    });







    return (
        <Modal>
                <View  style ={styles.container}>
                    <BlurView 
                        intensity = {100}
                        style = {[StyleSheet.absoluteFill, {position: 'absolute'} ]}
                    ></BlurView>
                <View style = {styles.blurContainer}>
                    <Animated.View style={{ transform: [{ translateY: iconY }] }}>
                            {uploadStatus === 'success' ? (
                                <View style= {{alignItems: 'center'}}>
                                    <Text style={{fontSize:12, paddingTop:10}}>Successfully Created Your Review...</Text>
                                    <AntDesign style = {{paddingTop:5}}name="checkcircle" size={24} color="green" />
                                 </View>
                            ) : uploadStatus === 'failed' ? (
                                <View>
                                    <Text style={{fontSize:12}}>Failed Creating Your Review...</Text>
                                    <AntDesign name="closecircle" size={24} color="red" />
                                </View>
                            ) : null}
                        </Animated.View>
                         <View style = {styles.separator}></View>
                            <TouchableOpacity >
                                <Text style={{fontWeight:'200', color: '#F7A70B', paddingBottom:25}}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                </View>
        </Modal>
       
    )
}

export default CreatePostRender;

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
    width: '100%',
    height: '100%',
   },
   blurContainer:{
    width: '70%',
    height:100,
    backgroundColor:  '#E0E3E7',
    alignItems: 'center',
    zIndex: 2,
    borderRadius: 12,
     rowGap:15

   }
})
