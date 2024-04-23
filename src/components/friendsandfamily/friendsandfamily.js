import react from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import * as ImagePicker from 'expo-image-picker';


const Friends = () => {
    
    const [permission, requestPermission] = ImagePicker.useCameraPermissions();
    if (permission?.status !== ImagePicker.PermissionStatus.GRANTED) {
    return(
        <SafeAreaView style = {styles.container}>
        <View >
           <Text> Permission Not Granted {permission?.status}</Text>
         </View>

         <TouchableOpacity onPress = {() => requestPermission()} >
             <Text>Request Permission</Text>
        </TouchableOpacity>
        </SafeAreaView >
    )
 };
}
export default Friends;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff4b8',

    }
})