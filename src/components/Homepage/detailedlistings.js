// import React, { Component , useState, useEffect, useRef} from 'react'
// import { Text, View, StyleSheet, Image, FlatList, Dimensions } from 'react-native'
// import { Firebase_db, Firebase_Auth } from '../auth/firebaseconfig';
// import { doc,getDocs, collection, where, getDoc } from 'firebase/firestore'
// import { ScrollView } from 'react-native-gesture-handler';
// import Carousel from 'react-native-snap-carousel';
// import { FontAwesome6 } from '@expo/vector-icons';
// import { Video } from 'expo-av';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import SearchReviewsContent from '../searchreviews/searchreviewscontent';


// const {width} =Dimensions.get('window')

// const DetailedListings = ({navigation, route})=>{

//     const [loading, setLoading] = useState(true);
//     const [listing, setListing] = useState([])
//     const [mediadata, setMediaData] = useState([])
//     const {id} = route.params || {id: '1CZsFbLskRGZJ99Bqtrv'};
//     const videoRef = useRef(null)

//     useEffect(() => {
//         async function fetchdata() {
//             setLoading(true);
//             try {
//                 const docRef = doc(Firebase_db, "reviews", id);
//                 const docSnap = await getDoc(docRef);
//                 if (docSnap.exists()) {
//                     const listingdata = {
//                         ...docSnap.data(),
//                         id: docSnap.id
//                     };
//                     setListing(listingdata);
//                     const media = [];
//                     const videos = listingdata.review_video_url || [];
//                     const images = listingdata.review_image_url || [];

//                     if(videos.length > 1){
//                     videos.forEach(videoUrl => {
//                         media.push({type: 'video', url: videoUrl});
//                     })};
    
//                     images.forEach(imageUrl => {
//                         media.push({type: 'image', url: imageUrl});
//                     });
    
//                     setMediaData(media);
//                 } else {
//                     setListing({});
//                 }
//             } catch (error) {
//                 console.error("Error fetching data", error);
//             } finally {
//                 setLoading(false);
//             }
//         }
    
//         fetchdata();
    
       
//         return () => {
//             if (videoRef.current) {
//                 videoRef.current.unloadAsync().catch(e => console.log('Error unloading video:', e));
//             }
//         };
//     }, [id]);
    

//     const renderReview = ({item}) => {
//         if(item.type === 'video'){
//             return(
//                 <SafeAreaView>
//                 <Video
//                     ref={videoRef}
//                     source={{uri: item.url}}
//                     rate={1.0}
//                     volume={1.0}
//                     isMuted={false}
//                     resizeMode="contain"
//                     shouldPlay ={false}
//                     isLooping ={false}
//                     useNativeControls={true}
//                     style={styles.videoStyle}
//                 ></Video>
//                 </SafeAreaView>
//             )} else{
//                 return(
//                     <SafeAreaView>
//                     <Image source={{ uri: item.url }} style={styles.imageStyle} />
//                     </SafeAreaView>
//                 )
//             }
//         };
    
//     const firestoreTimestampToDate = (timestamp) => {
//             return new Date(timestamp.seconds * 1000); 
//         };
    
        
//     const formattedDate = listing.reviews_created_at ? firestoreTimestampToDate(listing.reviews_created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';
//     const handlePlaybackStatus = (status) => {
        
//         if (!status.isPlaying) {
//             videoRef.current.pauseAsync().then(() => {
                
//             }).catch(err => {
//                 console.error("Error pausing video", err);
//             });
//         }
//     };
    
//     return (
            
//             <ScrollView style={styles.container}>
//                 <>
//                 <Carousel
//                 data={mediadata}
//                 renderItem={renderReview}
//                 sliderWidth={width}
//                 itemWidth={width}
//                 layout={"default"}
//                 activeSlideAlignment={'center'}
//                 inactiveSlideOpacity={0.5}
//                 inactiveSlideScale={0.9}
//                 enableMomentum={false}
//                 isLooping={false}
//                 autoplay={true}
//                 autoplayDelay={300}
//                 autoplayInterval={2000}
//                 useNativeControls = {true}
//                 onPlaybackStatusUpdate = {handlePlaybackStatus}
//                 paginationProps={{
//                     dotStyle: {
//                         width: 10,
//                         height: 10,
//                         borderRadius: 5,
//                         marginHorizontal: 8,
//                         backgroundColor: 'rgba(255, 255, 255, 0.92)'
//                     },
//                     inactiveDotStyle: {
//                         // Define styles for inactive dots here
//                         backgroundColor: 'rgba(255, 255, 255, 0.5)'
//                     },
//                     inactiveDotOpacity: 0.4,
//                     inactiveDotScale: 0.6
//                 }}
//             />
//                 <View style={styles.textContainer}>
//                     <Text style={styles.title}>{listing.review_title}</Text>
//                     <Text style= {styles.date}>{`Posted on ${formattedDate}`}</Text>
//                     <Text style={styles.detailsheader}>Details</Text>
//                     <Text style={styles.reviewcontent}>{listing.review_content}</Text>
//                     <View style={styles.commentheader}>
//                         <View style={styles.header}>
//                         <FontAwesome6 name="heart" size={24} color="black" />
//                         <Text style={styles.reviewcontent}>  3 likes</Text>
//                         </View>
//                         <View style={styles.header}>
//                         <FontAwesome6 name="comment" size={24} color="black" />
//                         <Text style={styles.reviewcontent}>  5 comments</Text>
//                         </View>
                    
//                     </View>
//                 </View>
//                 </>
                
//             </ScrollView>
            
//         );}

// export default DetailedListings;

// const styles = StyleSheet.create({
//     container:{
//         flex:1,
//     },
//     imageStyle: {
//         width: width, 
//         height:600, 
//         resizeMode: 'cover',
//         marginRight:5
//     },
    
//     title:{
//         fontSize: 24,
//         fontWeight: '400',
//         paddingTop:10,
//         paddingLeft: 5
//     },
//     date:{
//        fontSize:12,
//        fontStyle: 'italic',
//        paddingTop:5,
//        paddingLeft: 5
//     },
//     detailsheader:{
//         fontSize: 18,
//         fontWeight:'600',
//         paddingTop:5,
//         paddingBottom:10,
//         textDecorationLine: 'underline',
//         paddingLeft: 5
        
//     },
//     reviewcontent:{
//         fontSize: 14,
//         fontWeight:'400',
//         justifyContent: 'space-evenly',
//         paddingTop:2,
//         paddingLeft: 5
//     },
//     header:{
//         flexWrap: 'wrap',
//         flexDirection: 'row',
//         paddingBottom:12,
//         marginLeft:20,
//         marginRight: 10
//     },
//     commentheader:{
//         flexWrap: 'wrap',
//         flexDirection: 'row',
//         paddingBottom:12,
//         paddingTop:10

//     },
//     videoStyle: {
//         width: width, 
//         height: 600, 
        
//     }




// })
