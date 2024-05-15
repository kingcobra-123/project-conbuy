import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { Firebase_db } from '../../auth/firebaseconfig'
import { updateDoc, doc } from 'firebase/firestore'


const HandleSaveChanges = async(displayName, updates) => {
    try {
        const userscollection = collection(Firebase_db, "users_test")
        const q = query(userscollection, where("displayName", "==", 'satishk2405'))
        const querySnapshot = await getDocs(q)
        const userdata = querySnapshot.docs.map(docs => ({
            ...docs.data(),
            id: docs.id,
            emailVerified: docs.data().emailVerified,
        }))



            

            userdata.forEach(async (docSnapshot) => {
                const docRef = doc(Firebase_db, "users_test", docSnapshot.uid);
                
                await updateDoc(docRef, updates);
            });
            console.log('User profile updated successfully!')
        } catch (error) {
            console.error("Error updating document", error)
        }
    }




export default HandleSaveChanges;
