import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PostScreen from '../Createpage/postscreen';
import CreatePost from '../Createpage/createpost';
import FnFlistingsRender from '../friendsandfamily/fnflistings';
import { createStackNavigator } from '@react-navigation/stack';
import { List } from 'react-native-paper';
import { list } from 'firebase/storage';
import { DefaultTheme, Provider as PaperProvider, useTheme } from 'react-native-paper';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';




import HomepageCopy from './homepagecopy';
import UserProfileRender from '../user/userprofilerender';
import SearchReviewsRender from '../searchreviews/searchreviewsrender';

import ReviewContentRender from '../DetailsPage/reviewcontentrender';


const Tab = createMaterialBottomTabNavigator();
const Listingsstack = createStackNavigator()


const ListingsStackScreen = () => {
  return (
    <Listingsstack.Navigator screenOptions={{ headerShown: false }}>
      <Listingsstack.Screen name="searchreviews" component={SearchReviewsRender}/>
      <Listingsstack.Screen
        name="DetailedListings"
        component={ReviewContentRender}
        options={({ route, navigation }) => ({
          tabBarStyle: { display: getTabBarVisibility(route, navigation) ? 'none' : 'flex' },
        })}
      />
    </Listingsstack.Navigator>
  );
}
function getTabBarVisibility(route, navigation) {
  // Assume the 'Details' screen shouldn't show the tab bar
  const routeName = getFocusedRouteNameFromRoute(route) ?? '';
  return routeName === 'DetailedListings';
  console.log(routeName)
}


const MyTabs = ()=> {
  const theme = useTheme();
  theme.colors.secondaryContainer = "transparent"
  theme.colors.tabBadge = '#fff4b8'
  return (
    <Tab.Navigator
      initialRouteName="homepage"
      activeColor="#F7A70B"
      inactiveColor="#392B03"
      shifting={true}
      barStyle={{ backgroundColor: 'white', height: 90 }
      }
    >
      <Tab.Screen
        name="homepage"
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
        component={ListingsStackScreen}
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
