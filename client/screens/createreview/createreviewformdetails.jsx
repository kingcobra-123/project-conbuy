import React, { Component, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const CreateReviewFormDetails = ({ openFullScreenModal, displayText }) => {
  const handlePress = () => {
    openFullScreenModal();
  };

  return (
    <View>
      <TouchableOpacity onPress={() => handlePress()}>
        <View style={styles.header}>
          {displayText ? (
            <Text style={styles.headerTitle}>{displayText}</Text>
          ) : (
            <Text style={styles.headerTitle}>Whats on your mind...?</Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CreateReviewFormDetails;

const styles = StyleSheet.create({
  header: {
    height: 250,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 5,
    paddingRight: 10,
    paddingLeft: 10,
  },
  headerTitle: {
    fontSize: 14,
    paddingTop: 10,
  },
});
