import React, { Component, useEffect, useRef, useState, useContext } from 'react'
import { Text, View, StyleSheet, SafeAreaView, Image, FlatList, Touchable, TouchableOpacity,
            ScrollView, TextInput } from 'react-native'

import RNPickerSelect from 'react-native-picker-select';
import { Feather, AntDesign, FontAwesome5, MaterialIcons, MaterialCommunityIcons,
        Ionicons } from '@expo/vector-icons';
import HomePage from '../Homepage/homepage'
import MyTabs from '../Homepage/bottomtabnavigator'
import Listings from '../Homepage/listings';
import DetailedListings from '../Homepage/detailedlistings'
import MasonryList from '@react-native-seoul/masonry-list';
import FetchFnF from './fnfusers';
import FormatReviewDate from './fetchDate';
import {Picker} from '@react-native-picker/picker';
import fetchUserData from '../userprofile/userdata';
import { userMetadata } from '../userprofile/usermetadata';

const FnFlistingsRender = ({navigation}) => {
    const {fnfusers, fnfposts, fnfusersimage} = FetchFnF()
    const [dropdown, setDropDown] = useState(false)
    const [dropdownselected, setDropDownSelected] = useState(null)
    const [formatdate, setFormatDate] = useState([])
    const inputRef = useRef(null)
    const userdata_temp = useContext(userMetadata);

    const toggleDropdown = () =>{
        setDropDown(!dropdown)
    }

    useEffect(()=>{
        if(fnfposts.length > 0){
            const dates = fnfposts.map(post => {
                return{
                ...post,
                formattedDate: FormatReviewDate(post.reviews_created_at),
                profilepic: (fnfusersimage.find(
                    item => item.displayName === post.review_username) || {}).photoURL
        }}); setFormatDate(dates)
                
            };
            // setFormatDate(dates);
    },[fnfposts])

    const onPressReviewHandler =(id)=>{
        navigation.navigate('DetailedListings', {id: id})
    }

    const renderHeader = () => (
        <>
            <View style={styles.header}>
                <MaterialIcons name="post-add" size={24} color="black" />
                <Text style={styles.headerTitle}>Friends & Family</Text>
                <MaterialCommunityIcons name="message-text-outline" size={22} color="black" />
            </View>
            <View style={styles.stories}>
                <Text>Stories</Text>
            </View>
            <View style={styles.header}>
                <Text style={styles.headerTitle}> Popular Reviews</Text>
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
                <Feather onPress={toggleDropdown} name="filter" size={24} color="black" />
            </View>
        </>
    );

    ;

    
    const renderReview = ({ item,index }) => {
        return(
            <View>
                <View style={styles.postHeader}>
                    <Image source={{uri: item.profilepic}} style={styles.userPicStyle}></Image>
                    <Text style={styles.postHeaderTitle}>{item.review_username}</Text>
                    <MaterialCommunityIcons name="dots-horizontal" size={24} color="black" />
                </View>
                <View style={styles.postcontainer}>
                    <Image source={{ uri: item.review_image_url[0] }} style={styles.postimageStyle} />
                        <View style={styles.postIconsContainer}>
                            <FontAwesome5 name="heart" size={24} color="black" style={styles.postIconStyle}/>
                            <FontAwesome5 name="comments" size={24} color="black" style={styles.postIconStyle} />
                            <Ionicons name="share" size={24} color="black"style={styles.postIconStyle}/>
                            { item.review_buy_or_not_buy ? 
                                <View style={styles.postIcons1}>
                                    <AntDesign name="like1" size={28} color="#F7A70B" style={styles.postIconStyle1}/>
                                </View>:
                                <View style={styles.postIcons1}>
                                    <AntDesign name="dislike1" size={28} color="red" style={styles.postIconStyle1}/>
                                </View>
                            }
                        </View>
                        <TouchableOpacity onPress={()=> onPressReviewHandler(item.id)}>
                            <View style={styles.postTextBox}>
                                <Text style={styles.postTitleStyle} numberOfLines={3}>{item.review_title}</Text>
                                <Text style={styles.postDescStyle} numberOfLines={2}>{item.review_content}</Text>
                                <Text style={styles.postTitleStylecomments} numberOfLines={1}>View Comments</Text>
                                <Text style={styles.postTitleStylecomments}>{item.formattedDate}</Text>
                            </View>
                        </TouchableOpacity>
                </View>
                
            </View>
        )
    };
    
    return (
        <SafeAreaView>
                <FlatList
                    ListHeaderComponent={renderHeader}
                    data={formatdate}
                    keyExtractor={item => item.id}
                    renderItem={renderReview}
                    numColumns={1} 
                    contentContainerStyle={styles.boxcontainer}
                ></FlatList> 
        </SafeAreaView>
    )};
    


export default FnFlistingsRender;

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
        fontWeight:'bold'
    },
    stories:{
        height:80,
        flexDirection:'row',
        padding:10,
        borderBottomWidth:1,
        borderBottomColor:'lightgrey'
    },
    // boxcontainer:{
    //     width: '100%'
    // },
    postHeader:{
        flexDirection:'row',
        padding:10,
        paddingRight:20,
        justifyContent:'space-between',
    },
    postHeaderTitle:{
        fontSize:14,
        paddingLeft:5,
        paddingTop:3,
        paddingRight:285
    },
    userPicStyle:{
        width: 30,
        height: 30,
        borderRadius: 20,
        borderWidth: 5,
    },
    postcontainer:{
        width: '100%',
        alignItems: 'center',
        flexGrow:1,
        flexShrink:1

    },
    postimageStyle: {
        width: '100%', 
        height: 250, 
        resizeMode: 'cover'
    },
    postTitleStyle: {
        lineHeight:20,
        fontWeight: '600',
        paddingLeft:7
    },
    postDescStyle: {
        paddingLeft:7,
        paddingBottom:5
    },
    postTitleStylecomments: {
        fontSize:12,
        paddingLeft:7,
        paddingBottom:7
  
    },
    postTextBox: {
        width: '100%',  
        height: 100,
        marginBottom:5
    },
    postIconsContainer: {
        flexDirection: 'row',
        width: '100%', 
        height:40
    },
    postIconStyle:{
        paddingLeft:10,
        paddingTop:5,
        paddingRight:10,
        paddingBottom:5
    },
    postIcons1:{
        paddingLeft:200,
    },
    postIconStyle1:{
        paddingLeft:10,
        paddingTop:5,
        paddingRight:5,
        paddingBottom:5
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

