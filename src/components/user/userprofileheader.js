import React, { Component, useContext, useState } from 'react'
import { Text, View, SafeAreaView, StyleSheet, Image, Touchable } from 'react-native'
import { MaterialIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { userMetadata } from '../userprofile/usermetadata';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign, FontAwesome, Feather } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';


const UserProfileHeader = () => {


    const [dropdown, setDropdown] = useState(false)
    const userProfileData = useContext(userMetadata)
    const userProfilePicture = userProfileData.metadata[0].photoURL
    const userProfileName_temp = userProfileData.metadata[0].displayName
    const userProfileName = userProfileName_temp.charAt(0).toUpperCase() + userProfileName_temp.slice(1)

    const toggleDropdown = () =>{
        setDropdown(!dropdown)
    }

    return (
        <SafeAreaView>
            <View style={styles.header}>
                <Ionicons name="chevron-back" size={24} color="black" />
                <Text style={styles.headerTitle}>Profile</Text>
            </View>
            <View style={styles.headerProfileContainer}>
                    <View style={styles.headerProfile}>
                        <Image source={{uri: userProfilePicture}}
                        style={styles.profilePic}>
                        </Image>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.profileName}>{userProfileName}</Text>
                            <MaterialIcons name="edit" size={14} color="black" 
                            style={{paddingTop:10, paddingLeft:5}}/>
                        </View>
                    </View>
                <View style={styles.profileDetailsContainer}>
                    <View style={styles.profileSpecs}>
                        <Text style={styles.profileSpecsNums}>234</Text>
                        <View style={{flexDirection: 'row'}}>
                            <AntDesign name="eye" size={18} color="black" />
                            <Text style={styles.profileSpecsContext}>Views</Text>
                        </View>
                        
                    </View>
                    <View style={styles.profileSpecs}>
                        <Text style={styles.profileSpecsNums}>234</Text>
                        <View style={{flexDirection: 'row'}}>
                            <AntDesign name="like2" size={18} color="black" />
                            <Text style={styles.profileSpecsContext}>Likes</Text>
                        </View>
                        
                    </View>
                    <View style={styles.profileSpecs}>
                        <Text style={styles.profileSpecsNums}>234</Text>
                        <View style={{flexDirection: 'row'}}>
                            <FontAwesome name="dollar" size={18} color="black" />
                            <Text style={styles.profileSpecsContext}>Rewards</Text>
                        </View>
                        
                    </View>
                </View>
                <TouchableOpacity>
                    <View style={styles.editProfileButton}>
                        <Text style={styles.profileSpecsContext}>Edit Profile</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.headerfilterContainer}>
                <Text style={styles.headerTitle}> Your Reviews</Text>
                {dropdown && (
                    <RNPickerSelect
                        placeholder={{label:'Select a Category', value:'Select a Category'}}
                        onValueChange = {(value)=>setDropDownSelected(value)}
                        items = {[
                            {label:'Sofa & Couch' , value:'Sofa & Couch'},
                            {label:'TVs' , value:'TVs'},
                            {label:'Mattress' , value:'Mattress'},
                            {label:'Others' , value:'Others'}
                        ]}
                        style={pickerSelectStyles}
                    ></RNPickerSelect> 
                )}
                <Feather onPress={toggleDropdown} name="filter" size={22} color="black"
                style={{paddingTop:5}} />
            </View>
        </SafeAreaView>
    )
}

export default UserProfileHeader;

const styles = StyleSheet.create({
    header:{
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems:'center',
        paddingBottom:5,
        paddingRight:170,
        paddingLeft:10,
    },
    headerTitle:{
        fontSize:14,
        fontWeight:'bold'
    },
    headerProfileContainer:{
        height:250,
        width:'100%',
        justifyContent: 'space-between',
        alignItems:'center',
        paddingBottom:5,
        paddingLeft:10,
        borderBottomWidth:1,
        borderBottomColor:'lightgrey'
    },
    profilePic:{
        width:100,
        height:100,
        borderRadius:50,
        borderWidth:1,
        borderColor:'lightgrey'
    },
    headerProfile:{
        justifyContent: 'center',
        alignItems:'center',
        paddingBottom:5,
        // paddingLeft:135,
    },
    profileName:{
        paddingTop:10,
        fontSize:18,
        fontWeight:'bold',
        paddingLeft:17
    },
    profileDetailsContainer:{
        flex:1,
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        paddingBottom:5,
        paddingLeft:10,
        paddingRight:10,
    },
    editProfileButton:{
        backgroundColor:'lightgrey',
        width:100,
        height:30,
        justifyContent: 'center',
        alignItems:'center',
        borderRadius:5
    },
    profileSpecs:{
        paddingRight:10,
        alignItems:'flex-start',
        paddingLeft:40,

    },
    profileSpecsNums:{
        fontSize:18,
        fontWeight:'bold',
        paddingLeft:15
    },
    profileSpecsContext:{
        fontSize:12,
        fontWeight:'bold',
        paddingLeft:5,
        paddingTop:2
    },
    headerfilterContainer:{
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems:'center',
        paddingBottom:5,
        paddingRight:10,
        paddingLeft:10
    },


})

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 14,
        // paddingHorizontal: 10,
        paddingBottom:3,
        paddingTop:3,
        // marginBottom:5,
        // marginLeft:40,
        borderWidth: 0.5,
        borderColor: 'grey',
        borderRadius: 4,
        color: 'grey',
        paddingRight: 30, 
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, 
    },
})