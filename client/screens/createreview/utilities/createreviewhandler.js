import axios from "axios";

const CreateReview = async ({
  token,
  userId,
  description,
  content,
  picturePath,
  videoPath,
  category,
  subCategory,
  purchaseLink,
  purchaseDate,
  buyOrNotBuy,
}) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post(
      `http://localhost:3001/posts/${userId}/createpost`,
      {
        userId,
        description,
        content,
        picturePath,
        videoPath,
        category,
        subCategory,
        purchaseLink,
        purchaseDate,
        buyOrNotBuy,
      },

      config
    );
    console.log(response.data);

    return { success: true, message: "Post created successfully!" };
  } catch (error) {
    return {
      success: false,
      message: "Failed to create post." + error,
      error: error,
    };
    console.log("Error creating post", error);
  }
};

export default CreateReview;
