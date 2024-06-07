import React, { Component, useEffect, useState, useRef } from "react";
import { Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";

import ReviewContentHeader from "./header";
import ReviewContentMedia from "./media";
import ReviewContentDetails from "./details";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import axios from "axios";

const ReviewContentRender = () => {
  const route = useRoute();

  const [loading, setLoading] = useState(true);
  const [listing, setListing] = useState([]);
  const [mediaData, setMediaData] = useState([]);
  const { id } = route.params || { id: "66432ad025d935972a6a7191" };
  const videoRef = useRef(null);
  const auth = useSelector((state) => state.token);

  useEffect(() => {
    const fetchdata = async () => {
      setLoading(true);
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${auth}`,
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
          },
        };
        const response = await axios.get(
          `http://localhost:3001/posts/review/${id}`,
          config
        );
        const reviews = response.data;

        const media = [];
        const videos = reviews.videoPath || [];
        const images = reviews.picturePath || [];

        videos
          .filter((videoUrl) => videoUrl.trim() !== "")
          .forEach((videoUrl) => {
            media.push({ type: "video", url: videoUrl });
          });

        images.forEach((imageUrl) => {
          media.push({ type: "image", url: imageUrl });
        });
        setListing(reviews);
        setMediaData(media);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchdata();

    return () => {
      if (videoRef.current) {
        videoRef.current
          .unloadAsync()
          .catch((e) => console.log("Error unloading video:", e));
      }
    };
  }, []);

  return (
    <View>
      <ReviewContentHeader />
      <ScrollView style={{ height: 700 }}>
        <ReviewContentMedia mediaData={mediaData} />
        <ReviewContentDetails reviewData={listing} />
      </ScrollView>
    </View>
  );
};

export default ReviewContentRender;
