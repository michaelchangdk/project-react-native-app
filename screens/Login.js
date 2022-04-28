import React, { useState, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Alert,
  Keyboard,
} from "react-native";
import { Input } from "react-native-elements";
import { auth } from "../firebase";
import { signInAnonymously, updateProfile } from "firebase/auth";
import { AuthContext } from "./AuthProvider";
import background from "../assets/image.jpg";
import {
  useFonts,
  DMMono_300Light,
  DMMono_400Regular,
  DMMono_500Medium,
} from "@expo-google-fonts/dm-mono";

const { width, height } = Dimensions.get("screen");

const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const { user, setUser } = useContext(AuthContext);
  const { userid, setUserid } = useContext(AuthContext);
  const [error, setError] = useState("");

  const signin = () => {
    if (username.length < 6) {
      setError("Username must be minimum 6 characters.");
    } else {
      setError("");
      signInAnonymously(auth, username)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: username,
          });
          setUser(username);
          setUserid(user.uid);
          // navigation.navigate("Home");
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  const typeUsername = (text) => {
    setUsername(text);
    if (username.length >= 6) {
      setError("");
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const [loaded] = useFonts({
    DMMono_300Light,
    DMMono_400Regular,
    DMMono_500Medium,
  });

  if (!loaded) {
    return null;
  }
  return (
    <View style={styles.backgroundcontainer}>
      <ImageBackground
        source={background}
        resizeMode="cover"
        style={styles.background}
      >
        <View style={styles.windowcontainer}>
          <View style={styles.windowheader}>
            <Text style={styles.windowheadertext}>0961742853</Text>
            {/* <TouchableOpacity style={styles.windowheaderbutton1}>
              <Text style={styles.windowheaderbuttontext}>_</Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              style={styles.windowheaderbutton}
              onPress={() => navigation.navigate("BlueScreen")}
            >
              <Text style={styles.windowheaderbuttontext}>✖</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.windowcontent}>
            <Text style={styles.title}>The Room</Text>
            <Input
              placeholder="Enter your username"
              labelName="Username:"
              value={username}
              style={styles.input}
              onChangeText={(text) => typeUsername(text)}
              autoCapitalize="none"
              spellCheck={false}
              autoCorrect={false}
              keyboardAppearance="light"
              maxLength={20}
            />
            {error.length > 0 && <Text style={styles.error}>{error}</Text>}
            <TouchableOpacity
              style={styles.loginbutton}
              onPress={signin}
              // disabled={username.length < 6}
            >
              <Text style={styles.buttontext}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  backgroundcontainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007F7F",
  },
  windowcontainer: {
    // flex: 1,
    borderWidth: 5,
    // borderColor: "#0055CF",
    width: width / 1.25,
    height: height / 1.3,
    borderLeftColor: "white",
    borderTopColor: "white",
    // backgroundColor: "rgba(235, 232, 216, .5)",
    backgroundColor: "#C0C0C0",
  },
  windowheader: {
    backgroundColor: "#00007F",
    height: 30,
    width: "97%",
    marginLeft: "1.5%",
    marginRight: "1.5%",
    marginTop: "1.5%",
    // justifyContent: "center",
    flexDirection: "row",
    // alignContent: "center",
  },
  windowheadertext: {
    color: "white",
    marginLeft: 10,
    fontSize: 17,
    marginTop: "auto",
    marginBottom: "auto",
    fontFamily: "DMMono_300Light",
  },
  windowheaderbutton1: {
    height: 18,
    width: 18,
    backgroundColor: "#C0C0C0",
    marginLeft: 5,
    borderWidth: 1,
    borderLeftColor: "white",
    borderTopColor: "white",
    marginTop: "auto",
    marginBottom: "auto",
  },
  windowheaderbutton: {
    height: 18,
    width: 18,
    backgroundColor: "#C0C0C0",
    marginLeft: "auto",
    marginRight: 5,
    borderWidth: 1,
    borderLeftColor: "white",
    borderTopColor: "white",
    marginTop: "auto",
    marginBottom: "auto",
  },
  windowheaderbuttontext: {
    textAlign: "center",
    fontFamily: "DMMono_500Medium",
  },
  windowcontent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    marginLeft: "5%",
    marginRight: "5%",
  },
  title: {
    fontSize: 26,
    marginBottom: 20,
    fontFamily: "DMMono_400Regular",
    textAlign: "center",
  },
  input: {
    marginTop: 10,
    marginBottom: -1,
    width: width / 1.5,
    height: height / 15,
    borderWidth: 3,
    borderRightColor: "white",
    borderBottomColor: "white",
    paddingLeft: 10,
    fontFamily: "DMMono_400Regular",
  },
  loginbutton: {
    width: width / 1.5,
    height: height / 15,
    // marginTop: 10,
    borderWidth: 3,
    borderLeftColor: "white",
    borderTopColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  buttontext: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: "DMMono_400Regular",
  },
  error: {
    fontFamily: "DMMono_400Regular",
    textAlign: "center",
    marginBottom: 20,
  },
  background: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Login;
