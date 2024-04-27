import React, { Component } from 'react'
import { Text, View } from 'react-native'


const firestoreTimestampToDate = (timestamp) => {
    return new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
};

const FormatReviewDate = (timestamp) => {
    if (!timestamp) {
        return '';
    }
    const reviewDate = firestoreTimestampToDate(timestamp);
    const today = new Date();

    if (reviewDate.toDateString() === today.toDateString()) {
        const diffHours = Math.floor((today - reviewDate) / (1000 * 60 * 60));
        return `${diffHours} hours ago`; 
    } else{
        const postDate = reviewDate.toLocaleDateString('en-US', { 
            month: 'long',
            day: 'numeric' 
        })
        return postDate;
    }
    
};

export default FormatReviewDate;
