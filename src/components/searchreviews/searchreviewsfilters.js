import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { Chip } from 'react-native-paper';
import { Ionicons,MaterialCommunityIcons, FontAwesome6, Foundation } from '@expo/vector-icons';

const SearchReviewsFilters = () => {
    return (
        <View style={styles.header}>
                        <ScrollView horizontal>
                            <Chip icon={()=><Ionicons name="filter-sharp" size={20} color="black" />} onPress={() => console.log('Pressed')}
                                mode = 'outlined' compact='true'> Filter</Chip>
                            <Chip mode = 'outlined' 
                            icon={()=> <MaterialCommunityIcons name="sofa" size={24} color="black" />}
                            
                            >Sofa & Couch</Chip>
                            
                            <Chip mode = 'outlined'
                            icon={()=><Ionicons name="bed" size={24} color="black" />}
                            >Mattress</Chip>
                            <Chip
                                mode = 'outlined'
                                icon={()=><Ionicons name="tv-sharp" size={22} color="black" />}
                            >TV's</Chip>
                            <Chip mode = 'outlined'
                            icon={()=><Foundation name="burst-new" size={24} color="black" />}
                            >Others</Chip>
                        </ScrollView>

                    </View>
    )
}
export default SearchReviewsFilters;


const styles = StyleSheet.create({
    header:{
        flexDirection:'row',
        paddingLeft:10,
        paddingTop:5,
        borderBottomWidth:1,
        borderBottomColor:'lightgrey',
        alignItems:'flex-start',
        justifyContent:'flex-start',
        height: 50,
    }

})
