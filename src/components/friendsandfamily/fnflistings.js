import React, { Component, useEffect, useState } from 'react'
import { Text, View, StyleSheet, SafeAreaView, Image, FlatList, Touchable, TouchableOpacity,
            ScrollView, TextInput } from 'react-native'
import { getDocs, collection } from 'firebase/firestore'
import { Firebase_Auth, Firebase_db } from '../auth/firebaseconfig'
import RNPickerSelect from 'react-native-picker-select';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import HomePage from '../Homepage/homepage'
import MyTabs from '../Homepage/bottomtabnavigator'
import DetailedListings from '../Homepage/detailedlistings'
import MasonryList from '@react-native-seoul/masonry-list';
import FetchFnF from './fnfusers';
import { FontAwesome5 } from '@expo/vector-icons';



const FnFListingsrender = ({navigation}) =>{
    const {fnfusers, fnfposts} = FetchFnF()
    const [reviews, setReviews] = useState([])
    const [selected, setSelected] = useState(null)
    const [dropdown, setDropDown] = useState(false)
    

    const renderReview = ({ item,index }) => {
        const isFirstItem =index===0;
        return(
            <View style={styles.postContainer}>
                <View style={styles.imageContainer}>
                    <FontAwesome5 name="user-circle" size={24} color="black" />
                    <Text style={styles.titleStyle1}>{item.review_username}</Text>
                </View>
                <TouchableOpacity 
                onPress={()=>onPressReviewHandler(item.id)}
                style={styles.itemcontainer}>
                    <View style={styles.itemcontainer}>
                        <Image source={{ uri: item.review_image_url[0] }} style={styles.imageStyle} />
                        <View style={styles.textBox}>
                            <Text style={styles.titleStyle} numberOfLines={3}>{item.review_title}</Text>
                            <Text style={styles.titleStylecomments} numberOfLines={1}>View Comments</Text>
                        </View>
                        <View style={styles.commentContainer}>
                                <FontAwesome5 name="comment-alt" size={23} color="black"
                                style={styles.iconContainer} />
                                <TextInput
                                    style={styles.inputcomment}
                                    placeholder=' Add a comment'
                                    autoCapitalize='none'
                                ></TextInput>
                        </View>
                    </View>
                </TouchableOpacity>
             </View>
            
        );
                    
                
        
    };
    
    const onPressBackHandler =() =>{
        navigation.navigate('Home')
    }

    const toggleDropdown = () =>{
        setDropDown(!dropdown)
    }
    const onPressReviewHandler =(id)=>{
        navigation.navigate('DetailedListings', {id: id})
    }

    

    return (
        <View style={styles.container}>
            <View style={styles.searchbar}>
                <View style={styles.iconContainer}>
                <AntDesign onPress={onPressBackHandler} name="arrowleft" size={24} color="black" />
                </View>
                <TextInput
                    style={styles.input}
                    placeholder='Search listing'
                    autoCapitalize='none'
                />
                
                <View style={styles.iconContainer}>
                <Feather onPress={toggleDropdown} name="filter" size={24} color="black" />
                </View>
            </View>
                <View>
                    <View style={styles.dropdown}>
                        {dropdown && (
                        <RNPickerSelect
                        onValueChange = {(value)=>setSelected(value)}
                        items = {[
                            {label:'Sofa & Couch' , value:'Sofa & Couch'},
                            {label:'TVs' , value:'TVs'},
                            {label:'Mattress' , value:'Mattress'},
                            {label:'Others' , value:'Others'}
                        ]}
                        style={pickerSelectStyles}
                        ></RNPickerSelect> 
                         )}
                    </View>
                    <FlatList
                            data={fnfposts}
                            keyExtractor={item => item.id}
                            renderItem={renderReview}
                            numColumns={1} 
                            contentContainerStyle={styles.boxcontainer}
                            // columnWrapperStyle ={styles.columnWrapper}
                    ></FlatList>   
                </View>
                 </View>
                 )}

export default FnFListingsrender;

const styles = StyleSheet.create({
    container:{
        width: '100%',
        alignItems: 'stretch'
        
    },
    boxcontainer:{
        width: '100%',
        backgroundColor: '#ffff',
        
        
    },
    input: {
        
        flex: 1,  
        height: 40,
        borderColor: '#F7A70B',
        borderWidth: 2,
        paddingLeft: 5,  
        borderRadius: 4,
        backgroundColor: '#ffff',
        marginRight:5
      },
      inputcomment:{
        flex: 1,  
        marginRight:70,
        height: 35,
        borderColor: '#F7A70B',
        borderWidth: 1,
        marginLeft:5,
        borderRadius: 4,
        placeholderTextColor: '#800',
        borderRadius:20
      },
    itemcontainer:{
        width: '100%',
        alignItems: 'center',
        // flexWrap: 'wrap',
        // // flexDirection: 'row',
        // overflow: 'hidden',
        flexGrow:1,
        flexShrink:1

    },
    imageStyle: {
        width: '100%', 
        height: 250, 
        resizeMode: 'cover'
    },
    titleStyle: {
        lineHeight:20,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        flex:1,
        paddingLeft:5,
        fontWeight: '600'
  
    },
    titleStylecomments: {
        fontSize:12,
        flex:1,
        paddingLeft:5,
        paddingBottom:7
  
    },
    
    titleStyle1: {
        lineHeight:20,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        flex:1,
        paddingLeft:5
  
    },
    textBox: {
        width: '100%',  
        backgroundColor: '#ffffff',  
        height: 50,
    },
    columnWrapper: {
        justifyContent: 'space-between', 
    },
    dropdown:{
        width:'50%'
    },
    searchbar:{
        flexDirection: 'row',  
        alignItems: 'center',  
        justifyContent: 'space-between',  
        paddingHorizontal: 10,  
        width: '100%', 
        paddingTop:50
    },
    iconContainer: {
        flexDirection: 'row',
        width: 30,  
        justifyContent: 'space-between', 
        paddingLeft:5,
        paddingTop:5
    },
    imageContainer:{
        width: '100%',
        height:30,
        flexDirection: 'row',
        margin:3,
        paddingTop:5,

    
    },
    postContainer:{
        width: '100%',
        height: 380,
        // overflow: 'hidden',
        // flexGrow:1,
        // flexShrink:1
    
    },
    commentContainer:{
        height: 40,
        flexDirection: 'row',
    }
    
})

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 14,
        paddingVertical: 12,
        paddingHorizontal: 10,
        paddingBottom:5,
        marginBottom:5,
        marginLeft:40,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
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
});
