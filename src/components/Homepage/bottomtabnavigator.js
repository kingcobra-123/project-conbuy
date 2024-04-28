import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Listings from '../Homepage/listings';
import PostScreen from '../Createpage/postscreen';
import CreatePost from '../Createpage/createpost';
import FnFlistingsRender from '../friendsandfamily/fnflistings';
import DetailedListings from './detailedlistings';
import { createStackNavigator } from '@react-navigation/stack';
import { List } from 'react-native-paper';
import { list } from 'firebase/storage';
import { DefaultTheme, Provider as PaperProvider, useTheme } from 'react-native-paper';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';



import ListingsCopy from './listingscopy';
import HomepageCopy from './homepagecopy';
import UserProfileHeader from '../user/userprofileheader';
import UserProfileRender from '../user/userprofilerender';


const Tab = createMaterialBottomTabNavigator();
const Listingsstack = createStackNavigator()


const ListingsStackScreen =() =>{
  
    return(
        <Listingsstack.Navigator screenOptions={{headerShown:false}}>
            <Listingsstack.Screen name = "Listings" component={Listings} screenOptions={{headerShown:false}}/>
            <Listingsstack.Screen name = "DetailedListings" component = {DetailedListings} screenOptions={{headerShown:false}} />
        </Listingsstack.Navigator>
    )
}


const MyTabs = ()=> {
  const theme = useTheme();
  theme.colors.secondaryContainer = "transparent"
  theme.colors.tabBadge = '#fff4b8'
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#F7A70B"
      inactiveColor="#392B03"
      shifting={true}
      barStyle={{ backgroundColor: '#ffff', height: 90 }
      }
    >
      <Tab.Screen
        name="Home"
        component={HomepageCopy}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
          tabBarColor: '#ffff'
        }}
      />
      <Tab.Screen
        name="Listings"
        component={ListingsCopy}
        options={{
          tabBarLabel: 'Discover',
          tabBarIcon: ({ color }) => (
            <Ionicons name="search-outline" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Create"
        component={PostScreen} 
        options={{
          tabBarLabel: 'Create',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="cart-plus" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Friends"
        component={FnFlistingsRender} 
        options={{
          tabBarLabel: 'Friends',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user-friends" size={23} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={UserProfileRender} 
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-circle" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;
