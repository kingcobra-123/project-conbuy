import React, { Component, useState, useEffect } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SearchBar } from '@rneui/themed';

const SearchReviewsHeader = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const [title, setTitle] = useState('')
    const posttitle = route.params?. title



    const onPressBackHandler =() =>{
        navigation.navigate('homepage')
        setTitle('')
    }



    return (
        <SafeAreaView>
            <View style={styles.header}>
                <Ionicons name="chevron-back" size={24} color="black" 
                    onPress={onPressBackHandler}/>
                    <View style={styles.searchBarContainer}>
                        <SearchBar
                            placeholder='Search reviews'
                            
                        ></SearchBar>
                    </View>
            </View>
        </SafeAreaView>
    )
}

export default SearchReviewsHeader;


const styles = StyleSheet.create({
    header:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingBottom:5,
        paddingRight:10,
        paddingLeft:10,
        borderBottomWidth:1,
        borderBottomColor:'lightgrey'
    },
    headerTitle:{
        fontSize:14,
        fontWeight:'bold'
    },
    searchBarContainer:{ 
    },

})
