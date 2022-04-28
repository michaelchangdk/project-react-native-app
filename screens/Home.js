import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from "react-native";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { AuthContext } from "./AuthProvider";
import background from "../assets/image.jpg";
import {
  useFonts,
  DMMono_300Light,
  DMMono_400Regular,
  DMMono_500Medium,
} from "@expo-google-fonts/dm-mono";
import Loading from "../components/Loading";

const { width, height } = Dimensions.get("screen");

const Home = ({ navigation }) => {
  const { user, setUser } = useContext(AuthContext);

  const signOutNow = (e) => {
    console.log(e);
    signOut(auth)
      .then(() => {
        setUser(null);
        // navigation.replace("Login");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const [loaded] = useFonts({
    DMMono_300Light,
    DMMono_400Regular,
    DMMono_500Medium,
  });

  if (!loaded) {
    return <Loading />;
  }
  return (
    <>
      <ImageBackground
        source={background}
        resizeMode="cover"
        style={styles.background}
      >
        <View style={styles.windowcontainer}>
          <View style={styles.windowheader}>
            <TouchableOpacity
              style={styles.windowheaderbutton1}
              onPress={() => navigation.toggleDrawer()}
            >
              <Text style={styles.windowheaderbuttontext}>➤</Text>
            </TouchableOpacity>
            <Text style={styles.windowheadertext}>{user} online!</Text>
            <TouchableOpacity
              style={styles.windowheaderbutton}
              onPress={signOutNow}
            >
              <Text style={styles.windowheaderbuttontext}>✖</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.windowcontent}>
            <Text style={styles.title}>Hi {user}!</Text>
            <View style={styles.asciicontainer}>
              <Text style={styles.ascii}>
                &nbsp;&nbsp;&nbsp;._________________.
              </Text>

              <Text style={styles.ascii}>
                &nbsp;&nbsp;&nbsp;|.---------------.|
              </Text>
              <Text style={styles.ascii}>
                &nbsp;&nbsp;&nbsp;||&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;||
              </Text>
              <Text style={styles.ascii}>
                &nbsp;&nbsp;&nbsp;||&nbsp;&nbsp;&nbsp;-._
                .-.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;||
              </Text>
              <Text style={styles.ascii}>
                &nbsp;&nbsp;&nbsp;||&nbsp;&nbsp;&nbsp;-._| |
                |&nbsp;&nbsp;&nbsp;&nbsp;||
              </Text>
              <Text style={styles.ascii}>
                &nbsp;&nbsp;&nbsp;||&nbsp;&nbsp;&nbsp;-._|"|"|&nbsp;&nbsp;&nbsp;&nbsp;||
              </Text>
              <Text style={styles.ascii}>
                &nbsp;&nbsp;&nbsp;||&nbsp;&nbsp;&nbsp;-._|.-.|&nbsp;&nbsp;&nbsp;&nbsp;||
              </Text>
              <Text style={styles.ascii}>
                &nbsp;&nbsp;&nbsp;||&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;||
              </Text>
              <Text style={styles.ascii}>
                &nbsp;&nbsp;&nbsp;||_______________||
              </Text>
              <Text style={styles.ascii}>
                &nbsp;&nbsp;&nbsp;/.-.-.-.-.-.-.-.-.\
              </Text>
              <Text style={styles.ascii}>
                &nbsp;&nbsp;/.-.-.-.-.-.-.-.-.-.\
              </Text>
              <Text style={styles.ascii}>&nbsp;/.-.-.-.-.-.-.-.-.-.-.\</Text>
              <Text style={styles.ascii}>/______/__________\___o_\ </Text>
              <Text style={styles.ascii}>\_______________________/</Text>
            </View>
            <View>
              <Text style={styles.subtitle}>
                Welcome to the World Wide Web!
              </Text>
              <Text style={styles.subtitle}>
                Get ready to surf the web and chat with people all over the
                world.
              </Text>
              <Text style={styles.subtitle}>
                Use the navigation button in the upper left to check out the
                rooms, or even create your very own room!
              </Text>
              <Text style={styles.subtitle}>
                Signing out is simple - just close the program in the upper
                right!
              </Text>
            </View>
            {/* Possibly commenting out new room */}
            {/* <TouchableOpacity
              style={styles.loginbutton}
              onPress={() => navigation.navigate("Add Room")}
            >
              <Text style={styles.buttontext}>New Room</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </ImageBackground>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  windowcontainer: {
    borderWidth: 5,
    width: width / 1.25,
    height: height / 1.3,
    borderLeftColor: "white",
    borderTopColor: "white",
    backgroundColor: "#C0C0C0",
  },
  windowheader: {
    backgroundColor: "#00007F",
    height: 30,
    width: "97%",
    marginLeft: "1.5%",
    marginRight: "1.5%",
    marginTop: "1.5%",
    flexDirection: "row",
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
    fontWeight: "bold",
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
    fontFamily: "DMMono_500Medium",
  },
  subtitle: {
    fontFamily: "DMMono_400Regular",
    textAlign: "left",
    marginBottom: 10,
  },
  asciicontainer: {
    marginBottom: 20,
  },
  ascii: {
    textAlign: "left",
    fontFamily: "DMMono_300Light",
  },
  loginbutton: {
    width: width / 1.5,
    height: height / 15,
    borderWidth: 3,
    borderLeftColor: "white",
    borderTopColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  buttontext: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: "DMMono_500Medium",
  },
  background: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007F7F",
  },
});
