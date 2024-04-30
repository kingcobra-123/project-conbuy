import React, { Component, useState, useEffect, useRef } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SearchBar, ThemeProvider, Button, createTheme } from '@rneui/themed';
import { height } from 'deprecated-react-native-prop-types/DeprecatedImagePropType';
import { Chip } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';

const SearchReviewsHeader = ({updateTitle}) => {
    const navigation = useNavigation()
    const route = useRoute()
    // const [title, setTitle] = useState('')
    const posttitle = route.params?. title
    const searchBarRef = useRef(null)



    const onPressBackHandler =() =>{
        navigation.navigate('homepage')
        const random = Math.floor(Math.random() * 1000)
        updateTitle(random)
    }



    return (
        <SafeAreaView style={{height:105, backgroundColor:'#fff4b8'}}>
            <View >
            <View style={styles.header}>
                <Ionicons name="chevron-back" size={24} color="black" 
                    onPress={onPressBackHandler}/>
                    <View style={styles.searchBarContainer}>
                        <SearchBar
                            placeholder='Search reviews'
                            // theme={theme}
                            containerStyle={styles.searchBar}
                            inputContainerStyle={styles.inputContainer}
                            inputStyle={{ backgroundColor: 'white' }}
                            placeholderTextColor="gray"
                            searchIcon={<Ionicons name="search-sharp" size={18} color="#F7A70B" style={{paddingBottom:3}} />}
                        ></SearchBar>
                    </View>
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
        flex:1,
        paddingHorizontal:10,
    },

    searchBar: {
        borderRadius: 35, 
        backgroundColor: 'white', 
        shadowColor: 'rgba(0,0,0,0.1)', 
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5, 
        borderTopWidth: 0, 
        borderBottomWidth: 0, 
        borderWidth: 0,
        height:40
    },
    inputContainer: {
        borderRadius: 25, 
        backgroundColor: 'white', 
        height: 10,
    }

})


