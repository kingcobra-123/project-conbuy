import React, {
  Component,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";
import {
  differenceInDays,
  differenceInHours,
  formatDistanceToNow,
} from "date-fns";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import ReviewContentHeader from "./header";
import ReviewContentMedia from "./media";
import ReviewContentDetails from "./details";
import ReviewCommentsForm from "./comments/commentsform";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import axios from "axios";
import ReviewComments from "./comments/reviewcomments";
import { format } from "date-fns";

const ReviewContentRender = () => {
  const route = useRoute();

  const [loading, setLoading] = useState(true);
  const [listing, setListing] = useState([]);
  const [mediaData, setMediaData] = useState([]);
  const { id } = route.params || { id: "66432ad025d935972a6a7191" };
  const videoRef = useRef(null);
  const auth = useSelector((state) => state.token);
  const [comments, setComments] = useState([]);
  const [replyComments, setReplyComments] = useState([]);
  const [visibleReplies, setVisibleReplies] = useState({});
  const [replyingToCommentId, setReplyingToCommentId] = useState(null);
  const [currentParentCommentId, setCurrentParentCommentId] = useState(null);

  const commendId = "6666706e9c0e3c9d19ba2577";

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

        const comments = await axios.get(
          `http://localhost:3001/posts/review/comments/${commendId}`,
          config
        );
        const reviewComments = comments.data;
        const rootComments = reviewComments.rootComments;
        const replyComments = reviewComments.replyComments;

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
        // console.log(JSON.stringify(rootComments, null, 2));
        // console.log(JSON.stringify(replyComments, null, 2));
        // console.log(replyComments["66657b760d02bbb687e32b71"]);
        setReplyComments(replyComments);
        setComments(rootComments);
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

  const renderHeader = useCallback(
    () => (
      <ScrollView>
        <ReviewContentMedia mediaData={mediaData} />
        <ReviewContentDetails reviewData={listing} comments={comments} />
        <ReviewCommentsForm
          postId={commendId}
          parentCommentId={currentParentCommentId}
          onCommentAdded={handleCommentAdded}
        />
      </ScrollView>
    ),
    [mediaData, listing, comments]
  );

  const formatDate = (date) => {
    const now = new Date();
    const commentDate = new Date(date);

    const hoursDifference = differenceInHours(now, commentDate);
    const daysDifference = differenceInDays(now, commentDate);

    if (daysDifference === 0) {
      return `${hoursDifference} hrs ago`;
    } else {
      return `${daysDifference} days ago`;
    }
  };

  const toggleRepliesVisibility = useCallback((commentId) => {
    setVisibleReplies((prevState) => ({
      ...prevState,
      [commentId]: !prevState[commentId],
    }));
  }, []);

  const toggleReplyingToCommentId = (commentId) => {
    setReplyingToCommentId((prevState) =>
      prevState === commentId ? null : commentId
    );
    setCurrentParentCommentId((prevState) =>
      prevState === commentId ? null : commentId
    );
  };

  const handleCommentAdded = (newComment) => {
    if (newComment.parentCommentId) {
      setReplyComments((prevState) => ({
        ...prevState,
        [newComment.parentCommentId]: [
          ...(prevState[newComment.parentCommentId] || []),
          newComment,
        ],
      }));
    } else {
      setComments((prevState) => [newComment, ...prevState]);
    }
  };

  const renderReplies = (parentCommentId) => {
    const replies = replyComments[parentCommentId] || [];
    return replies.map((reply) => (
      <View key={reply.commentId} style={styles.commentContainer}>
        <Image
          source={{ uri: reply.userId.picturePath }}
          style={{ width: 30, height: 30, borderRadius: 30, marginTop: 5 }}
        />
        <View style={{ flexDirection: "column", paddingLeft: 5 }}>
          <Text style={styles.commentText}>{reply.userId.displayName}</Text>
          <Text style={styles.commentText}>{reply.content}</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.commentText}>
              {formatDate(reply.createdAt)}
            </Text>
            <EvilIcons name="heart" size={15} color="black" />
            <MaterialCommunityIcons
              name="reply-circle"
              size={15}
              color="#F7A70B"
              onPress={() => toggleReplyingToCommentId(reply.commentId)}
            />
            <Text style={{ fontSize: 10, paddingLeft: 5 }}>Reply</Text>
          </View>
          {replyingToCommentId === reply.commentId && (
            <ReviewCommentsForm
              postId={commendId}
              parentCommentId={currentParentCommentId}
              onCommentAdded={handleCommentAdded}
            />
          )}
        </View>
      </View>
    ));
  };

  return (
    <View style={{ flex: 1 }}>
      <ReviewContentHeader />

      <FlatList
        data={comments}
        keyExtractor={(item) => item._id}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <View>
            <View style={styles.commentContainer}>
              <Image
                source={{ uri: item.userId.picturePath }}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 30,
                  marginTop: 5,
                }}
              ></Image>
              <View style={{ flexDirection: "column", paddingLeft: 5 }}>
                <Text style={styles.commentText}>
                  {item.userId.displayName}
                </Text>
                <Text style={styles.commentText}>{item.content}</Text>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.commentText}>
                    {formatDate(item.createdAt)}
                  </Text>
                  <EvilIcons name="heart" size={15} color="black" />
                  <MaterialCommunityIcons
                    name="reply-circle"
                    size={15}
                    color="#F7A70B"
                    onPress={() => toggleReplyingToCommentId(item.commentId)}
                  />
                  <TouchableOpacity
                    onPress={() => toggleRepliesVisibility(item.commentId)}
                  >
                    <Text style={{ fontSize: 10, paddingLeft: 5 }}>
                      {replyComments[item.commentId] &&
                      replyComments[item.commentId].length > 0
                        ? visibleReplies[item.commentId]
                          ? "Hide replies"
                          : "Show replies"
                        : "Reply"}
                    </Text>
                  </TouchableOpacity>
                </View>
                {visibleReplies[item.commentId] &&
                  renderReplies(item.commentId)}
              </View>
            </View>
            {replyingToCommentId === item.commentId && (
              <ReviewCommentsForm
                postId={commendId}
                parentCommentId={currentParentCommentId}
                onCommentAdded={handleCommentAdded}
              />
            )}
          </View>
        )}
      />
    </View>
  );
};

export default ReviewContentRender;

const styles = StyleSheet.create({
  commentContainer: {
    flexDirection: "row",
    padding: 5,
    backgroundColor: "white",
  },
  comment: {
    backgroundColor: "#f9f9f9",
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  commentText: {
    fontSize: 10,
  },
});
