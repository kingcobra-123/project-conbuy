import React, { Component, useState, useContext } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import { userMetadata } from '../userprofile/usermetadata'
import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/FontAwesome5'




const CreateReviewUserDetails = () => {


  const userProfileData = useContext(userMetadata)
  const [dropdown, setDropdown] = useState(false)
  const [selectedItem, setSelectedItem] = useState({title: 'Public', icon: 'globe-americas'});

  const dropdownOptions = [
      {title: 'Public', icon: 'globe-americas'},
      {title: 'Private', icon: 'lock'}
  ]
    return (
        <View style={styles.userProfildeDataContainer}>
                <Image source={{uri: userProfileData.metadata[0].photoURL}}
                style={styles.profilePic}>
                </Image>
                <View style={{paddingLeft:10}}>
                    <Text style={styles.userTitle}>{userProfileData.metadata[0].displayName}</Text>
                    <View>
                        <SelectDropdown
                            data={dropdownOptions}
                            onSelect={(selectedItem, index) => {
                                setSelectedItem(selectedItem)
                            }}
                            renderButton={(selectedItem, isOpened) => {
                                        return (
                                            <View style={styles.dropdownButtonStyle}>
                                            {selectedItem && (
                                                <Icon name={selectedItem? selectedItem.icon:'globe-americas' } style={styles.dropdownButtonIconStyle} />
                                            )}
                                            
                                            <Text style={styles.dropdownButtonTxtStyle}>
                                                {selectedItem? selectedItem.title : 'Public'}
                                            </Text>
                                            <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
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
                </View>
        </View>
    )
}

export default CreateReviewUserDetails;


const styles = StyleSheet.create({

    userProfildeDataContainer:{
        flexDirection:'row',
        alignItems:'center',
        paddingBottom:5,
        paddingRight:10,
        paddingLeft:10,
        paddingTop:5,
        borderBottomWidth:1,
        borderBottomColor:'lightgrey',
        backgroundColor: '#E9ECEF',
        height: 50
    },
    profilePic:{
      width:50,
      height:50,
      borderRadius:50,
      borderWidth:1,
      borderColor:'lightgrey'
  },
    userTitle:{
        fontSize:14,
        fontWeight:'bold',
        paddingBottom: 2
    },

    dropdownButtonStyle: {
        width: 75,
        height: 20,
        backgroundColor: '#E9ECEF',
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      dropdownButtonTxtStyle: {
        flex: 1,
        fontSize: 12,
        fontWeight: '500',
        color: '#151E26',

      },
      dropdownButtonArrowStyle: {
        fontSize: 8,
        paddingRight: 5,
        paddingTop:2
      },
      dropdownButtonIconStyle: {
        fontSize: 12,
        marginRight: 8,
        color: '#F7A70B',
      },
      dropdownMenuStyle: {
        backgroundColor: '#E9ECEF',
        borderRadius: 8,
      },
      dropdownItemStyle: {
        width: '100%',
        flexDirection: 'row',
        paddingLeft:5,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
      },
      dropdownItemTxtStyle: {
        flex: 1,
        fontSize: 12,
        fontWeight: '500',
        color: '#151E26',
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

})
