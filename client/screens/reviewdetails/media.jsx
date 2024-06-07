import React, { Component, useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  Dimensions,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import { route, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Video } from "expo-av";
import Carousel from "react-native-snap-carousel";
import { FontAwesome6 } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const ReviewContentMedia = ({ mediaData }) => {
  const media = mediaData;
  const videoRef = useRef(null);

  const renderReview = ({ item }) => {
    if (item.type === "video") {
      return (
        <Video
          ref={videoRef}
          source={{ uri: item.url }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="contain"
          shouldPlay={true}
          isLooping={false}
          useNativeControls={true}
          style={styles.videoStyle}
        ></Video>
      );
    } else {
      return <Image source={{ uri: item.url }} style={styles.imageStyle} />;
    }
  };

  const handlePlaybackStatus = (status) => {
    if (!status.isPlaying) {
      videoRef.current
        .pauseAsync()
        .then(() => {})
        .catch((err) => {
          console.error("Error pausing video", err);
        });
    }
  };

  return (
    <ScrollView>
      <Carousel
        data={media}
        renderItem={renderReview}
        sliderWidth={width}
        itemWidth={width}
        layout={"default"}
        activeSlideAlignment={"center"}
        inactiveSlideOpacity={0.5}
        inactiveSlideScale={0.9}
        containerCustomStyle={{ flexGrow: 1 }}
        enableMomentum={true}
        isLooping={true}
        autoplay={true}
        autoplayDelay={300}
        autoplayInterval={2000}
        useNativeControls={true}
        onPlaybackStatusUpdate={handlePlaybackStatus}
        paginationProps={{
          dotStyle: {
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 8,
            backgroundColor: "rgba(255, 255, 255, 0.92)",
          },
          inactiveDotStyle: {
            // Define styles for inactive dots here
            backgroundColor: "rgba(255, 255, 255, 0.5)",
          },
          inactiveDotOpacity: 0.4,
          inactiveDotScale: 0.6,
        }}
      />
    </ScrollView>
  );
};

export default ReviewContentMedia;

const styles = StyleSheet.create({
  imageStyle: {
    width: width,
    height: 600,
    resizeMode: "cover",
    marginRight: 5,
  },

  videoStyle: {
    width: width,
    height: 600,
  },
});
