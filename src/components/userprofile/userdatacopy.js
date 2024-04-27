import React, { Component, useContext, useEffect, useState } from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import { Octicons } from '@expo/vector-icons';
import { collection, getDocs } from 'firebase/firestore'
import { Firebase_db } from '../auth/firebaseconfig'
import UserName from './username';
import { userMetadata } from './usermetadata';
import { set } from 'firebase/database';

const FetchUserData = () => {
    const [abfnfusers, setAbFnfUsers] = useState([])
    const username = UserName();
    const user = username.toLowerCase();
    const userdata_temp = useContext(userMetadata);
    const fnfusers= userdata_temp.userdata.filter(data => data.displayName === user)
    const userDisplayPicture = userdata_temp.metadata
    const userlist = ["test1", "test2"]
    const fnfusers1 = userlist.map(item =>{
        return userdata_temp.userdata.filter(data => data.displayName === item)
    })

    useEffect(()=>{
        const fetchfnfuserdata = (userlist, userdata) => {
            const fnfusers = userlist.map(item =>{
                return userdata.filter(data => data.displayName === item)
                 
            })
            const fnfusers2 = fnfusers.map(item =>({
                displayName: item[0].displayName,
                photoURL: item[0].photoURL
            }))
            // setAbFnfUsers(fnfusers2)
            // console.log(abfnfusers)
        }; fetchfnfuserdata(userlist, userdata_temp.userdata)
    }, [])



   
    


    return(
        <SafeAreaView>
            {/* {fetchfnfuserdata(userlist, userdata_temp.userdata)} */}
            <Text>HelloWorld</Text>
            <Octicons name="three-bars" size={20} color="black" 
            />

        </SafeAreaView>
    )
};

export default FetchUserData


// onPress={()=>{fetchUserData()}}
