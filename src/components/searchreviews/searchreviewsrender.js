import React, { Component, useState, useEffect } from 'react'
import { Text, View } from 'react-native'

import SearchReviewsFilters from './searchreviewsfilters'
import SearchReviewsHeader from './searchreviewsheader';
import SearchReviewsContent from './searchreviewscontent';
import { ScrollView } from 'react-native-gesture-handler'

const SearchReviewsRender = () => {

    const [proptitle, setPropTitle] = useState('');

    const updateTitle = (title) => {
        console.log('title', title);
        setPropTitle(title);
    };



    return (
        <ScrollView>
        <><SearchReviewsHeader  updateTitle={updateTitle}/> 
        <SearchReviewsFilters /> 
        <SearchReviewsContent key={proptitle} proptitle={proptitle}/>
        </>
        </ScrollView>
    )
}

export default SearchReviewsRender;