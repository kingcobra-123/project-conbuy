import React, { Component, useState, useEffect } from "react";
import { Text, View, ScrollView, Image, StyleSheet } from "react-native";
import MasonryList from "@react-native-seoul/masonry-list";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const SearchReviewsContent = ({ data, handleLoadNextPage }) => {
  const navigation = useNavigation();
  const [currentImageIndex, setCurrentImageIndex] = useState({});

  const renderPaginationDots = (item) => (
    <View style={styles.dotContainer}>
      {item.picturePath.map((image, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            currentImageIndex[item._id] === index
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
      event.nativeEvent.contentOffset /
        event.nativeEvent.layoutMeasurement.width
    );
    updateIndex(id, index);
  };

  const onPressReviewHandler = (id) => {
    navigation.navigate("DetailedListings", { id: id });
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
          <TouchableOpacity onPress={() => onPressReviewHandler(item._id)}>
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
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <MasonryList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={renderReview}
        onEndReached={handleLoadNextPage}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default SearchReviewsContent;

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
