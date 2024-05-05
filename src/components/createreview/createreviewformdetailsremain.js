import React, { Component, useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import Feather from '@expo/vector-icons/Feather';
import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { TextInput } from 'react-native-gesture-handler';


const CreateReviewFormDetailsRemain = ({formData, onChange}) => {



    const [selectedCategory, setSelectedCategory] = useState(' ');
    const [selectedSubCategory, setSelectedSubCategory] = useState('Sofa & Couch');
    const [selectedOtherCategory, setSelectedOtherCategory] = useState(null);
    const [selectedOtherSubCategory, setSelectedOtherSubCategory] = useState(null);
    const [selectedPurchaseURL, setSelectedPurchaseURL] = useState(null);
    const [selectedPurchaseDate, setSelectedPurchaseDate] = useState(null);
    const [selectedBuyOrNotBuy, setSelectedBuyOrNotBuy] = useState(null);


    const [reviewTitle, setReviewTitle] = useState('');
    const [reviewpurchaseurl, setReviewPurchaseUrl] = useState('');
    const [reviewPrice, setReviewPrice] = useState('');
    const [reviewpurchasedate, setReviewPurchaseDate] = useState('');
    const [reviewcategory, setReviewCategory] = useState('');
    const [reviewsubCategory, setReviewSubCategory] = useState('');
    const [reviewbuyornotbuy, setReviewBuyOrNotBuy] = useState(true);
    const [reviewimage, setReviewImage] = useState([]);
    // const [reviewvideo, setReviewVideo] = useState([]);
    const [uploadstatus, setUploadStatus] = useState('');



    const categoryDropdownOptions = [
        {title: 'Sofa & Couch', icon: 'couch'},
        {title: 'Tv', icon: 'tv'},
        {title: 'Mattress', icon: 'bed'},
        {title: 'Other', icon: 'plus-circle'}
    ]

    const recommendationDropdownOptions = [
        {title: 'Buy', icon: 'thumbs-up'},
        {title: "Do not Buy", icon: 'thumbs-down'},
    ];

    const subCategoryDropdownOptions = {
        'Sofa & Couch': [
            {title: 'Bench', icon: 'couch'},
            {title: 'Small Sofa', icon: 'couch'},
            {title: 'Sleeper', icon: 'couch'},
            {title: 'Sectional', icon: 'couch'},
            {title: 'Loveseat', icon: 'couch'},
        ],
        'Mattress': [
            {title: 'California King', icon: ' bed'},
            {title: 'Queen', icon: 'bed'},
            {title: 'Twin', icon: 'bed'},
            {title: 'Twin XL', icon: 'bed'},
            {title: 'King', icon: 'bed'},
            {title: 'Full', icon: 'bed'},
        ],
        'Tv': [
            {title: 'Gaming TVs', icon: 'tv'},
            {title: '8k TVs', icon: 'tv'},
            {title: '4k Tvs', icon: 'tv'},
            {title: 'OLED', icon: 'tv'},
            {title: 'LED', icon: 'tv'},
        ],
        'Other': [
            {title: 'Other', icon: 'plus-circle'}
        ]
    };

    const handlePurchaseURLPress = () => {

        if(selectedPurchaseURL){
            setSelectedPurchaseURL(false)
        }else{
        setSelectedPurchaseURL(true)
    }}

    const handlePurchaseDatePress = () => {
            if(selectedPurchaseDate){
                setSelectedPurchaseDate(false)
            }else{
            setSelectedPurchaseDate(true)
    }};





    return (
        <View>
            <View style={styles.captionHeader}>
            <TextInput 
                    placeholder="Pick a Caption..." 
                    placeholderTextColor={'black'}
                    keyboardType='default'
                    style={styles.textInputStyles}
                    onChangeText={(e) => onChange('reviewTitle', e)} />
            </View>
            <View style={styles.reviewCategory}>
                <Text>Category</Text>
                <SelectDropdown
                            data={categoryDropdownOptions}
                            onSelect={(selectedItem, index) => {
                                
                                setSelectedCategory(selectedItem)
                                onChange('reviewCategory', selectedItem.title)
                                if(selectedItem.title === 'Other'){
                                    setSelectedOtherCategory(true)
                                } else {
                                    setSelectedOtherCategory(false)
                                }
                            }}
                            renderButton={(selectedItem, isOpened) => {
                                        return (
                                            <View style={styles.dropdownButtonStyle}>
                                            {selectedItem && (
                                                <Icon name={selectedItem? selectedCategory.icon:'globe-americas' } style={styles.dropdownButtonIconStyle} />
                                            )}
                                            
                                            <Text style={styles.dropdownButtonTxtStyle}>
                                                {selectedItem? selectedItem.title: ''}
                                            </Text>
                                            <Icon name={isOpened ? 'chevron-up' : 'chevron-right'} style={styles.dropdownButtonArrowStyle} />
                                            </View>
                                        );
                                        }}
                            renderItem={(item, index, isSelected) => {
                                            return (
                                                    <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
                                                    <Icon name={item.icon} style={styles.dropdownItemIconStyle} />
                                                    <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                                                    </View>
                                            );
                                            }}
                                            showsVerticalScrollIndicator={false}
                                            dropdownStyle={styles.dropdownMenuStyle}
                        ></SelectDropdown>
            </View>
            {selectedOtherCategory &&
                <View style={styles.textInputContainer}>
                    <TextInput 
                    placeholder="Enter Category..." 
                    placeholderTextColor={'grey'}
                    style={styles.textInputStyles} 
                    onChangeText={(text)=>onChange('reviewCategory', text)}/>
                    
                </View>}
            <View style={styles.reviewCategory}>
                <Text>Sub-Category</Text>
                {selectedCategory && 

                            <SelectDropdown
                            data={subCategoryDropdownOptions[selectedCategory.title]}
                            onSelect={(selectedItem, index) => {
                                setSelectedSubCategory(selectedItem)
                                onChange('reviewSubCategory', selectedItem.title)
                                if(selectedItem.title === 'Other'){
                                    setSelectedOtherSubCategory(true)
                                } else {
                                    setSelectedOtherSubCategory(false)
                                }
                            }}
                            renderButton={(selectedItem, isOpened) => {
                                        return (
                                            <View style={styles.dropdownButtonStyle}>
                                            {selectedItem && (
                                                <Icon name={selectedItem? selectedSubCategory.icon:'globe-americas' } style={styles.dropdownButtonIconStyle} />
                                            )}
                                            
                                            <Text style={styles.dropdownButtonTxtStyle}>
                                                {selectedItem? selectedSubCategory.title: ''}
                                            </Text>
                                            <Icon name={isOpened ? 'chevron-up' : 'chevron-right'} style={styles.dropdownButtonArrowStyle} />
                                            </View>
                                        );
                                        }}
                            renderItem={(item, index, isSelected) => {
                                            return (
                                                    <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
                                                    <Icon name={item.icon} style={styles.dropdownItemIconStyle} />
                                                    <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                                                    </View>
                                            );
                                            }}
                                            showsVerticalScrollIndicator={false}
                                            dropdownStyle={styles.dropdownMenuStyle}
                            ></SelectDropdown>
                }
            </View>
            {selectedOtherSubCategory &&
                <View style={styles.textInputContainer}>
                    <TextInput 
                    placeholder="Enter Sub-Category..." 
                    placeholderTextColor={'grey'}
                    style={styles.textInputStyles} 
                    onChangeText={(text)=>onChange('reviewSubCategory', text)}/>
                    
                </View>}

            <View style={styles.reviewCategory}>
                <Text>Would you recommend</Text>
                
                    <SelectDropdown
                    data={recommendationDropdownOptions}
                    onSelect={(selectedItem, index) => {
                        setSelectedBuyOrNotBuy(selectedItem)
                        onChange('reviewBuyOrNotBuy', selectedItem.title)
                    }}
                    renderButton={(selectedItem, isOpened) => {
                                return (
                                    <View style={styles.dropdownButtonStyle}>
                                    {selectedItem && (
                                        <Icon name={selectedItem? selectedBuyOrNotBuy.icon:'globe-americas' } style={styles.dropdownButtonIconStyle}/>
                                    )}
                                    
                                    <Text style={styles.dropdownButtonTxtStyle}>
                                        {selectedItem? selectedBuyOrNotBuy.title: ''}
                                    </Text>
                                    <Icon name={isOpened ? 'chevron-up' : 'chevron-right'} style={styles.dropdownButtonArrowStyle} />
                                    </View>
                                );
                                }}
                    renderItem={(item, index, isSelected) => {
                                    return (
                                            <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
                                            <Icon name={item.icon} style={styles.dropdownItemIconStyle} />
                                            <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                                            </View>
                                    );
                                    }}
                                    showsVerticalScrollIndicator={false}
                                    dropdownStyle={styles.dropdownMenuStyle}
                    ></SelectDropdown>
            </View>

            <View style={styles.reviewCategory}>
                <Text>Purchase URL</Text>
                {selectedPurchaseURL ? (
                    <Feather 
                    name="chevron-down" 
                    size={24} 
                    color="black"
                    onPress={()=>handlePurchaseURLPress()}  />
                ) : (
                    <Feather 
                    name="chevron-right" 
                    size={24} 
                    color="black"
                    onPress={()=>handlePurchaseURLPress()}  />
                )}
                
            </View>
            {selectedPurchaseURL &&
                <View style={styles.textInputContainer}>
                    <TextInput 
                    placeholder="Enter the URL for the item..." 
                    placeholderTextColor={'grey'}
                    style={styles.textInputStyles}
                    onChangeText={(text)=>onChange('reviewPurchaseUrl', text)} />
                    
                </View>}
            <View style={styles.reviewCategory}>
                <Text>Purchase Date</Text>
                {selectedPurchaseDate ? (
                    <Feather 
                    name="chevron-down" 
                    size={24} 
                    color="black"
                    onPress={()=>handlePurchaseDatePress()}  />
                ) : (
                    <Feather 
                    name="chevron-right" 
                    size={24} 
                    color="black"
                    onPress={()=>handlePurchaseDatePress()}  />
                )}
            </View>
            {selectedPurchaseDate &&
                <View style={styles.textInputContainer}>
                    <TextInput 
                    placeholder="Choose the date of purchase..." 
                    placeholderTextColor={'grey'}
                    style={styles.textInputStyles}
                    onChangeText={(text)=>onChange('reviewPurchaseDate', text)} />
                    
                </View>}
            
            
        </View>
    )
}

export default CreateReviewFormDetailsRemain;

const styles = StyleSheet.create({
    captionHeader:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingBottom:5,
        paddingRight:10,
        paddingLeft:10,
        borderBottomWidth:1,
        borderBottomColor:'lightgrey',
        height:100
    },
    reviewCategory:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingBottom:5,
        paddingRight:10,
        paddingLeft:10,
        borderBottomWidth:1,
        borderBottomColor:'lightgrey',
        height:45
    },
    dropdownButtonStyle: {
        width: 140,
        height: 40,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
      dropdownButtonTxtStyle: {
        fontSize: 12,
        fontWeight: '500',
        paddingRight: 15,

      },
      dropdownButtonArrowStyle: {
        fontSize: 18,
        paddingRight: 5,
        paddingTop:2
      },
      dropdownButtonIconStyle: {
        fontSize: 20,
        marginRight: 8,
        color: '#F7A70B',
      },
      dropdownMenuStyle: {
        // backgroundColor: '#E9ECEF',
        borderRadius: 8,
      },
      dropdownItemStyle: {
        width: 140,
        flexDirection: 'row',
        paddingLeft:5,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8
      },
      dropdownItemTxtStyle: {
        flex: 1,
        fontSize: 12,
        fontWeight: '500',
      },
      dropdownItemIconStyle: {
        fontSize: 12,
        marginRight: 8,
        color: '#F7A70B',
      },
      dropdownItemIconStyle1: {
        fontSize: 12,
        marginRight: 8,
        color: 'grey',
      },

        textInputContainer: {
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingBottom: 5,
            paddingRight: 10,
            paddingLeft: 10,
            borderBottomWidth: 1,
            borderBottomColor: 'lightgrey',
            height: 45,
        },
        textInputStyles: {
            width: '100%',
            height: 40,
            borderRadius: 12,
            paddingLeft: 10,
            marginTop: 5,
            fontStyle: 'italic',
        },
        buyButtonStyle: {
            padding: 10,
            margin: 10,
            borderRadius: 15,
            alignItems: 'center',
            borderWidth: 0.5,
            borderColor: 'lightgrey',
            height: 40,
        },
        buttonContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 5,
            paddingRight: 10,
            paddingLeft: 10,
            borderBottomWidth: 1,
            borderBottomColor: 'lightgrey',
            height: 45,
        },
})
