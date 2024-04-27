import React, {useEffect, useState} from 'react'
import { 
    Text, 
    View, 
    StyleSheet, 
    ActivityIndicator, 
    Image, 
    FlatList, 
    TouchableOpacity,
    ScrollView, TextInput
    } from 'react-native'
import { collection, getDocs } from 'firebase/firestore'
import { Firebase_db } from '../auth/firebaseconfig'
import { Firebase_Auth } from '../auth/firebaseconfig'
import { onAuthStateChanged } from 'firebase/auth'
import Listings from './listings'
import MyTabs from './bottomtabnavigator'
import { Octicons } from '@expo/vector-icons';
import fetchUserData from '../userprofile/userdata'


const categories = ()=>{
    
    const[tv, setTV] =useState([]);
    const[mattress, setMattress] = useState([]);
    const[others, setOthers] = useState([]);

}

const HomePage =({navigation})=>{

    const[loading, setLoading] = useState(true);
    const[sofa, setSofa] =useState([]);
    const[tv, setTV] =useState([]);
    const[mattress, setMattress] =useState([]);
    const[currentuser, setCurrentUser] =useState(null)
    const[category, setCategory] =useState('')
    const [selectedSofa, setSelectedSofa] = useState([]);

    useEffect(()=>{
        const subsribe = onAuthStateChanged(Firebase_Auth, (user)=>{
            if(user){setCurrentUser(user.displayName)}
            else{setCurrentUser(null)}
        }

        );
        return ()=> subsribe;
        
    }, []);

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
            navigation.navigate('Profile', { title: item });
        }
    };
         


    return(
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style = {styles.iconContainer}>
                    <Octicons name="three-bars" size={20} color="black" 
                    onPress={()=>{fetchUserData()}}/>
                    </View>
                    <Text style={styles.text1}>ConBuy</Text>
                    <Text style={styles.text2}>{`Hey ${currentuser}`}</Text>
                </View>
                <TextInput
                style= {styles.input}
                placeholder='Search'
                ></TextInput>
                
                    <Text style={styles.text3}>Sofa & Couch</Text>
                    <FlatList
                        data={sofa}
                        horizontal = {true}
                        showsHorizontalScrollIndicator= {false}
                        keyExtractor={(item, index)=> index.toString()}
                        renderItem={({item, index}) =>(
                        <TouchableOpacity
                        onPress={()=> onPressHandler(item.name)}
                        >
                        <View key={index} style={styles.card}>
                            <Image source={{ uri: item.photo_url }} style={styles.cardImage} />
                            <Text style={styles.cardTitle}>{item.name}</Text>
                        </View>
                        </TouchableOpacity>
                        )}>
                    </FlatList>
                    
                <Text style={styles.text3}>TV's</Text>
                <FlatList
                    data={tv}
                    horizontal = {true}
                    showsHorizontalScrollIndicator= {false}
                    keyExtractor={(item, index)=> index.toString()}
                    renderItem={({item, index}) =>(
                    <View key={index} style={styles.card}>
                        <Image source={{ uri: item.photo_url }} style={styles.cardImage} />
                        <Text style={styles.cardTitle}>{item.name}</Text>
                    </View>
                    )}>
                </FlatList>
                <Text style={styles.text3}>Mattress</Text>
                <FlatList
                    data={mattress}
                    horizontal = {true}
                    showsHorizontalScrollIndicator= {false}
                    keyExtractor={(item, index)=> index.toString()}
                    renderItem={({item, index}) =>(
                    <View key={index} style={styles.card}>
                        <Image source={{ uri: item.photo_url }} style={styles.cardImage} />
                        <Text style={styles.cardTitle}>{item.name}</Text>
                    </View>
                    )}>
                </FlatList>
            </View>
            </ScrollView>
        )
}

export default HomePage

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop:60,
    },
    header:{
        flexWrap: 'wrap',
        flexDirection: 'row',
        paddingBottom:12,
        
    },
    text1:{
        paddingLeft:10,
        fontSize:24,
        fontWeight:'600'
    },
    text2:{
        paddingLeft:80,
        fontSize:24,
        fontWeight:'400'
    },
    text3:{
        paddingTop:25,
        paddingLeft:20,
        fontSize:24,
        fontWeight:'400'
    },
    input: {
        
        height: 50,
        width: 350,
        borderColor: '#F7A70B',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#ffff',
        marginLeft:20,
        marginTop:8
      },
      card: {
          width: 158,
          height: 160,
          backgroundColor: '#fff',
          margin:5,
          elevation: 15,
          shadowColor: '#F7A70B',
          flexWrap: 'wrap',
          flexDirection: 'row',
          borderRadius:10,
          justifyContent: 'center',
      },
      cardImage: {
          width: '100%',
          height: '70%',
          borderRadius:10
      },
      cardTitle: {
          fontSize: 15,
          fontWeight: 'bold',
          alignItems: 'center',
          justifyContent: 'center'
      },
      cardDescription: {
          fontSize: 14,
      },
      iconContainer: {
        flexDirection: 'row',
        width: 30,  
        paddingLeft:5,
        paddingTop:3,
        borderColor: '#F7A70B',
        borderWidth: 1,
        borderRadius: 10,
        flexWrap: 'wrap',
        marginLeft:20,
        marginTop:3
        
    },
})
