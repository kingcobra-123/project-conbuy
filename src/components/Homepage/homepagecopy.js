import React, { Component, useState, useEffect, useContext  } from 'react'
import { Text, View, StyleSheet, TextInput, FlatList, TouchableOpacity, Image} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import {  FontAwesome6, Octicons,Ionicons, FontAwesome5 } from '@expo/vector-icons';
import UserName from '../userprofile/username';
import { collection, getDocs } from 'firebase/firestore';
import { Firebase_db, Firebase_Auth } from '../auth/firebaseconfig';
import { ScrollView } from 'react-native-gesture-handler';
import { highLevelCategories } from '../../utilitycomponents/fetchcategories';
import { signOut } from 'firebase/auth';



const HomepageCopy = ({navigation}) => {


    const highLevelCategory = useContext(highLevelCategories)

    const [signOut1, setSignOut1] = useState(false)

    const[loading, setLoading] = useState(true);
    const[sofa, setSofa] =useState([]);
    const[tv, setTV] =useState([]);
    const[mattress, setMattress] =useState([]);
    const [selectedSofa, setSelectedSofa] = useState([]);
    const [selectedcategory, setSelectedCategory] = useState([]);
    const username = UserName();
    const user = username.toLowerCase();  


    const logout = async() =>{
        setSignOut1(true)
        try{
            const response = await signOut(Firebase_Auth);
            setSignOut1(false)

            if(response.user){
                
                navigation.replace('LandinPage')
            }
        } catch(error){
            alert('Sign In Failed: '+ error.message)
        } finally{
            setSignOut1(false)}
    }


    useEffect(()=>{
        const fetchdata = async() =>{
            try{
                const sofaSnapshot = await getDocs(collection(Firebase_db, "Category_Sofa_and_Couch"))
                const sofas = sofaSnapshot.docs.map(doc=>({
                    ...doc.data(),
                    id:doc.id
                }));
                const tvSnapshot = await getDocs(collection(Firebase_db, "Category_TV"))
                const tvs = tvSnapshot.docs.map(docs=>({
                    ...docs.data(),
                    id:docs.id
                }));
                const mattressSnapshot = await getDocs(collection(Firebase_db, "Category_Mattress"))
                const mattresses = mattressSnapshot.docs.map(docs=>({
                    ...docs.data(),
                    id:docs.id
                }));
                setSofa(sofas)
                setSelectedSofa(sofas.length > 0 ? sofas[0] : null);
                setTV(tvs)
                setMattress(mattresses)
            } catch(error){
                console.error("Error fetching data", error)
            } finally{
                setLoading(false)
            }
        }
        fetchdata();
    }, []);

    const onPressHandler = (item)=>{
        setSelectedSofa(item)
        navigateToDetails(item)

    }

    const navigateToDetails = (item) => {
        if (selectedSofa) {
            navigation.navigate('Create', { title: item });
        }
    };






    return (
        
        <SafeAreaView>
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Octicons name="three-bars" size={24} color="black" style={styles.headerIcon}/>
                    <Text style={styles.headerTitle}>ConBuy!</Text>
                </View>
                <View style={styles.headerRight}>
                    <FontAwesome5 name="user-circle" size={24} color="black" style={styles.headerIcon}
                    onPress={()=>logout()}/>
                    <Ionicons name="notifications-outline" size={26} color="black" style={styles.headerIcon}/>
                    <FontAwesome6 name="sack-dollar" size={22} color="black" style={styles.headerIcon}/>
                </View>
            </View>
            <View style={styles.headerSearchBar}>
                <TextInput 
                    style={styles.searchBar}
                    placeholder='Conbuy it!!!!'
                    autoCapitalize='none'
                ></TextInput>
            </View>
            <View style={styles.categoryStoryBar}>
                <View style={styles.flatListStory}>
                <FlatList
                        data={highLevelCategory.categories}
                        horizontal = {true}
                        showsHorizontalScrollIndicator= {false}
                        keyExtractor={(item, index)=> index.toString()}
                        renderItem={({item, index}) =>(
                        <TouchableOpacity>
                                <Image source={{ uri: item.category_image }} style={styles.categoryStoryCardImage} />
                                <Text style={styles.storyTitle}>{item.category_name}</Text>
                            </TouchableOpacity>
                            )}>
                        </FlatList>
                </View>

            </View>
            <ScrollView>
            <View style={styles.categoryHeader}>
                <Text style={styles.categoryTitle}>Sofa & Couch</Text>
                <Ionicons name="arrow-forward-circle-sharp" size={30} color="grey" />
            </View>
            <View>
            <FlatList
                        data={sofa}
                        horizontal = {true}
                        showsHorizontalScrollIndicator= {false}
                        keyExtractor={(item, index)=> index.toString()}
                        renderItem={({item, index}) =>(
                        <TouchableOpacity
                        onPress={()=> onPressHandler(item.name)}
                        >
                        <View key={index} style={styles.categoryCard}>
                            <Image source={{ uri: item.photo_url }} style={styles.categoryCardImage} />
                            <Text style={styles.cardTitle}>{item.name}</Text>
                        </View>
                        </TouchableOpacity>
                        )}>
                    </FlatList>
            </View>
            <View style={styles.categoryHeader}>
                <Text style={styles.categoryTitle}>Tv's</Text>
                <Ionicons name="arrow-forward-circle-sharp" size={30} color="grey" />
            </View>
            <View>
            <FlatList
                        data={tv}
                        horizontal = {true}
                        showsHorizontalScrollIndicator= {false}
                        keyExtractor={(item, index)=> index.toString()}
                        renderItem={({item, index}) =>(
                        <TouchableOpacity>
                        <View key={index} style={styles.categoryCard}>
                            <Image source={{ uri: item.photo_url }} style={styles.categoryCardImage} />
                            <Text style={styles.cardTitle}>{item.name}</Text>
                        </View>
                        </TouchableOpacity>
                        )}>
                    </FlatList>
            </View>
            <View style={styles.categoryHeader}>
                <Text style={styles.categoryTitle}>Mattress</Text>
                <Ionicons name="arrow-forward-circle-sharp" size={30} color="grey" />
            </View>
            <View>
                    <FlatList
                        data={mattress}
                        horizontal = {true}
                        showsHorizontalScrollIndicator= {false}
                        keyExtractor={(item, index)=> index.toString()}
                        renderItem={({item, index}) =>(
                        <TouchableOpacity>
                        <View key={index} style={styles.categoryCard}>
                            <Image source={{ uri: item.photo_url }} style={styles.categoryCardImage} />
                            <Text style={styles.cardTitle}>{item.name}</Text>
                        </View>
                        </TouchableOpacity>
                        )}>
                    </FlatList>
            </View>
        </ScrollView>
        </SafeAreaView>
    )
}

export default HomepageCopy;

const styles = StyleSheet.create({
    header:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingBottom:5,
        paddingRight:10,
        paddingLeft:10,
        borderBottomWidth:1,
        borderBottomColor:'lightgrey',
        
    },
    headerTitle:{
        fontSize:24,
        fontWeight:'600',
        paddingLeft:5
        
    },
    headerLeft:{
        flexDirection:'row',
        alignItems:'center'
    },
    headerRight:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
    },
    headerIcon:{
        paddingRight:10
    },
    headerSearchBar:{
        height:60,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingBottom:5,
        paddingRight:10,
        paddingLeft:10,
        paddingTop:10,
        borderBottomWidth:1,
        borderBottomColor:'lightgrey'
    },
    searchBar: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 20,
        flex: 1,  
        height: 40,
        borderColor: 'grey',
        borderWidth: 0.7,
        paddingLeft: 5,  
        borderRadius: 20,
        backgroundColor: '#ffff',
        marginRight:5
      },
      categoryStoryBar:{
        
        height:100,
        flexDirection: 'row',  
        alignItems: 'center',  
        justifyContent: 'space-between',    
        width: '100%',
    },
    categoryHeader:{
        height:50,
        flexDirection: 'row',  
        alignItems: 'center',  
        justifyContent: 'space-between',  
        paddingHorizontal: 10,  
        width: '100%',
        borderBottomWidth:1,
        borderBottomColor:'lightgrey'
    },
    categoryCard: {
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 25,
        width: 250,
        height: 250,
        backgroundColor: '#fff',
        margin:2,
        shadowColor: 'lightgrey',
        flexWrap: 'wrap',
        flexDirection: 'row',
        borderRadius:10,
        justifyContent: 'center',
    },
    categoryCardImage: {
        width: '100%',
        height: '70%',
        borderRadius:10,
        resizeMode:'contain'
    },
    categoryTitle:{
        fontSize:20,
        fontWeight:'600',
        paddingLeft:5
        
    },
    categoryStoryCardImage:{
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 10,
        marginLeft: 10,
        resizeMode: 'cover'
    },
    categoryTitle:{
        fontSize:20,
        fontWeight:'600',
        paddingLeft:5
        
    },
    storyTitle:{
        fontSize:12,
        paddingLeft:5,
        paddingTop:5,
        marginLeft:10,
        paddingBottom:5    
    },
    flatListStory:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey'
    },

})
