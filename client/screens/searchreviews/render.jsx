import { View, Text, ScrollView } from "react-native";
import React from "react";
import SearchReviewsHeader from "./header";
import SearchReviewsFilters from "./filters";
import SearchReviewsContent from "./content";
import { useSelector } from "react-redux";
import { useState, useEffect, useContext } from "react";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { useInfiniteQuery } from "react-query";
import API_BASE_URL from "../../apiconfig";

const SearchReviewRender = () => {
  const route = useRoute();
  const auth = useSelector((state) => state.token);

  const [proptitle, setPropTitle] = useState("");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reviewUserData, setReviewUserData] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [filters, setFilters] = useState("");
  const [nextPageURL, setNextPageURL] = useState("");
  const [loadNextPage, setLoadNextPage] = useState(true);
  // const initialUrl = "http://localhost:3001/posts?page=1&limit=5";

  // const handleLoadNextPage = () => {
  //   if (hasNextPage) {
  //     fetchNextPage();
  //   }
  // };

  // const fetchReviews = async ({
  //   pageParam = "http://localhost:3001/posts?page=${pageParam}&limit=5",
  // }) => {
  //   const config = {
  //     headers: {
  //       Authorization: `Bearer ${auth}`,
  //       "Content-Type": "application/json",
  //     },
  //   };
  //   const response = await axios.get(pageParam, config);
  //   const filteredReviews = proptitle
  //     ? response.data.results.filter(
  //         (item) =>
  //           item.category === proptitle && item.description.trim() !== ""
  //       )
  //     : response.data.results;
  //   return {
  //     reviews: filteredReviews,
  //     nextPage: response.data.info.nextPage.page,
  //   };
  // };

  // const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
  //   useInfiniteQuery("reviews", fetchReviews, {
  //     getNextPageParam: (lastPage) => lastPage.nextPage,
  //     initialData: () => fetchReviews({ pageParam: initialUrl }),
  //   });

  // const filteredPosts = filters
  //   ? data?.pages.flatMap((page) =>
  //       page.subcategory.filter((item) => item === filters)
  //     )
  //   : data?.pages;

  const updateTitle = (title) => {
    setPropTitle(title);
  };

  const updateFilters = (item) => {
    setFilters(item);
  };

  useEffect(() => {
    if (filters) {
      const filteredReviews = reviews.filter((item) => {
        return item.category === filters;
      });
      setReviewUserData(filteredReviews);
    } else {
      setReviewUserData(reviews);
    }
  }, [filters]);

  useEffect(() => {
    const title = route.params?.title;
    setPropTitle(title);
  }, [route.params?.title]);

  const fetchData = async (url) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${auth}`,
          "Content-Type": "application/json",
        },
      };
      const response = await axios.get(url, config);
      const reviews = response.data.results;
      const nextPage = response.data.info.nextPage.page;
      const filteredReviews = proptitle
        ? reviews.filter(
            (item) =>
              item.category === proptitle && item.description.trim() !== ""
          )
        : reviews;
      setReviews(filteredReviews);
      setReviewUserData(filteredReviews);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetchData(`http://localhost:3001/posts?page=1&limit=30`);
  }, []);

  return (
    <>
      <View>
        <SearchReviewsHeader updateTitle={updateTitle} />
        <SearchReviewsFilters updateFilter={updateFilters} />
        <ScrollView>
          <SearchReviewsContent
            data={reviewUserData}
            // handleLoadNextPage={handleLoadNextPage}
            // loading={isFetchingNextPage || status === "loading"}
          />
        </ScrollView>
      </View>
    </>
  );
};

export default SearchReviewRender;
