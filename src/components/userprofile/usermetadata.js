import React, { createContext, Component, useEffect, useState} from 'react'
import { Text, View } from 'react-native'
import { collection, getDocs } from 'firebase/firestore'
import { Firebase_db } from '../auth/firebaseconfig'
import UserName from './username';
import { set } from 'firebase/database';

export const userMetadata = React.createContext({metadata: [], userdata: []});

const UserMetaDataProvider = ({children}) => {
    const[metadata, setMetaData] = useState([]);
    const[userdata, setUserData] = useState([]); 
    const username = UserName();
    const user = username.toLowerCase();
    
    
    

    useEffect(()=>{
        const fetchUserMetaData = async () => {
            try {
                const docs = await getDocs(collection(Firebase_db, "users_test"))
                const userdocs = docs.docs.map(docs => docs.data())
                const userMetadata = userdocs.filter(data => data.displayName === user)
                setMetaData(userMetadata)
                setUserData(userdocs)
                
            } catch (error) {
                console.error("Error fetching data", error);
            }
        }; fetchUserMetaData();
    }, [user]);

const contextValue = {metadata, userdata}


return (
        <userMetadata.Provider value={contextValue}>
            {children}
        </userMetadata.Provider>
    )
};

export default UserMetaDataProvider;

