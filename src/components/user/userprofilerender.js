import React, { Component } from 'react'
import { Text, View } from 'react-native'
import UserProfileHeader from './userprofileheader'
import UserProfilePosts from './userprofileposts'
import { SafeAreaView } from 'react-native-safe-area-context'
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