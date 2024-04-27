import React, { Component, useEffect, useState, useContext } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Firebase_Auth, Firebase_db } from '../auth/firebaseconfig';
import { getDocs, collection, where, query } from 'firebase/firestore';
import firebase from 'firebase/compat/app';
import UserName from '../userprofile/username';
import { userMetadata } from '../userprofile/usermetadata';
import { set } from 'firebase/database';

const FetchFnF = () => {
    const [fnfusers, setFnfUsers] = useState([])
    const [fnfusersimage, setFnfUsersImage] = useState([])
    const [fnfposts, setFnfPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const user = UserName();
    const userdata_temp = useContext(userMetadata);

    const fetchfnfuserdata = (userlist, userdata) => {
            const fnfusers = userlist.map(item =>{
                return userdata.filter(data => data.displayName === item)
                 
            })
            const fnfusers2 = fnfusers.map(item =>({
                displayName: item[0].displayName,
                photoURL: item[0].photoURL
            }))
            setFnfUsersImage(fnfusers2)}
            

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
                review_title: docs.data().review_title || "No Title",
                review_buy_or_not_buy: docs.data().review_buy_or_not_buy,
                reviews_created_at: docs.data().reviews_created_at || ''}))
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
                    fetchfnfuserdata(userlist, userdata_temp.userdata)
                    
                    fetchFnFPosts(userlist)
                } else{setLoading(false)}
            } catch (error) {
                console.error("Error fetching data", error);
                setLoading(false)
            }
    };
    if(user){
        fetchFnFData();
    };
}, [user]);

return ({fnfusers, fnfposts, fnfusersimage, loading})


}

export default FetchFnF;