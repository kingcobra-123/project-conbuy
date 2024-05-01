import React, { Component, useEffect, useState, useRef } from 'react'
import { Text, View } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { doc, getDoc } from 'firebase/firestore'
import { Firebase_db } from '../auth/firebaseconfig'




import ReviewContentHeader from './reviewcontentheader'
import ReviewContentMedia from './reviewcontentmedia'
import ReviewContentDetails from './reviewcontentdetails'
import { ScrollView } from 'react-native-gesture-handler'

const ReviewContentRender = () => {

    const route = useRoute();

    const [loading, setLoading] = useState(true);
    const [listing, setListing] = useState([])
    const [mediadata, setMediaData] = useState([])
    const {id} = route.params || {id: 'Mi5pJNzTnBNLx8nK42mx'};
    const videoRef = useRef(null)

    useEffect(() => {
        const fetchdata = async()=> {
            setLoading(true);
            try {
                const docRef = doc(Firebase_db, "reviews", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const listingdata = {
                        ...docSnap.data()
                    };
                    
                    const media = [];
                    const videos = listingdata.review_video_url || [];
                    const images = listingdata.review_image_url || [];
                    

                    
                        
                    videos.filter(videoUrl => videoUrl.trim() !== "").forEach(videoUrl => {
                        media.push({type: 'video', url: videoUrl});
                    });
    
                    images.forEach(imageUrl => {
                        media.push({type: 'image', url: imageUrl});
                    });
                    setListing(listingdata);
                    setMediaData(media);
                } else {
                    setListing({});
                }
            } catch (error) {
                console.error("Error fetching data", error);
            } finally {
                setLoading(false);
            }
        }
    
        fetchdata();
    
       
        return () => {
            if (videoRef.current) {
                videoRef.current.unloadAsync().catch(e => console.log('Error unloading video:', e));
            }
        };
    }, []);



    return (
        <View>
            <ReviewContentHeader />
            <ScrollView style={{height:700}}>
                <ReviewContentMedia mediaData={mediadata}/>
                <ReviewContentDetails reviewData={listing}/>
            </ScrollView>
        </View>
    )
}

export default ReviewContentRender;
