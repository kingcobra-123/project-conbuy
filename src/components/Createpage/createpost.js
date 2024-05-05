// import React, { Component, useContext } from 'react'
// import { Text, View } from 'react-native'
// import { SafeAreaView } from 'react-native-safe-area-context'
// import { doc, setDoc } from "firebase/firestore";
// import { Firebase_db } from '../auth/firebaseconfig';
// import { userContext } from '../userprofile/userprofile';
// import UserName from '../userprofile/username';
// import { v4 as uuidv4 } from 'uuid';
// import 'react-native-get-random-values';



// const CreatePost = async ({
//     reviewTitle = '',
//     reviewDescription = '',
//     reviewPurchaseUrl = '',
//     reviewPrice = '',
//     reviewPurchaseDate = '',
//     reviewSubCategory = '',
//     reviewCategory = '',
//     reviewBuyOrNotBuy,
//     reviewImage,
//     // video,
//     userName,
//     postID = uuidv4()
// }) => {
 
    
// try {
//     console.log(postID);
//     await setDoc(doc(Firebase_db, "apptest-reviews", postID), {
//         Title: reviewTitle,
//         Description: reviewDescription,
//         purchaseUrl: reviewPurchaseUrl,
//         Price: reviewPrice,
//         Date: P,
//         Image: reviewImage,
//         reviewCategory: reviewCategory,
//         reviewSubCategory: reviewSubCategory,
//         reviewuyornotbuy: reviewBuyOrNotBuy,

        
//     });
//     return { success: true, message: "Post created successfully!" }
//     } catch (error) {
//         return { success: false, message: "Failed to create post." + error, error: error,};
//         console.log("Error creating post", error);
        
//     }
        
 
    
//  }

// export default CreatePost;
