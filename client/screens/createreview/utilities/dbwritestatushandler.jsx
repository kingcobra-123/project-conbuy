import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  Modal,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

const CreatePostRender = ({
  uploadStatus,
  onClose,
  isVisible,
  closeUploadModal,
}) => {
  const [animation, setAnimation] = useState(new Animated.Value(0));
  useEffect(() => {
    if (uploadStatus === "success" || uploadStatus === "failed") {
      Animated.timing(animation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [uploadStatus]);

  const iconY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-50, 0],
  });

  const handlePress = () => {
    closeUploadModal();
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <BlurView
          intensity={100}
          style={[StyleSheet.absoluteFill, { position: "absolute" }]}
        ></BlurView>
        <View style={styles.blurContainer}>
          <Animated.View style={{ transform: [{ translateY: iconY }] }}>
            {uploadStatus === "success" ? (
              <View style={{ alignItems: "center" }}>
                <Text style={{ fontSize: 12, paddingTop: 10 }}>
                  Successfully Created Your Review...
                </Text>
                <AntDesign
                  style={{ alignSelf: "center", paddingTop: 8 }}
                  name="checkcircle"
                  size={24}
                  color="green"
                />
              </View>
            ) : uploadStatus === "failed" ? (
              <View
                style={{ justifyContent: "center", flexDirection: "column" }}
              >
                <Text
                  style={{ fontSize: 12, paddingTop: 10, alignSelf: "center" }}
                >
                  Failed Creating Your Review...
                </Text>
                <AntDesign
                  name="closecircle"
                  size={22}
                  color="red"
                  style={{ alignSelf: "center", paddingTop: 8 }}
                />
              </View>
            ) : null}
          </Animated.View>
          <View style={styles.separator}></View>
          <TouchableOpacity onPress={() => handlePress()}>
            <Text
              style={{ fontWeight: "600", color: "#F7A70B", paddingBottom: 30 }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CreatePostRender;

const styles = StyleSheet.create({
  separator: {
    height: 1,
    width: "90%",
    backgroundColor: "lightgrey",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  blurContainer: {
    width: "70%",
    height: 110,
    backgroundColor: "#E0E3E7",
    alignItems: "center",
    zIndex: 2,
    borderRadius: 12,
    rowGap: 15,
  },
});
