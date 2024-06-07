import React, { Component } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { AntDesign, FontAwesome6 } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const ReviewContentDetails = ({ reviewData }) => {
  const reviewDetails = reviewData;

  return (
    <View style={styles.detailsContainer}>
      <View style={styles.Title}>
        <Text style={styles.postTitle}>{reviewDetails.description}</Text>
        {reviewDetails.buyOrNotBuy ? (
          <View style={styles.postIcons}>
            <AntDesign
              name="like1"
              size={18}
              color="#F7A70B"
              style={styles.postIconStyle1}
            />
          </View>
        ) : (
          <View style={styles.postIcons}>
            <AntDesign
              name="dislike1"
              size={18}
              color="red"
              style={styles.postIconStyle1}
            />
          </View>
        )}
      </View>
      <View style={{ flex: 1, height: 500 }}>
        <Text>{reviewDetails.content}</Text>
        <View style={styles.commentheader}>
          <View style={styles.header}>
            <FontAwesome6 name="heart" size={28} color="black" />
            <Text style={styles.reviewcontent}> 3 likes</Text>
          </View>
          <View style={styles.header}>
            <FontAwesome6 name="comment" size={28} color="black" />
            <Text style={styles.reviewcontent}> 5 comments</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ReviewContentDetails;

const styles = StyleSheet.create({
  Title: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
    height: 80,
  },
  postIcons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 10,
  },
  postIconStyle1: {
    padding: 5,
  },
  detailsContainer: {
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
    width: width,
    height: 500,
    backgroundColor: "white",
  },
  postTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "black",
  },
  commentheader: {
    flexDirection: "row",
    padding: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  reviewcontent: {
    fontSize: 14,
    fontWeight: "400",
    justifyContent: "space-evenly",
    paddingTop: 2,
    paddingLeft: 5,
    paddingRight: 10,
  },
});
