import react from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from "react-native";
import { BlurView } from "expo-blur";
import ProgressBar from "./progressbar";
import { VibrancyView } from "@react-native-community/blur";
import { resizeMode } from "deprecated-react-native-prop-types/DeprecatedImagePropType";
import { Video } from "expo-av";
import { SafeAreaView } from "react-native-safe-area-context";


const Uploading = ({progress }) => {

    return(
        <Modal  
        transparent animationType="fade">
            <View  style ={styles.container}>
                <BlurView 
                intensity = {80}
                style = {[StyleSheet.absoluteFill ]}
                ></BlurView>
                <View
                style = {styles.blurContainer}
                >
                        <Text style={{fontSize:12}}>Uploading...</Text>
                        <ProgressBar progress={progress} />
                       <View style = {styles.separator}></View>
                        <TouchableOpacity>
                            <Text style={{fontWeight:'400', color: '#F7A70B'}}>Cancel</Text>
                        </TouchableOpacity>
                    

                </View>
            </View>
        </Modal>
     
          
    )
};

export default Uploading;

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
    height:100,
    backgroundColor:  '#E0E3E7',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    borderRadius: 12,
     rowGap:15

   }
})