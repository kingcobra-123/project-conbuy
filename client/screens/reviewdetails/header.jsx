import React, { Component } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, EvilIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ReviewContentHeader = () => {
  const navigation = useNavigation();

  const onPressBackHandler = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView style={{ height: 40 }}>
      <View style={styles.header}>
        <Ionicons
          name="chevron-back"
          size={24}
          color="black"
          onPress={() => onPressBackHandler()}
        />
        <Image
          style={styles.image}
          source={require("../../assets/images/app-logo.png")}
        />
        <View style={styles.headerRight}>
          <EvilIcons name="heart" size={28} color="black" />
          <EvilIcons name="share-apple" size={28} color="black" />
        </View>
        <Image></Image>
      </View>
    </SafeAreaView>
  );
};

export default ReviewContentHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 5,
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
    height: 30,
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  headerRight: {
    flexDirection: "row",
    justifyContent: "flex-end",
    flex: 1,
    paddingRight: 10,
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 40 / 2,
  },
});
