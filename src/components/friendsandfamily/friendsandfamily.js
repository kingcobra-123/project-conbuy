import react from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, {Rect } from "react-native-svg";
import ProgressBar from "../Createpage/progressbar";
import Uploading from "../Createpage/uploading";
import { SafeAreaView } from "react-native-safe-area-context";


const Friends = () => {

    return(
        <SafeAreaView style = {styles.container}>
        <View >
           {/* <Uploading /> */}
         </View>
        </SafeAreaView >
    )
 };

export default Friends;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff4b8',

    }
})