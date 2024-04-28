import React, { Component, createContext, useState, useEffect } from 'react'
import { Text, View } from 'react-native'
import UserName from '../components/userprofile/username'
import { SafeAreaView } from 'react-native-safe-area-context'
import { collection, getDocs } from 'firebase/firestore'
import { Firebase_db } from '../components/auth/firebaseconfig'

export const highLevelCategories = React.createContext()

const HighLevelCategoryProvider = ({children}) => {

    const [categories, setCategories] = useState([])
    const username = UserName();
    const user = username.toLowerCase();
    


    useEffect(()=>{
        const fetchHighLevelCategories = async () => {
            try {
                const hlcategories = await getDocs(collection(Firebase_db, "high_level_categories"))
                const hlcategory = hlcategories.docs.map(docs => ({
                    ...docs.data(),
                    id: docs.id,
                    category_name: docs.data().category_name,
                    category_image: docs.data().category_image,
                }))
                setCategories(hlcategory)
            } catch (error) {
                console.error("Error fetching data", error)
            }
        }; fetchHighLevelCategories();

    }, [user])


    return (
        <highLevelCategories.Provider value={{categories}}>
            {children}
        </highLevelCategories.Provider>
    )
}

export default HighLevelCategoryProvider;