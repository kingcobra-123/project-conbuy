import React, { Component, useRef, useState, useEffect, useContext } from 'react'
import { Text, View, ScrollView, Image, StyleSheet} from 'react-native'
import { useRoute } from '@react-navigation/native'
import { collection, getDocs } from 'firebase/firestore'
import { Firebase_db } from '../auth/firebaseconfig'
import MasonryList from '@react-native-seoul/masonry-list';
import { userMetadata } from '../userprofile/usermetadata';
import { AntDesign } from '@expo/vector-icons';
import { set } from 'firebase/database'

const SearchReviewsContent = ({proptitle}) => {
    const [title, setTitle] = useState("")
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(true)
    const [reviewUserData, setReviewUserData] = useState([])
    const [currentImageIndex, setCurrentImageIndex] = useState({});
    const [backbutton, setBackButton] = useState(0)
    const [refreshtitle, setRefreshTitle] = useState(null)
    const route = useRoute()
    const userdata_temp = useContext(userMetadata);

    const title_temp = proptitle
    // console.log(title_temp)

    const backButtonHandler = () => {
        setBackButton(backbutton + 1)
    };

    
    useEffect(()=>{
        // console.log(proptitle)

        setRefreshTitle("refreshing")
        
        }, [proptitle])


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
                review_displayName: docs.data().review_username,
                imageHeight: Math.floor(Math.random() * 200 + 150)
                
            })
            )
            if(title === "empty"){setReviews(reviews); fetchReviewUserData(reviews, userdata_temp.userdata)}{
                const filteredReviews = title? reviews.filter((item) =>
                    item.review_sub_category === title &&
                    item.review_title.trim() !== "") : reviews
                ;
                setReviews(filteredReviews);
                fetchReviewUserData(filteredReviews, userdata_temp.userdata);
            
        }} catch(error){
            console.error("Error fetching data", error)
        } finally{
            setLoading(false)
        }}
    fetchdata()}, [title])

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


    const renderPaginationDots = (item) => (
        <View style={styles.dotContainer}>
          {item.review_image_url.map((image, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentImageIndex[item.id] === index
                  ? styles.activeDot
                  : styles.inactiveDot,
              ]}
            />
          ))}
        </View>
      );



const updateIndex = (id, index) => {
    setCurrentImageIndex((prev) => ({
        ...prev,
        [id]: index
    })


    );
};

const handleScroll = (id) => (event) => {
    const index = Math.ceil(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width); 
    updateIndex(id, index);
};



    const renderReview = ({item, index}) => {
        return (
            <View style = {{padding:2}}>
            <ScrollView 
                horizontal 
                onScroll={handleScroll(item.id)}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                style={{
                    width: "100%", 
                    flexGrow: 1, 
                    height: item.imageHeight}}>
                {item.review_image_url.map((image, index) => {
                    return (
                        <Image
                            source={{uri: image}} key={index}
                            style={{ width:200, height: item.imageHeight}} />
                )})}
            </ScrollView>
            <View style={{
                borderBottomWidth:1,
                borderBottomColor:'lightgrey'
            }}>
                {renderPaginationDots(item)}
                <View style={{
                    flexDirection:'row', 
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingRight:10}}>
                        <Text style={{
                            fontSize:10, 
                            paddingLeft:5}}>#ConbuyTestPost</Text>
                         { item.review_buy_or_not_buy ? 
                                <View style={styles.postIcons1}>
                                    <AntDesign name="like1" size={18} color="#F7A70B" style={styles.postIconStyle1}/>
                                </View>:
                                <View style={styles.postIcons1}>
                                    <AntDesign name="dislike1" size={18} color="red" style={styles.postIconStyle1}/>
                                </View>
                            }
                </View>
                <Text style={{
                    fontSize: 14,
                    fontWeight: '600',
                    color: 'black',
                    padding: 5,
                }}>{item.review_title}</Text>
            </View>
            </View>
        )
    };









    return (
        <View style={{flex:1}}>
            <MasonryList
                data={reviewUserData}
                keyExtractor={(item, index)=> index.toString()}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                renderItem={renderReview}
            />
        </View>
    )
}

export default SearchReviewsContent;



const styles = StyleSheet.create({
    postCardContainer:{
        
    },
    dotContainer: {
        bottom: 5, 
        width: '50%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0)',
        marginLeft: 40,
        marginBottom: 5
    },
    dot: {
        height: 3,
        width: 3,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    activeDot: {
        backgroundColor: '#F7A70B',
    },
    inactiveDot: {
        backgroundColor: 'gray',
    }
})
