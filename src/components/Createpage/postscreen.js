import { textBreakStrategy } from 'deprecated-react-native-prop-types/DeprecatedTextPropTypes'
import React, { Component, useState } from 'react'
import { Text, View, TextInput, StyleSheet } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/FontAwesome';
import ProgressBar from './progressbar'
import * as ImagePicker from 'expo-image-picker';
import MediaPickerModal from './mediapickermodal'

const PostScreen = () => {

    const [category, setCategory] = useState('');
    const [subCategory, setSubCategory] = useState(null);
    const [modalvisible, setModalVisbile] = useState(false);

    const subCategoryOptions = {
        'Sofa & Couch': [
            {label: 'Bench', value: 'Bench'},
            {label: 'Small Sofa', value: 'Small Sofa'},
            {label: 'Sleeper', value: ' Sleeper'},
            {label: 'Sectional', value: 'Sectional'},
            {label: 'Loveseat', value: 'Loveseat'},
        ],
        'Mattress': [
            {label: 'California King', value: ' California King'},
            {label: 'Queen', value: 'Queen'},
            {label: 'Twin', value: 'Twin'},
            {label: 'Twin XL', value: 'Twin XL'},
            {label: 'King', value: 'King'},
            {label: 'Full', value: 'Full'},
        ],
        'TV': [
            {label: 'Gaming TVs', value: 'Gaming Tvs'},
            {label: '8k TVs', value: '8k TVs'},
            {label: '4k Tvs', value: '4k Tvs'},
            {label: 'OLED', value: 'OLED'},
            {label: 'LED', value: 'LED'},
        ],
        
    }

    const onPressHandler = (value) =>{
        
        setCategory(value);
        setSubCategory(null);
    }

    const handleMediaSelect = () =>{
        setModalVisbile(false);

    }



    return (
        <SafeAreaView>
        <ScrollView>
            <View  style = {styles.container}>
                <Text style = {styles.text1}>Share your Opinion!</Text>
                <TouchableOpacity  style={styles.postButton}>
                    <Text>Post</Text>
                </TouchableOpacity>
            </View>
            <Text style = {styles.text2}>Fill out the information below to share an opinion</Text>
            <View style = {styles.section1}>
                {/* <Text style = {styles.photostext}>Add Photos/Videos</Text> */}
                <TouchableOpacity  style={styles.addButton} onPress={()=>setModalVisbile(true)}>
                    <Icon name="camera" size={20} color="black" />
                </TouchableOpacity>
                <MediaPickerModal
                visible={modalvisible}
                onSelect={handleMediaSelect}
                onClose={() => setModalVisbile(false)}
            />
            </View>
          
            <View style = {styles.section1}>
                    <TextInput 
                    style = {styles.input}
                    placeholder = 'Add Title!'></TextInput>
                    <TextInput style = {styles.input1}
                    placeholder=' Add Description!'></TextInput>
                    <TextInput style = {styles.input}
                    placeholder=' Add Purchase URL'></TextInput>
            </View>
            <View style = {styles.section1}>
                    <View style = {styles.container}>
                        <Text style = {styles.text3}>Purchase Price</Text>
                        <Text style = {styles.text4}>Purchase Date</Text>
                    </View>
                    <View style = {styles.container}>
                    <TextInput 
                    style = {styles.priceinput}
                    placeholder = '$ Add Price'
                    keyboardType = 'numeric'></TextInput>
                    <TextInput  
                    style = {styles.priceinput1} 
                    placeholder = ' MM/DD/YYYY'
                    keyboardType = 'numeric'></TextInput>
                    </View>
                    <View style = {styles.container}>
                        <Text  style = {styles.text3}>Category</Text>
                        <RNPickerSelect
                        style = {{inputIOS: styles.categoryInput}}
                        placeholder={{ label: 'Select Category', value: null }}
                        onValueChange={onPressHandler}
                    
                        
                        items={[
                            { label: 'Sofa & Couch', value: 'Sofa & Couch' },
                            { label: 'Mattress', value: 'Mattress' },
                            { label: 'TV', value: 'TV' },
                            { label: 'Other', value: 'Other' },
                        ]}
                        ></RNPickerSelect>
                    </View>
                    <View style = {styles.container}>
                        <Text  style = {styles.text3}>Sub Category</Text>
                        {category === 'Other' ? (
                            <TextInput 
                            style = {styles.priceinput}
                            placeholder = 'Add Sub Category'
                            onChangeText = {(text)=>setSubCategory(text)}
                            ></TextInput>
                        ) : (
                            <RNPickerSelect
                            style = {{inputIOS: styles.categoryInput1}}
                            placeholder={{ label: 'Select Sub Category', value: null }}
                            onValueChange={setSubCategory}
                            items={subCategoryOptions[category]||[]}
                            ></RNPickerSelect>
                        ) }
                    </View>
                </View>
                <View  style = {styles.section1}>
                    <Text style = {styles.text3}>Would you recommend other buyers to...</Text>
                    <View  style = {styles.container1}>
                        <TouchableOpacity style={styles.buyButton}>
                            <Text>Buy!</Text>
                        </TouchableOpacity>
                        <TouchableOpacity  style={styles.buyButton}>
                            <Text>Not Buy!</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity></TouchableOpacity>
                </ScrollView>
        </SafeAreaView>
    )
}

export default PostScreen


const styles = StyleSheet.create({

text1:{
    fontSize: 24,
    color: 'black',
    fontWeight: '400',
    paddingLeft:10,
    paddingTop: 10,
    
},
text2:{
    fontSize: 12,
    color: 'black',
    fontWeight: '400',
    paddingLeft:10
},
input: {
    height: 60,
    width: '95%',
    borderRadius: 10,
    backgroundColor: '#ffff',
    marginLeft:10,
    marginTop:5,
    marginRight:20,
    marginBottom:5,
    borderBottomColor: '#F7A70B',
    borderBottomWidth:1
  },

  input1: {
    height: 150,
    width: '95%',
    borderRadius: 10,
    backgroundColor: '#ffff',
    marginLeft:10,
    borderBottomColor: '#F7A70B',
    borderBottomWidth:1
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  priceinput: {
    height: 50,
    width: '40%',
    borderRadius: 10,
    backgroundColor: '#ffff',
    marginRight:25,
    marginLeft:10,
    marginTop:8,
    borderBottomColor: '#F7A70B',
    borderBottomWidth:1
  },
  priceinput1: {
    height: 50,
    width: '47%',
    marginLeft:5,
    borderRadius: 10,
    backgroundColor: '#ffff',
    marginRight:25,
    
    marginTop:8,
    borderBottomColor: '#F7A70B',
    borderBottomWidth:1
  },
  text3:{
    fontSize: 18,
    paddingTop:20,
    paddingLeft:10
  },
  text4:{
    fontSize: 18,
    paddingTop:20,
    paddingLeft:10,
    paddingRight:65
  },
  categoryInput: {
    height: 50,
    width: '94%',
    borderRadius: 10,
    backgroundColor: '#ffff',
    marginTop:10,
    marginRight:79,
    borderBottomColor: '#F7A70B',
    borderBottomWidth:1
},
categoryInput1: {
    height: 50,
    width: '94%',
    borderRadius: 10,
    backgroundColor: '#ffff',
    marginTop:10,
    marginRight:50,
    borderBottomColor: '#F7A70B',
    borderBottomWidth:1
},
section1:{
    borderWidth: 1,
    marginColor: 'black',
    margin: 10,
    borderRadius: 10,
},
addButton: {
    padding: 10,
    margin: 10,
    backgroundColor: '#e0e0e0', 
    borderRadius: 5, 
    alignItems: 'center',  
},
photostext:{
    paddingLeft:10,
    paddingTop:5
},
buyButton: {
       
        padding: 10,
        margin: 10,
        marginRight:20,
        backgroundColor: '#e0e0e0', 
        borderRadius: 5, 
        alignItems: 'center',  
    },
    container1: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
postButton:{
    
        padding: 8,
        marginTop:5,
        marginRight:10,
        backgroundColor: '#F7A70B', 
        borderRadius: 15, 
        alignItems: 'center',  
    },


})
                