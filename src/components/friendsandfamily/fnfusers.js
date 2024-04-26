import React, { Component, useEffect, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Firebase_Auth, Firebase_db } from '../auth/firebaseconfig';
import { getDocs, collection, where, query } from 'firebase/firestore';
import firebase from 'firebase/compat/app';
import UserName from '../userprofile/username';

const FetchFnF = () => {
    const [fnfusers, setFnfUsers] = useState([])
    const [fnfposts, setFnfPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const user = UserName();

useEffect(() => {
    const fetchFnFData = async () => {
        const fetchFnFPosts = async (userlist) => {
            setLoading(true);
            try {
                const q = query(collection(Firebase_db, "reviews"), where("review_username", "in", userlist))
                const querySnapshot = await getDocs(q)
                const fnfreviews = querySnapshot.docs.map(docs => ({
                ...docs.data(),
                id: docs.id,
                review_image_url: docs.data().review_image_url||[],
                review_title: docs.data().review_title || "No Title"}))
                setLoading(false)
                setFnfPosts(fnfreviews)
            }catch (error) {
                console.error("Error fetching data", error);
                setLoading(false)
            }}
            try {
                const fnfdata = await getDocs(collection(Firebase_db, "family_and_friends"))
                const fnflist = fnfdata.docs.map(docs => docs.data())
                const fnfconnectedusers = fnflist.filter((item) => {
                    return item.fnf_main_user === user
                })
                if(fnfconnectedusers.length>0){
                    const userlist = fnfconnectedusers.map(item => 
                        item.fnf_connected_user
                    ); 
                    setFnfUsers(userlist);
                    fetchFnFPosts(userlist)
                } else{setLoading(false)}
            } catch (error) {
                console.error("Error fetching data", error);
                setLoading(false)
            }
    };
    if(user){
        fetchFnFData()
    };
}, [user]);

return ({fnfusers, fnfposts, loading})


}

export default FetchFnF;