import React, { Component, useEffect, useState } from 'react'
import { Text, View, StyleSheet, SafeAreaView, Image, FlatList, Touchable, TouchableOpacity } from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { getDocs, collection } from 'firebase/firestore'
import { Firebase_Auth, Firebase_db } from '../auth/firebaseconfig'
import RNPickerSelect from 'react-native-picker-select';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import HomePage from './homepage'
import MyTabs from './bottomtabnavigator'
import DetailedListings from './detailedlistings'

const Listings = ({navigation, route}) =>{
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState([])
    const [selected, setSelected] = useState(null)
    const [dropdown, setDropDown] = useState(false)
    const title = route.params?.title
    console.log("myprint", title)
    useEffect(()=>{
        
        const fetchdata = async() =>{
        try{
            const reviewsnapshot = await getDocs(collection(Firebase_db, "reviews"))
            const reviews = reviewsnapshot.docs.map(docs =>({
                ...docs.data(),
                id: docs.id,
                review_image_url: docs.data().review_image_url||[],
                review_title: docs.data().review_title || "No Title"
            })
            )
            const filteredReviews = title? reviews.filter((item)=>{
               return item.review_sub_category === title

            }): reviews

            
            setReviews(filteredReviews)
        
        }catch(error){
            console.error("Error fetching data", error)
        } finally{
            setLoading(false)
        }


    }
    fetchdata()}, [title])

    const renderReview = ({ item,index }) => {
        const isFirstItem =index===0;
        return(
            
                <TouchableOpacity 
                onPress={()=>onPressReviewHandler(item.id)}
                style={styles.itemcontainer}>
                    <Image source={{ uri: item.review_image_url[0] }} style={styles.imageStyle} />
                    <View style={styles.textBox}>
                        <Text style={styles.titleStyle} numberOfLines={3}>{item.review_title}</Text>
                    </View>
                </TouchableOpacity>
            
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
            {loading ? (
                <Text>Loading...</Text>
            ) : (
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
                            data={reviews}
                            keyExtractor={item => item.id}
                            renderItem={renderReview}
                            numColumns={2} 
                            contentContainerStyle={styles.boxcontainer}
                            columnWrapperStyle ={styles.columnWrapper}
                    />
                    
                </View>
                
            )}
        </View>
    );




}

export default Listings

const styles = StyleSheet.create({
    container:{
        width: '100%',
        alignItems: 'stretch'
        
        
        
    },
    boxcontainer:{
        
        
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
    itemcontainer:{
        width: '100%',
        alignItems: 'center',
        margin: 2,
        flexWrap: 'wrap',
        flexDirection: 'row',
        borderRadius:10,
        overflow: 'hidden',
        flexGrow:1,
        flexShrink:1

    },
    imageStyle: {
        width: 195, 
        height: 200, 
        resizeMode: 'cover',
        borderRadius:10
    },
    titleStyle: {
        lineHeight:20,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        flex:1
  
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
    },
    
    



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
