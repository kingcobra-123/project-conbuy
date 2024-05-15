import React, { Component, useState, useEffect, useRef } from "react";
import { Text, View, ScrollView } from "react-native";

import CreateReviewHeader from "./createreviewheader";
import CreateReviewUserDetails from "./createreviewuserdetails";
import CreateReviewFormDetails from "./createreviewformdetails";
import CreateReviewFormImageHandler from "./createreviewformimagehandler";
import CreateReviewFormDetailsRemain from "./createreviewformdetailsremain";
import FullScreenModal from "./utilities/fullscreenmodal";
import Uploading from "./utilities/uploadingtext";
import CreatePostRender from "./utilities/dbwritestatushandler";
import CreateReview from "./utilities/createreviewhandler";
import { useSelector } from "react-redux";

const CreateReviewRender = ({ navigation }) => {
  const [fullScreenModal, setFullScreenModal] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [uploadModal, setUploadModal] = useState(false);
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(false);
  const [formDetails, setFormDetails] = useState({});
  const userId = useSelector((state) => state.user._id);
  const token = useSelector((state) => state.token);

  const navigationRef = React.useRef(null);

  const openFullScreenModal = () => {
    setFullScreenModal(true);
  };

  const closeFullScreenModal = () => {
    setFullScreenModal(false);
  };

  const updateDisplayText = (text) => {
    setDisplayText(text);
  };

  const openUploadModal = () => {
    setUploadModal(true);
  };

  const closeUploadModal = () => {
    setUploadModal(false);
  };

  // const userName = UserName();
  const handleCreatePost = async () => {
    setUploadModalVisible(true);
    try {
      const response = await CreateReview(formDetails);
      if (response.success) {
        console.log(response.message);
        setUploadStatus("success");
        setFormDetails([]);
      } else {
        console.log(response.message);
        setUploadStatus("failed");
      }
    } catch (error) {
      console.log("Error in CreatePost", error);
      setUploadStatus("failed");
    } finally {
      setTimeout(() => {
        setUploadModalVisible(false);
      }, 2000);
    }
  };

  console.log(JSON.stringify(formDetails, null, 2));

  const handleUpload = (name, value) => {
    setFormDetails((prevState) => ({
      ...formDetails,
      userId: userId,
      token: token,
      [name]: value,
    }));
  };

  const handleImageUpload = (name, [value]) => {
    setFormDetails((prevState) => ({
      ...formDetails,
      [name]: [value],
    }));
  };

  // console.log(JSON.stringify(formDetails, null, 2));

  return (
    <View style={{ flex: 1 }}>
      <CreateReviewHeader
        openUploadModal={openUploadModal}
        handleUpload={handleUpload}
        handleUploadData={handleCreatePost}
      />
      <ScrollView>
        <CreateReviewUserDetails />
        <CreateReviewFormDetails
          openFullScreenModal={openFullScreenModal}
          displayText={displayText}
        />
        <CreateReviewFormImageHandler onChangeImage={handleUpload} />
        <CreateReviewFormDetailsRemain
          formData={formDetails}
          onChange={handleUpload}
        />
        <FullScreenModal
          formData={formDetails}
          onChangeReviewDesc={handleUpload}
          isVisible={fullScreenModal}
          closeFullScreenModal={closeFullScreenModal}
          updateDisplayText={updateDisplayText}
        />
        {uploadModalVisible ? (
          <CreatePostRender
            uploadStatus={uploadStatus}
            isVisible={uploadModal}
            closeUploadModal={closeUploadModal}
          />
        ) : null}
      </ScrollView>
    </View>
  );
};

export default CreateReviewRender;
