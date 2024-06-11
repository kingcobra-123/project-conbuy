import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import {
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome5,
} from "@expo/vector-icons";

import HomeScreen from "../screens/HomePage/homescreen";
import SearchReviewRender from "../screens/searchreviews/render";
import CreateReviewRender from "../screens/createreview/createreviewrender";
import FnFListingsRender from "../screens/fnf/render";
import UserProfileRender from "../screens/userprofile/render";
import FnFContent from "../screens/fnf/content";
import ReviewContentRender from "../screens/reviewdetails/render";
import { useTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

const Tab = createMaterialBottomTabNavigator();
const ListingsStack = createStackNavigator();

const ListingsStackScreen = ({ navigation, route }) => {
  return (
    <ListingsStack.Navigator screenOptions={{ headerShown: false }}>
      <ListingsStack.Screen
        name="searchreviews"
        component={SearchReviewRender}
      />
      <ListingsStack.Screen
        name="DetailedListings"
        component={ReviewContentRender}
        options={({ route, navigation }) => ({
          tabBarStyle: { display: "none" },
        })}
      />
    </ListingsStack.Navigator>
  );
};

const BottomTabNavigator = () => {
  const theme = useTheme();
  theme.colors.secondaryContainer = "transparent";
  theme.colors.tabBadge = "#fff4b8";
  return (
    <Tab.Navigator
      initialRouteName="homepage"
      activeColor="#F7A70B"
      inactiveColor="#392B03"
      shifting={true}
      barStyle={{ backgroundColor: "white", height: 90 }}
    >
      <Tab.Screen
        name="homepage"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Listings"
        component={ListingsStackScreen}
        options={{
          tabBarLabel: "Discover",
          tabBarIcon: ({ color }) => (
            <Ionicons name="search-outline" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Create"
        component={CreateReviewRender}
        options={{
          tabBarLabel: "Create",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="cart-plus" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Friends"
        component={FnFListingsRender}
        options={{
          tabBarLabel: "Friends",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user-friends" size={23} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={UserProfileRender}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-circle"
              color={color}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
