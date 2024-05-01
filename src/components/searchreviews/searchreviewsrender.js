import React, { Component, useState, useEffect, useContext } from 'react'
import { Text, View } from 'react-native'
import { collection, getDocs } from 'firebase/firestore'
import { Firebase_db } from '../auth/firebaseconfig'
import { useRoute } from '@react-navigation/native'
import { userMetadata } from '../userprofile/usermetadata'

import SearchReviewsFilters from './searchreviewsfilters'
import SearchReviewsHeader from './searchreviewsheader';
import SearchReviewsContent from './searchreviewscontent'

import { ScrollView } from 'react-native-gesture-handler'
import { set } from 'firebase/database'

const SearchReviewsRender = () => {

    const route = useRoute();

    const [proptitle, setPropTitle] = useState('');
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reviewUserData, setReviewUserData] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState({});
    const [filters, setFilters] = useState('');
    const userdata_temp = useContext(userMetadata);



    const updateTitle = (title) => {
        setPropTitle(title);
    };

    const updateFilters = (item) => {
        setFilters(item);
    };

    useEffect(()=>{

        if(filters){
            const filteredReviews = reviews.filter((item) =>{
                return item.review_category === filters})
                setReviewUserData(filteredReviews)
        } else {
            setReviewUserData(reviews)
        }
        
    }, [filters])


    useEffect(()=>{
        const title = route.params?.title
                setPropTitle(title)

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
                review_category: docs.data().review_category,
                review_sub_category: docs.data().review_sub_category,
                review_displayName: docs.data().review_username,
                imageHeight: Math.floor(Math.random() * 200 + 150)
                
            })
            )
            
                const filteredReviews = proptitle? reviews.filter((item) =>
                    item.review_sub_category === proptitle &&
                    item.review_title.trim() !== "") : reviews
                ;
                setReviews(filteredReviews);
                fetchReviewUserData(filteredReviews, userdata_temp.userdata);
            
        } catch(error){
            console.error("Error fetching data", error)
        } finally{
            setLoading(false)
        }}
    fetchdata()}, [proptitle])



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

    



    return (
        <ScrollView>
        <><SearchReviewsHeader  updateTitle={updateTitle}/> 
        <SearchReviewsFilters updateFilter = {updateFilters}/> 
        <SearchReviewsContent data = {reviewUserData}/>
        </>
        </ScrollView>
    )
}

export default SearchReviewsRender;