import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setLogIn } from "../../state";
import API_BASE_URL from "../../apiconfig";

function SignIn({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const url = `http://localhost:3001/auth/login`;

  const handleLogIn = async () => {
    const user = {
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(url, user);
      dispatch(
        setLogIn({
          user: response.data.user,
          token: response.data.token,
        })
      );
      navigation.replace("Home");
    } catch (error) {
      console.log("Login", error.message);
      alert("Login Failed: " + error.message);
    }
  };

  const onPressNoAccountHandler = () => {
    navigation.replace("Register");
  };
  const onPressForgetPasswordHandler = () => {
    navigation.navigate("ForgetPassword");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text1}> Conbuy!</Text>
      <Text style={styles.text2}>be REAL</Text>
      <Text style={styles.text3}>Welcome back!</Text>
      <Text style={styles.text4}>Help your community</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={"#57636C"}
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={(text) => setEmail(text)}
      ></TextInput>
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={"#57636C"}
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      ></TextInput>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleLogIn()}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.text5}>Sign In</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressForgetPasswordHandler}>
        <Text style={styles.text6}>Forgot Password</Text>
      </TouchableOpacity>
      <Text style={styles.text7}>or Sign in With</Text>
      <TouchableOpacity style={styles.button1}>
        <Text style={styles.text8}>Continue with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button1}>
        <Text style={styles.text8}>Continue with Apple</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onPressNoAccountHandler()}>
        <Text style={styles.text6}>Don't have an account?</Text>
      </TouchableOpacity>
    </View>
  );
}

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff4b8",
  },
  text1: {
    paddingTop: 100,
    fontSize: 36,
    fontWeight: "600",
    color: "#2F4858",
  },
  text2: {
    fontSize: 14,
    color: "#2F4858",
  },
  text3: {
    fontSize: 16,
    paddingTop: 35,
    fontWeight: "500",
    color: "#2F4858",
  },
  text4: {
    fontSize: 12,
    paddingBottom: 15,
    color: "#2F4858",
  },
  text5: {
    fontSize: 22,
    fontWeight: "500",
    color: "#2F4858",
  },
  text6: {
    fontSize: 16,
    paddingTop: 8,
    textDecorationLine: "underline",
    color: "#2F4858",
  },
  text7: {
    fontSize: 16,
    paddingTop: 8,
    paddingBottom: 5,
    color: "#2F4858",
  },
  text8: {
    fontSize: 16,
    fontWeight: "500",
    color: "#2F4858",
  },
  input: {
    height: 50,
    width: "70%",
    borderColor: "#fffafa",
    borderWidth: 2,
    marginBottom: 16,
    padding: 8,
    borderRadius: 50,
    backgroundColor: "#fffafa",
  },

  button: {
    backgroundColor: "#F7A70B",
    borderWidth: 2,
    borderColor: "#F7A70B",
    borderRadius: 30,
    minWidth: "50%",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  button1: {
    backgroundColor: "#F7A70B",
    borderWidth: 2,
    borderColor: "#F7A70B",
    borderRadius: 30,
    minWidth: "60%",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    margin: 5,
  },
});
