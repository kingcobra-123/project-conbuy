import React, { Component, useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import UserName from './username'
import { collection, getDocs } from 'firebase/firestore'
import { Firebase_db } from '../auth/firebaseconfig'

// const callUserName = UserName();

const FetchUserData = () => {
    return(
        <View>
            <Text>HelloWorld</Text>
        </View>
    )
};
export default FetchUserData;


// const fetchUserData = () => {
    
//     // console.log(user)
// const fetchUserMetaData = async () => {
//     try {
//         const docs = await getDocs(collection(Firebase_db, "users_test"))
//         const metadata = docs.docs.map(docs => docs.data())
        
//     } catch (error) {
//         console.error("Error fetching data", error);
//     }
// }


// }
// export default fetchUserData;