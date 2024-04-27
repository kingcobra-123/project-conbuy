import React, { Component, useState, useEffect, useContext } from 'react'
import { Text, View, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, MaterialCommunityIcons, Feather, Ionicons } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import { TextInput } from 'react-native-paper';
import { collection, getDocs } from 'firebase/firestore';
import { Firebase_db } from '../auth/firebaseconfig';
import DetailedListings from './detailedlistings';
import { userMetadata } from '../userprofile/usermetadata';
import { set } from 'firebase/database';


const ListingsCopy = ({navigation, route}) => {

    const [title, setTitle] = useState(route.params?.title || 'Default Title');
    const [selectedtitle, setSelectedTitle] = useState(false)
    const [dropdown, setDropDown] = useState(false)
    const [selectedcategory, setSelectedCategory] = useState(null)
    const [dropdownselected, setDropDownSelected] = useState(null)
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState([])
    const [reviewuserdata, setReviewUserData] = useState([])
    const userdata_temp = useContext(userMetadata);

    const toggleDropdown = () => {
        setDropDown(!dropdown);
        
    };
    const onPressBackHandler =() =>{
        navigation.navigate('Home')
        setTitle('')
    }
    const onPressReviewHandler =(id)=>{
        navigation.navigate('DetailedListings', {id: id})
    }

    const fetchReviewUserData = (reviews, userdata)=>{
        const reviewusers = reviews.map(item =>({
            ...item,
            reviewUserPhotoURL: userdata.find(
                data => data.displayName === item.review_displayName)?.photoURL || 'default-placeholder-url',
            reviewUserDisplayName: userdata.find(
                    data => data.displayName === item.review_displayName)?.displayName || 'anonymous',
            })
        ); setReviewUserData(reviewusers);

    };
    useEffect(()=>{
        const title = route.params?.title
        setTitle(title)
    }, [route.params?.title])

    useEffect(()=>{
        const fetchdata = async() =>{
        try{
            const reviewsnapshot = await getDocs(collection(Firebase_db, "reviews"))
            const reviews = reviewsnapshot.docs.map(docs =>({
                ...docs.data(),
                id: docs.id,
                review_image_url: docs.data().review_image_url||[],
                review_title: docs.data().review_title || "No Title",
                review_displayName: docs.data().review_username
                
            })
            )
            const filteredReviews = title? reviews.filter((item)=>
               item.review_sub_category === title && 
               item.review_title.trim() !== ""): reviews;
            setReviews(filteredReviews);
            fetchReviewUserData(filteredReviews, userdata_temp.userdata)
        }catch(error){
            console.error("Error fetching data", error)
        } finally{
            setLoading(false)
        }}
    fetchdata()}, [title])


    const renderHeader = () => (
        <>
         <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Ionicons name="chevron-back" size={24} color="black" 
                    onPress={onPressBackHandler}/>
                    <Text style={styles.headerTitle}
                    onPress={onPressBackHandler}> Home</Text>
                </View >
                <View style={styles.headerMiddle}>
                    <Text style={styles.headerTitle}>Reviews</Text>
                </View>
                <View style = {styles.headerpicker}>
                <Feather onPress={toggleDropdown} name="filter" size={24} color="black" />
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
                    
                </View>
            </View>
            <View style={styles.searchBarContainer}>
                <TextInput 
                style={styles.searchBar}
                placeholder='Search Reviews.....'
                autoCapitalize='none'></TextInput>
            </View>
        </>
    );


    const renderReview = ({ item,index }) => {
        const isFirstItem =index % 2 === 0;
        return(

           
            
                <TouchableOpacity 
                onPress={()=>onPressReviewHandler(item.id)}
                style={isFirstItem?styles.postContainer1: styles.postContainer}>
                        <View style={styles.postContainer}>
                            <Image source={{ uri: item.review_image_url[0] }} style={styles.postImageStyle} />
                            <View style={styles.postTextBox}>
                                <Text style={styles.postTitleStyle} numberOfLines={2}>{item.review_title}</Text>
                                <View style={styles.postUserDetails}>
                                    <Image source={{uri: item.reviewUserPhotoURL}} style={styles.userPicStyle}></Image>
                                    <Text style={styles.postUserTitleStyle} numberOfLines={1}>{item.reviewUserDisplayName}</Text>
                                </View>
                            </View>
                        </View>
                    
                    
                </TouchableOpacity>
            
        );
                    
                
        
    };

    return (
        <SafeAreaView>
            <FlatList
                ListHeaderComponent={renderHeader}
                data={reviewuserdata}
                keyExtractor={item => item.id}
                renderItem={renderReview}
                numColumns={2} 
                contentContainerStyle={styles.flatListcontainer}
                columnWrapperStyle ={styles.columnWrapper}
            ></FlatList>
        </SafeAreaView>
    )
}

export default ListingsCopy;


const styles = StyleSheet.create({
    header:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingBottom:5,
        paddingRight:10,
        borderBottomWidth:1,
        borderBottomColor:'lightgrey'
    },
    headerLeft:{
        flexDirection:'row',
        alignItems:'center',
        paddingRight:60
    },
    headerMiddle:{
        alignItems:'center',
        paddingLeft:20
    },
    headerpicker:{
        width:150,
        flexDirection:'row-reverse',
        borderColor:'grey',
        borderRadius:5,
        alignItems:'center',
        justifyContent:  'space-between'
    },
    headerTitle:{
        fontSize:14,
        fontWeight:'bold'
    },
    searchBarContainer:{
        flexDirection: 'row',  
        alignItems: 'center',  
        justifyContent: 'space-between',  
        paddingHorizontal: 10,  
        width: '100%',
        borderBottomWidth:1,
        borderBottomColor:'lightgrey'
    },
    searchBar: {
        flex: 1,  
        height: 35,
        borderColor: 'grey',
        borderWidth: 0.7,
        paddingLeft: 5,  
        borderRadius: 20,
        backgroundColor: '#ffff',
        marginRight:5
      },
      columnWrapper: {
        justifyContent: 'space-between', 
    },
    postContainer:{
        width: '100%',
        height: 360,
        alignItems: 'center',
        flexWrap: 'wrap',
        flexDirection: 'row',
        overflow: 'hidden',
        flexGrow:1,
        flexShrink:1,
        paddingTop:5

    },
    postContainer1:{
        width: '100%',
        height: 370,
        alignItems: 'center',
        flexWrap: 'wrap',
        flexDirection: 'row',
        overflow: 'hidden',
        flexGrow:1,
        flexShrink:1,
        paddingTop:5,
        marginTop:7

    },
    postImageStyle: {
        width: 195, 
        height: 270, 
        resizeMode: 'cover'
    },
    postImageStyle1: {
        width: 195, 
        height: 290, 
        resizeMode: 'cover'
    },
    postTextBox: {
        width: '100%', 
        height: 80,
        paddingTop:5,
        paddingLeft:5,
    },
    postTextBox1: {
        width: '100%', 
        height: 80,
        paddingTop:5,
        paddingLeft:5,
    },
    postTitleStyle: {
        fontSize: 14,
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: '500',
    },
    userPicStyle:{
        width: 30,
        height: 30,
        borderRadius: 20
    },
    postUserDetails:{
        flexDirection:'row',
        paddingTop:5
    },
    postUserTitleStyle: {
        fontSize: 14,
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: '500',
        paddingTop:5,
        paddingLeft:5
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
        color: 'grey' 
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
