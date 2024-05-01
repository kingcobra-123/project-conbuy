import React, { Component, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { Chip } from 'react-native-paper';
import { Ionicons,MaterialCommunityIcons, FontAwesome6, Foundation } from '@expo/vector-icons';

const SearchReviewsFilters = ({updateFilter}) => {
    const [selectedfilter, setSelectedFilter] = useState('')



    const handlePress = (key) => {
        if(selectedfilter){
            updateFilter('')
            setSelectedFilter('')
            
        } else {
            updateFilter(key)
            setSelectedFilter(key)
        }

    };



    return (
        <View style={styles.header}>
                        <ScrollView horizontal>
                            <Chip 
                                key='filter'
                                icon={()=><Ionicons name="filter-sharp" size={20} color="black" />} onPress={(key)=>{handlePress('filter')}}
                                mode='outlined' compact='true' 
                                style={[{backgroundColor:  (selectedfilter === 'filter')? '#F7A70B':'white'} ]}
                                elevated='true'> Filter</Chip>
                            <Chip 
                                key='sofaandcouch'
                                mode = 'outlined' 
                                icon={()=> <MaterialCommunityIcons name="sofa" size={24} color="black" />}
                                onPress={(key)=>{handlePress('Sofa and Couch')}}
                                style={[{backgroundColor:  (selectedfilter === 'Sofa and Couch')? '#F7A70B':'white'} ]}
                                >Sofa & Couch</Chip>
                            <Chip 
                                key='mattress'
                                mode = 'outlined'
                                icon={()=><Ionicons name="bed" size={24} color="black" />}
                                onPress={(key)=>{handlePress('Mattress')}}
                                style={[{backgroundColor:  (selectedfilter === 'Mattress')? '#F7A70B':'white'} ]}
                                >Mattress</Chip>
                            <Chip
                                key='tv'
                                mode = 'outlined'
                                icon={()=><Ionicons name="tv-sharp" size={22} color="black" />}
                                onPress={(key)=>{handlePress('TV')}}
                                style={[{backgroundColor:  (selectedfilter === 'TV')? '#F7A70B':'white'} ]}
                                >TV's</Chip>
                            <Chip 
                                key='others'
                                mode = 'outlined'
                                icon={()=><Foundation name="burst-new" size={24} color="black" />}
                                // onPress={(key)=>{handlePress('others')}}
                                style={[{backgroundColor:  (selectedfilter === 'others')? '#F7A70B':'white'} ]}
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
