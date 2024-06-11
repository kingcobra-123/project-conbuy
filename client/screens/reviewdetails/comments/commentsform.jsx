import React, { useState } from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import axios from "axios";

const ReviewCommentsForm = ({ postId, parentCommentId, onCommentAdded }) => {
  const [comment, setComment] = useState("");
  const auth = useSelector((state) => state.token);
  const userId = useSelector((state) => state.user._id);

  const handleCreateComment = async () => {
    if (comment.trim() === "") return;
    const config = {
      headers: {
        Authorization: `Bearer ${auth}`,
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    };
    const body = JSON.stringify({ content: comment });
    try {
      const response = await axios.post(
        `http://localhost:3001/posts/review/createcomment/${postId}`,
        { userId, content: comment, postId, parentCommentId },
        config
      );
      onCommentAdded(response.data);
      setComment(" ");
    } catch (error) {
      console.error("Failed to create comment", error);
    }
  };

  return (
    <View style={{ backgroundColor: "white" }}>
      {/* <Text style={{ paddingLeft: 5, paddingTop: 5, fontSize: 12 }}>
        5 Comments
      </Text> */}
      <View style={styles.commentBar}>
        <TextInput
          style={styles.commentInput}
          placeholder="Post comments"
          autoCapitalize="none"
          onChangeText={(text) => setComment(text)}
        ></TextInput>
        <MaterialCommunityIcons
          name="send-circle"
          size={33}
          color="#F7A70B"
          onPress={() => handleCreateComment()}
        />
      </View>
    </View>
  );
};

export default ReviewCommentsForm;

const styles = StyleSheet.create({
  commentBar: {
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 10,
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "white",
    backgroundColor: "white",
  },
  commentInput: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 20,
    flex: 1,
    height: 30,
    borderColor: "grey",
    borderWidth: 0.7,
    paddingLeft: 5,
    borderRadius: 20,
    backgroundColor: "#ffff",
    marginRight: 20,
  },
});
