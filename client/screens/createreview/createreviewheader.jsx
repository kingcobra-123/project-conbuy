import React, { Component, useContext, useState, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SelectDropdown from "react-native-select-dropdown";
import Icon from "react-native-vector-icons/FontAwesome5";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons/FontAwesome";
import { useIsFocused } from "@react-navigation/native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withSequence,
  FadeIn,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

const CreateReviewHeader = ({
  openUploadModal,
  handleUpload,
  handleUploadData,
}) => {
  const handleSharePress = () => {
    openUploadModal();
    handleUploadData();
  };

  const isFocused = useIsFocused();
  const scale = useSharedValue(1);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  useEffect(() => {
    if (isFocused) {
      scale.value = withSequence(
        withTiming(8, { duration: 250 }),
        withSpring(0.8)
      );
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={{ height: 105 }}>
      <View style={styles.header}>
        <Ionicons name="chevron-back" size={24} color="black" />
        <Text style={styles.headerTitle}>Create a review</Text>
        <TouchableOpacity
          style={styles.postButton}
          onPress={() => handleSharePress()}
        >
          <Animated.Image
            style={[animatedStyles, styles.image]}
            source={require("../../assets/images/app-logo.png")}
            entering={FadeIn}
          />
          <Text style={{ paddingRight: 5 }}>Share</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CreateReviewHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 5,
    paddingRight: 10,
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: "bold",
    paddingLeft: 30,
  },
  postButton: {
    padding: 8,
    backgroundColor: "#F7A70B",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    width: 90,
    flexDirection: "row",
  },
  image: {
    width: 40,
    height: 20,
    borderRadius: 10,
  },
});
