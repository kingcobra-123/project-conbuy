import React, { Component , useContext} from 'react'
import { Text, View } from 'react-native'
import { userContext } from './userprofile';

const UserName = () => {
    const user = useContext(userContext);

    if (user){
        return user.displayName || 'No Name'
    } return 'No Name'
};

export default UserName
