// import { textBreakStrategy } from 'deprecated-react-native-prop-types/DeprecatedTextPropTypes'
// import React, { Component, useContext, useState } from 'react'
// import { Text, View, TextInput, StyleSheet,Image } from 'react-native'
// import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
// import { SafeAreaView } from 'react-native-safe-area-context'
// import RNPickerSelect from 'react-native-picker-select';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import ProgressBar from './progressbar';
// import CreatePost from './createpost'
// import { userContext } from '../userprofile/userprofile'
// import * as ImagePicker from 'expo-image-picker';
// import MediaPickerModal from './mediapickermodal';
// import { Feather } from '@expo/vector-icons';
// import { set } from 'firebase/database'
// import CreatePostRender from './createpostrender'
// import { Modal } from 'react-native-paper';
// import UserProvider from '../userprofile/userprofile'
// import UseCreatePost from './createpost'
// import UserName from '../userprofile/username'

// const PostScreen = () => {

//     const [category, setCategory] = useState('');
//     const [subCategory, setSubCategory] = useState(null);
//     const [modalvisible, setModalVisbile] = useState(false);
//     const [selectedImage, setSelectedImage] = useState([]);
//     const [reviewTitle, setReviewTitle] = useState('');
//     const [reviewDescription, setReviewDescription] = useState('');
//     const [reviewpurchaseurl, setReviewPurchaseUrl] = useState('');
//     const [reviewPrice, setReviewPrice] = useState('');
//     const [reviewpurchasedate, setReviewPurchaseDate] = useState('');
//     const [reviewcategory, setReviewCategory] = useState('');
//     const [reviewsubCategory, setReviewSubCategory] = useState('');
//     const [reviewbuyornotbuy, setReviewBuyOrNotBuy] = useState(true);
//     const [reviewimage, setReviewImage] = useState([]);
//     // const [reviewvideo, setReviewVideo] = useState([]);
//     const [uploadstatus, setUploadStatus] = useState('');
//     const [uploadmodalvisible, setUploadModalVisible] = useState(false);

//     const subCategoryOptions = {
//         'Sofa & Couch': [
//             {label: 'Bench', value: 'Bench'},
//             {label: 'Small Sofa', value: 'Small Sofa'},
//             {label: 'Sleeper', value: ' Sleeper'},
//             {label: 'Sectional', value: 'Sectional'},
//             {label: 'Loveseat', value: 'Loveseat'},
//         ],
//         'Mattress': [
//             {label: 'California King', value: ' California King'},
//             {label: 'Queen', value: 'Queen'},
//             {label: 'Twin', value: 'Twin'},
//             {label: 'Twin XL', value: 'Twin XL'},
//             {label: 'King', value: 'King'},
//             {label: 'Full', value: 'Full'},
//         ],
//         'TV': [
//             {label: 'Gaming TVs', value: 'Gaming Tvs'},
//             {label: '8k TVs', value: '8k TVs'},
//             {label: '4k Tvs', value: '4k Tvs'},
//             {label: 'OLED', value: 'OLED'},
//             {label: 'LED', value: 'LED'},
//         ],
        
//     }

//     const onPressHandler = (value) =>{
//         setCategory(value);
//         setReviewCategory(value);
//         setSubCategory(null);
//         setReviewSubCategory(null);
//     }

//     const handleMediaSelect = (source) =>{
//         if (!Array.isArray(source)) {
//             console.error('Invalid sources:', source);
//             return;
//         }
    
//         const validUris = source.flat().filter(uri => typeof uri === 'string' && uri.startsWith('http'));
//         console.log('Filtered URIs:', validUris);  // Debug output
    
//         setModalVisbile(false);
//         setSelectedImage(oldImages => [...oldImages, ...validUris]);
//         setReviewImage(oldImages => [...oldImages, ...validUris]);
//     }

//     const openMediaPickerModal = () => {
//         setModalVisbile(true);
//     };
    
//     const handleDeleteImage = (index) => {
//         const newImages = selectedImage.filter((_, i) => i !== index);
//         setSelectedImage(newImages);
//         setReviewImage(newImages);
//         console.log('Deleted image at index', index);
//     };
    
//     const userName = UserName();
//     const handleCreatePost = async () => {

//         setUploadModalVisible(true);
//         try {
//             const response = await CreatePost({
//                 reviewTitle,
//                 reviewDescription, 
//                 reviewpurchaseurl,
//                 reviewPrice,
//                 reviewpurchasedate,
//                 reviewcategory,
//                 reviewsubCategory,
//                 reviewbuyornotbuy,
//                 reviewimage,
//                 // video,
//                 userName
//             });
//             if(response.success){
//                 console.log(response.message)
//                 setUploadStatus('success');
//             } else {
//                 console.log(response.message)
//                 setUploadStatus('failed');
//             }
//         } catch (error) {
//             console.log("Error in CreatePost", error);
//             setUploadStatus('failed');
//         } finally {
//             setTimeout(() => {
//             setUploadModalVisible(false);
//         }, 3000);; // Keeps the modal visible for 3 seconds after completion
//         }
//     };


//     const onPressBuyHandler = () => {
//         setReviewBuyOrNotBuy(true);

//     };
//     const onPressNotBuyHandler = () => {
//         setReviewBuyOrNotBuy(false);
//     };



//     return (
//         <SafeAreaView>
//         <ScrollView>
//             <View  style = {styles.container}>
//                 <Text style = {styles.text1}>Share your Opinion!</Text>
//                 <TouchableOpacity  style={styles.postButton} 
//                 onPress={handleCreatePost}>
//                     <Text>Post</Text>
//                 </TouchableOpacity>
//                 <Modal
//                 visible={uploadmodalvisible}
//                 animationType="slide" transparent={true}
//                 style={{flex: 1, justifyContent: 'center', alignItems: 'center', height:'100%', width:'100%'}}
//                 >
//                         <CreatePostRender 
//                         uploadStatus={uploadstatus} 
//                         onClose={()=>setUploadModalVisible(false)}/>
//                 </Modal>
//             </View>
//             <Text style = {styles.text2}>Fill out the information below to share an opinion</Text>
//             <View>
//             {selectedImage.length === 0 && (
//                 <View style = {styles.section1}>
//                     {/* <Text style = {styles.photostext}>Add Photos/Videos</Text> */}
//                     <TouchableOpacity  style={styles.addButton} onPress={openMediaPickerModal}>
//                         <Icon name="camera" size={20} color="black" />
//                     </TouchableOpacity>
//                     <MediaPickerModal
//                     visible={modalvisible}
//                     onSelect={handleMediaSelect}
//                     onClose={()=>setModalVisbile(false)}
//                 />
//                 </View>)}
//             </View>
//             <View>
//                 {selectedImage.length > 0 && (
//                     <ScrollView horizontal style={styles.imageContainer}>
//                         {selectedImage.map((uri, index) => uri && (
//                             <View style = {styles.imagewrapper}>
//                                 <Image key={index} source={{ uri }} style={styles.imageStyle} />
//                                 <TouchableOpacity style = {styles.deleteIcon}
//                                 onPress={()=>handleDeleteImage(index)} >
//                                     <Icon name="times" size={20} color="black" />
//                                 </TouchableOpacity>
//                             </View>))}
//                         <Feather style={{paddingTop:10}}name="plus" size={80} color="black" onPress={openMediaPickerModal} />
//                         <MediaPickerModal
//                     visible={modalvisible}
//                     onSelect={handleMediaSelect}
//                     onClose={()=>setModalVisbile(false)}
//                 />
//                     </ScrollView>
//                 )}

//             </View>
                   
//             <View style={styles.section1}>
//                                 <TextInput
//                                     style={styles.input}
//                                     placeholder='Add Title!'
//                                     onChangeText={(text)=>setReviewTitle(text)}></TextInput>
//                                 <TextInput style={styles.input1}
//                                     placeholder=' Add Description!'
//                                     onChangeText={(text)=> setReviewDescription(text)}></TextInput>
//                                 <TextInput style={styles.input}
//                                     placeholder=' Add Purchase URL'
//                                     onChangeText={(text)=>setReviewPurchaseUrl(text)}></TextInput>
//                             </View><View style={styles.section1}>
//                                 <View style={styles.container}>
//                                     <Text style={styles.text3}>Purchase Price</Text>
//                                     <Text style={styles.text4}>Purchase Date</Text>
//                                 </View>
//                                 <View style={styles.container}>
//                                     <TextInput
//                                         style={styles.priceinput}
//                                         placeholder='$ Add Price'
//                                         keyboardType='numeric'
//                                         onChangeText={(text)=>setReviewPrice(text)}></TextInput>
//                                     <TextInput
//                                         style={styles.priceinput1}
//                                         placeholder=' MM/DD/YYYY'
//                                         keyboardType='numeric'
//                                         onChangeText={(text)=>setReviewPurchaseDate(text)}></TextInput>
//                                 </View>
//                                 <View style={styles.container}>
//                                     <Text style={styles.text3}>Category</Text>
//                                     <RNPickerSelect
//                                         style={{ inputIOS: styles.categoryInput }}
//                                         placeholder={{ label: 'Select Category', value: null }}
//                                         onValueChange={onPressHandler}


//                                         items={[
//                                             { label: 'Sofa & Couch', value: 'Sofa & Couch' },
//                                             { label: 'Mattress', value: 'Mattress' },
//                                             { label: 'TV', value: 'TV' },
//                                             { label: 'Other', value: 'Other' },
//                                         ]}
//                                     ></RNPickerSelect>
//                                 </View>
//                                 <View style={styles.container}>
//                                     <Text style={styles.text3}>Sub Category</Text>
//                                     {category === 'Other' ? (
//                                         <TextInput
//                                             style={styles.priceinput}
//                                             placeholder='Add Sub Category'
//                                             onChangeText={
//                                                 (text) => {setSubCategory(text); setReviewSubCategory(text)}
//                                             }
//                                         ></TextInput>
//                                     ) : (
//                                         <RNPickerSelect
//                                             style={{ inputIOS: styles.categoryInput1 }}
//                                             placeholder={{ label: 'Select Sub Category', value: null }}
//                                             onValueChange={setReviewSubCategory}
//                                             items={subCategoryOptions[category] || []}
//                                         ></RNPickerSelect>
//                                     )}
//                                 </View>
//                             </View><View style={styles.section1}>
//                                 <Text style={styles.text3}>Would you recommend other buyers to...</Text>
//                                 <View style={styles.container1}>
//                                     <TouchableOpacity style={[styles.buyButton,{
//                                         backgroundColor: reviewbuyornotbuy? '#F7A70B':'#e0e0e0'}]}
//                                     onPress={onPressBuyHandler}>
//                                         <Text>Buy!</Text>
//                                     </TouchableOpacity>
//                                     <TouchableOpacity style={styles.buyButton}
//                                     onPress={onPressNotBuyHandler}>
//                                         <Text>Not Buy!</Text>
//                                     </TouchableOpacity>
//                                 </View>
//                             </View>
//                 </ScrollView>
//         </SafeAreaView>
//     )
// }

// export default PostScreen


// const styles = StyleSheet.create({

// text1:{
//     fontSize: 24,
//     color: 'black',
//     fontWeight: '400',
//     paddingLeft:10,
//     paddingTop: 10,
    
// },
// text2:{
//     fontSize: 12,
//     color: 'black',
//     fontWeight: '400',
//     paddingLeft:10
// },
// input: {
//     height: 60,
//     width: '95%',
//     borderRadius: 10,
//     backgroundColor: '#ffff',
//     marginLeft:10,
//     marginTop:5,
//     marginRight:20,
//     marginBottom:5,
//     borderBottomColor: '#F7A70B',
//     borderBottomWidth:1
//   },

//   input1: {
//     height: 150,
//     width: '95%',
//     borderRadius: 10,
//     backgroundColor: '#ffff',
//     marginLeft:10,
//     borderBottomColor: '#F7A70B',
//     borderBottomWidth:1
//   },
//   container: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },

//   priceinput: {
//     height: 50,
//     width: '40%',
//     borderRadius: 10,
//     backgroundColor: '#ffff',
//     marginRight:25,
//     marginLeft:10,
//     marginTop:8,
//     borderBottomColor: '#F7A70B',
//     borderBottomWidth:1
//   },
//   priceinput1: {
//     height: 50,
//     width: '47%',
//     marginLeft:5,
//     borderRadius: 10,
//     backgroundColor: '#ffff',
//     marginRight:25,
    
//     marginTop:8,
//     borderBottomColor: '#F7A70B',
//     borderBottomWidth:1
//   },
//   text3:{
//     fontSize: 18,
//     paddingTop:20,
//     paddingLeft:10
//   },
//   text4:{
//     fontSize: 18,
//     paddingTop:20,
//     paddingLeft:10,
//     paddingRight:65
//   },
//   categoryInput: {
//     height: 50,
//     width: 175,
//     borderRadius: 10,
//     backgroundColor: '#ffff',
//     marginTop:10,
//     marginRight:10,
//     borderBottomColor: '#F7A70B',
//     borderBottomWidth:1
// },
// categoryInput1: {
//     height: 50,
//     width: 175,
//     borderRadius: 10,
//     backgroundColor: '#ffff',
//     marginTop:10,
//     marginRight:10,
//     borderBottomColor: '#F7A70B',
//     borderBottomWidth:1
// },
// section1:{
//     borderWidth: 1,
//     marginColor: 'black',
//     margin: 10,
//     borderRadius: 10,
// },
// addButton: {
//     padding: 10,
//     margin: 10,
//     backgroundColor: '#e0e0e0', 
//     borderRadius: 5, 
//     alignItems: 'center',  
// },
// photostext:{
//     paddingLeft:10,
//     paddingTop:5
// },
// buyButton: {
//         padding: 10,
//         margin: 10,
//         marginRight:20,
//         backgroundColor: '#e0e0e0', 
//         borderRadius: 5, 
//         alignItems: 'center',  
//     },
//     container1: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center',
//       },
// postButton:{
    
//         padding: 8,
//         marginTop:5,
//         marginRight:10,
//         backgroundColor: '#F7A70B', 
//         borderRadius: 15, 
//         alignItems: 'center',  
//     },

//     imageContainer: {
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         padding: 10,
//         borderWidth: 1,
//         borderColor: 'black',
//         margin: 10,
//         borderRadius: 10,
//     },
//     imageStyle: {
//         width: 100,  
//         height: 100
//     },
//     imagewrapper: {
//         margin: 5,
//         width: 100,  
//         height: 100, 
//         overflow: 'visible' 
//     },
//     deleteIcon: {
//         top: -15, 
//         right: -70,
//         backgroundColor: 'white',
//         borderRadius: 15,
//         width: 30,
//         height: 30,
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderColor: 'red',
//         borderWidth: 1,
//         zIndex: 10 
//     }


// })
                