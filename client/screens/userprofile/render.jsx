import { View, Text } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import UserProfileHeader from "./header";
import UserProfilePosts from "./posts";

const UserProfileRender = () => {
  return (
    <ScrollView>
      <UserProfileHeader />
      <UserProfilePosts />
    </ScrollView>
  );
};

export default UserProfileRender;
