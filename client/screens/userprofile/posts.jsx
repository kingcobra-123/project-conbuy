import React, { Component, useContext, useEffect, useState } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import MasonryList from "@react-native-seoul/masonry-list";
import { ScrollView } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import axios from "axios";
import API_BASE_URL from "../../apiconfig";

const UserProfilePosts = () => {
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const [userPosts, setUserPosts] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const sample = 2;

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };
        const userId = user._id;
        const response = await axios.get(
          `http://localhost:3001/posts/${userId}`,
          config
        );
        setUserPosts(response.data);
        console.log(JSON.stringify(response.data, null, 2));
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchUserPosts();
  }, [sample]);

  //   useEffect(() => {
  //     const fetchUserPosts = async () => {
  //       try {
  //         const userPosts = await getDocs(collection(Firebase_db, "reviews"));
  //         const userReviews_temp = userPosts.docs.map((docs) => ({
  //           ...docs.data(),
  //           id: docs.id,
  //           review_image_url: docs.data().review_image_url || [],
  //           review_title: docs.data().review_title || "No Title",
  //           review_buy_or_not_buy: docs.data().review_buy_or_not_buy,
  //           reviews_created_at: docs.data().reviews_created_at || "",
  //           review_username: docs.data().review_username || "",
  //           imageHeight: Math.floor(Math.random() * 200 + 150),
  //         }));
  //         const userReviews = userReviews_temp.filter((item) => {
  //           return item.review_username === "test2";
  //         });
  //         setUserPosts(userReviews);
  //       } catch (error) {
  //         console.error("Error fetching data", error);
  //       }
  //     };
  //     fetchUserPosts();
  //   }, [username]);

  const renderPaginationDots = (item) => (
    <View style={styles.dotContainer}>
      {item.picturePath.map((image, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            currentImageIndex[item.id] === index
              ? styles.activeDot
              : styles.inactiveDot,
          ]}
        />
      ))}
    </View>
  );

  const updateIndex = (id, index) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [id]: index,
    }));
  };

  const handleScroll = (id) => (event) => {
    const index = Math.ceil(
      event.nativeEvent.contentOffset.x /
        event.nativeEvent.layoutMeasurement.width
    );
    updateIndex(id, index);
  };

  const renderReview = ({ item, index }) => {
    return (
      <View style={{ padding: 2 }}>
        <ScrollView
          horizontal
          onScroll={handleScroll(item._id)}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          style={{
            width: "100%",
            flexGrow: 1,
            height: item.imageHeight,
          }}
        >
          {item.picturePath.map((image, index) => {
            return (
              <Image
                source={{ uri: image }}
                key={index}
                style={{ width: 200, height: item.imageHeight }}
              />
            );
          })}
        </ScrollView>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "lightgrey",
          }}
        >
          {renderPaginationDots(item)}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingRight: 10,
            }}
          >
            <Text
              style={{
                fontSize: 10,
                paddingLeft: 5,
              }}
            >
              #ConbuyTestPost
            </Text>
            {item.buyOrNotBuy ? (
              <View style={styles.postIcons1}>
                <AntDesign
                  name="like1"
                  size={18}
                  color="#F7A70B"
                  style={styles.postIconStyle1}
                />
              </View>
            ) : (
              <View style={styles.postIcons1}>
                <AntDesign
                  name="dislike1"
                  size={18}
                  color="red"
                  style={styles.postIconStyle1}
                />
              </View>
            )}
          </View>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: "black",
              padding: 5,
            }}
          >
            {item.description}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <MasonryList
        data={userPosts}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={renderReview}
      />
    </View>
  );
};

export default UserProfilePosts;

const styles = StyleSheet.create({
  postCardContainer: {},
  dotContainer: {
    bottom: 5,
    width: "50%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0)",
    marginLeft: 40,
    marginBottom: 5,
  },
  dot: {
    height: 3,
    width: 3,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#F7A70B",
  },
  inactiveDot: {
    backgroundColor: "gray",
  },
});
