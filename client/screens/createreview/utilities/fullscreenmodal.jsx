import React, { Component, useState } from "react";
import {
  Text,
  View,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Keyboard } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ScrollView } from "react-native-gesture-handler";

const FullScreenModal = ({
  isVisible,
  updateDisplayText,
  closeFullScreenModal,
  onChangeReviewDesc,
}) => {
  const [textValue, setTextValue] = useState("");

  const handleDone = () => {
    updateDisplayText(textValue);
    closeFullScreenModal();
  };

  const DismissKeyboard = ({ children }) => {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
      </TouchableWithoutFeedback>
    );
  };

  const handleText = (text) => {
    onChangeReviewDesc("content", text);
    setTextValue(text);
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isVisible}
      style={{ backgroundColor: "red" }}
      onRequestClose={closeFullScreenModal}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.header}>
              <Text
                style={{ paddingLeft: 5, fontSize: 15, fontStyle: "italic" }}
              >
                Whats on your mind...
              </Text>
              <Ionicons
                name="close"
                size={24}
                color="black"
                onPress={() => handleDone()}
              />
            </View>
            <TextInput
              style={styles.fullScreenInput}
              onChangeText={(text) => handleText(text)}
              value={textValue}
              multiline={true}
              placeholder="Start typing..."
              placeholderTextColor="grey"
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleDone()}
            >
              <Text>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default FullScreenModal;

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    height: "100%",
    borderWidth: 1,
  },
  fullScreenInput: {
    flex: 1,
    fontSize: 15,
    textAlignVertical: "top",
    maxHeight: "53%",
    paddingLeft: 5,
  },
  button: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#F7A70B",
    alignItems: "center",
    borderRadius: 20,
    width: "50%",
    alignSelf: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    height: "90%",
  },
  closeButton: {
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  closeButtonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
    height: 50,
  },
});
