import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View, Image } from "react-native";
import axios from "axios";

const ReviewComments = ({ comments }) => {
  const reviewComments = comments;

  //   const id = "6663dd084d40ad89adc12a60";

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const config = {
  //           headers: {
  //             Authorization: `Bearer ${auth}`,
  //             "Content-Type": "application/json",
  //             "Cache-Control": "no-cache",
  //           },
  //         };
  //         const response = await axios.get(
  //           `http://localhost:3001/posts/review/comments/${id}`,
  //           config
  //         );
  //         const reviewComments = response.data;
  //         console.log(reviewComments);
  //         setComments(reviewComments);
  //       } catch (error) {
  //         console.error("Error fetching data", error);
  //       }
  //     };
  //   }, []);

  return (
    <View>
      <Text>Comments</Text>
      <Text>Comments</Text>
      <Text>Comments</Text>
      <Text>Comments</Text>
      <Text>Comments</Text>
      {/* <FlatList
        data={reviewComments}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.comment}>
            <Image
              source={{ uri: item.userId.picturePath }}
              style={{ width: 50, height: 50 }}
            ></Image>
            <Text style={styles.commentText}>{item.content}</Text>
          </View>
        )}
      /> */}
    </View>
  );
};

export default ReviewComments;

const styles = StyleSheet.create({
  commentContainer: {
    flex: 1,
    padding: 10,
  },
  comment: {
    backgroundColor: "#f9f9f9",
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  commentText: {
    fontSize: 16,
  },
});
