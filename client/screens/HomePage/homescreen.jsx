import React, { Component, useEffect, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { useSelector } from "react-redux";
import { Ionicons, FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLogout } from "../../state";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const [highLevelCategory, setHighLevelCategory] = useState([]);
  const [mainCategories, setMainCategories] = useState([]);
  const [sofa, setSofa] = useState([]);
  const [tv, setTv] = useState([]);
  const [mattress, setMattress] = useState([]);
  const auth = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const onPressHandles = () => {
    dispatch(
      setLogout({
        user: null,
        token: null,
      })
    );
    navigation.navigate("Landing");
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/auth/categories"
        );
        const data = response.data;

        const highLevelCategoryData = data.map((category) => ({
          category_name: category.categoryName,
          category_image: category.categoryImage,
        }));
        const mainCategories_temp = data.map((category) => ({
          mainCategories: category.mainCategories,
        }));
        const mainCategories = mainCategories_temp.filter(
          (category) =>
            category.mainCategories && category.mainCategories.length > 0
        );

        const types = mainCategories.flatMap((category) =>
          category.mainCategories.flatMap((mainCategory) =>
            mainCategory.types.map((type) => ({
              mainCategoryName: mainCategory.name,
              typeName: type.typeName,
              typeImage: type.typeImage,
            }))
          )
        );

        const sofa = types.filter(
          (type) => type.mainCategoryName === "Sofa and Couch"
        );
        const tv = types.filter((type) => type.mainCategoryName === "TV's");
        const mattress = types.filter(
          (type) => type.mainCategoryName === "Mattress"
        );

        setSofa(sofa);
        setTv(tv);
        setMattress(mattress);
        setHighLevelCategory(highLevelCategoryData);
      } catch (error) {
        console.log("Error fetching categories: ", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <SafeAreaView style={{ height: "110%" }}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {/* <Octicons name="three-bars" size={24} color="black" style={styles.headerIcon}/> */}
          <Text style={styles.headerTitle}>ConBuy!</Text>
        </View>
        <View style={styles.headerRight}>
          <FontAwesome5
            name="user-circle"
            size={24}
            color="black"
            style={styles.headerIcon}
            onPress={() => onPressHandles()}
          />
          <Ionicons
            name="notifications-outline"
            size={26}
            color="black"
            style={styles.headerIcon}
          />
          <FontAwesome6
            name="sack-dollar"
            size={22}
            color="black"
            style={styles.headerIcon}
          />
        </View>
      </View>
      <View style={styles.headerSearchBar}>
        <TextInput
          style={styles.searchBar}
          placeholder="Conbuy it!!!!"
          autoCapitalize="none"
        ></TextInput>
      </View>
      <View style={styles.categoryStoryBar}>
        <View style={styles.flatListStory}>
          <FlatList
            data={highLevelCategory}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity>
                <Image
                  source={{ uri: item.category_image }}
                  style={styles.categoryStoryCardImage}
                />
                <Text style={styles.storyTitle}>{item.category_name}</Text>
              </TouchableOpacity>
            )}
          ></FlatList>
        </View>
      </View>
      <ScrollView>
        <View style={styles.categoryHeader}>
          <Text style={styles.categoryTitle}>Sofa & Couch</Text>
          <Ionicons name="arrow-forward-circle-sharp" size={30} color="grey" />
        </View>
        <View>
          <FlatList
            data={sofa}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => onPressHandler(item.name)}>
                <View key={index} style={styles.categoryCard}>
                  <Image
                    source={{ uri: item.typeImage }}
                    style={styles.categoryCardImage}
                  />
                  <Text style={styles.cardTitle}>{item.typeName}</Text>
                </View>
              </TouchableOpacity>
            )}
          ></FlatList>
        </View>
        <View style={styles.categoryHeader}>
          <Text style={styles.categoryTitle}>Tv's</Text>
          <Ionicons name="arrow-forward-circle-sharp" size={30} color="grey" />
        </View>
        <View>
          <FlatList
            data={tv}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => onPressHandler(item.name)}>
                <View key={index} style={styles.categoryCard}>
                  <Image
                    source={{ uri: item.typeImage }}
                    style={styles.categoryCardImage}
                  />
                  <Text style={styles.cardTitle}>{item.typeName}</Text>
                </View>
              </TouchableOpacity>
            )}
          ></FlatList>
        </View>
        <View style={styles.categoryHeader}>
          <Text style={styles.categoryTitle}>Mattress</Text>
          <Ionicons name="arrow-forward-circle-sharp" size={30} color="grey" />
        </View>
        <View>
          <FlatList
            data={mattress}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => onPressHandler(item.name)}>
                <View key={index} style={styles.categoryCard}>
                  <Image
                    source={{ uri: item.typeImage }}
                    style={styles.categoryCardImage}
                  />
                  <Text style={styles.cardTitle}>{item.typeName}</Text>
                </View>
              </TouchableOpacity>
            )}
          ></FlatList>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 5,
    paddingRight: 10,
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
    height: "5%",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "600",
    paddingLeft: 5,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerIcon: {
    paddingRight: 10,
  },
  headerSearchBar: {
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 5,
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
  },
  searchBar: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 20,
    flex: 1,
    height: 40,
    borderColor: "grey",
    borderWidth: 0.7,
    paddingLeft: 5,
    borderRadius: 20,
    backgroundColor: "#ffff",
    marginRight: 5,
  },
  categoryStoryBar: {
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  categoryHeader: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
  },
  categoryCard: {
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 25,
    width: 250,
    height: 250,
    backgroundColor: "#fff",
    margin: 2,
    shadowColor: "lightgrey",
    flexWrap: "wrap",
    flexDirection: "row",
    borderRadius: 10,
    justifyContent: "center",
  },
  categoryCardImage: {
    width: "100%",
    height: "70%",
    borderRadius: 10,
    resizeMode: "contain",
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: "600",
    paddingLeft: 5,
  },
  categoryStoryCardImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
    marginLeft: 10,
    resizeMode: "cover",
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: "600",
    paddingLeft: 5,
  },
  storyTitle: {
    fontSize: 12,
    paddingLeft: 5,
    paddingTop: 5,
    marginLeft: 10,
    paddingBottom: 5,
  },
  flatListStory: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
  },
});
