import React, { Component } from 'react'
import UserProfileHeader from './userprofileheader'
import UserProfilePosts from './userprofileposts'
import { ScrollView } from 'react-native-gesture-handler'

const UserProfileRender = () => {
    return (
        <ScrollView>
        <UserProfileHeader />
        <UserProfilePosts />
        </ScrollView>
    )
}

export default UserProfileRender;