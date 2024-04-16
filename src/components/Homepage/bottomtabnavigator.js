import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomePage from './homepage';
import Listings from './listings';
import DetailedListings from './detailedlistings';
import { createStackNavigator } from '@react-navigation/stack';


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
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#F7A70B"
      inactiveColor="#392B03"
      barStyle={{ backgroundColor: '#ffff', height: 90 }}
    >
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Listings"
        component={ListingsStackScreen}
        options={{
          tabBarLabel: 'Listings',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="format-list-bulleted" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Create"
        component={Listings} // Change to your create component
        options={{
          tabBarLabel: 'Create',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="plus-circle" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Friends"
        component={Listings} // Change to your friends component
        options={{
          tabBarLabel: 'Friends',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-multiple" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Listings} // Change to your profile component
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
