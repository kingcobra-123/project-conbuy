import React, { Component, useState, useContext, useEffect } from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import UserName from '../userprofile/username'
import { userMetadata } from '../userprofile/usermetadata'


import EditProfileHeader from './editprofileheader'
import EditProfilePicture from './editprofilepicture'
import EditProfileDetails from './editprofiledetails'
import HandleSaveChanges from './utilities/handlesavechanges'
import UpdateFirebaseAuthUser from './utilities/updatefirebaseauthuser'

const EditProfileRender = () => {

    const userdata_temp = useContext(userMetadata);
    const user = userdata_temp.metadata[0].displayName
    

    const [editProfile, setEditProfile] = useState(false);
    const [profileUpdates, setProfileUpdates] = useState({});
    const [emailVerified, setEmailVerified] = useState(false);
    useEffect(() => {
        if(userdata_temp.metadata[0].emailVerified === true){
            setEmailVerified(true)
        }else{
            setEmailVerified(false)
        }   
    }, [])

    const handleEditProfile = () => {
        setEditProfile(!editProfile)
    }

    const handleUpload = (name, value) => {
        setProfileUpdates(prevState => ({
            ...prevState,
            [name]: value
        }))
    };

    


    const handleSaveChanges = () => {
        HandleSaveChanges(user, profileUpdates)
        UpdateFirebaseAuthUser(profileUpdates.displayName)
    };

   




    return (
        <View>
            <EditProfileHeader handleSaveChanges={handleSaveChanges}/>
            <EditProfilePicture onChange={handleUpload}/>
            <EditProfileDetails 
                onChange={handleUpload}
                emailVerified={emailVerified}/>
        </View>
    )
}

export default EditProfileRender
