import Colors from "@/services/Colors";
import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/welcome.png")}
        style={{
          width: "100%",
          height: 270,
          marginTop: 130,
          marginBottom: 25,
        }}
      />
      <Text style={styles.heading}>Welcome to</Text>
      <Text style={styles.heading}>Business Directory</Text>

      <View
        style={{
          padding: 20,
          backgroundColor: Colors.WHITE,
          margin: 20,
          borderRadius: 20,
          display: "flex",
          flexDirection: "column",
          gap: 5,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "appFont",
            fontSize: 20,
            textAlign: "center",
          }}
        >
          Discover thousand local business in one place
        </Text>

        <View style={[styles.button]}>
          <Image
            source={require("../assets/images/google.png")}
            style={{
              width: 20,
              height: 20,
            }}
          />
          <Text
            style={{
              fontFamily: "appFont",
              fontSize: 18,
              textAlign: "center",
            }}
          >
            Sign in with google
          </Text>
        </View>

        <Text
          style={{
            fontFamily: "appFont",
            fontSize: 18,
            textAlign: "center",
            marginTop: 10,
            textDecorationLine: "underline",
          }}
        >
          skip
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.PRIMARY,
    height: "100%",
  },
  heading: {
    fontFamily: "appFont",
    fontSize: 40,
    // fontWeight: 700,
    color: Colors.WHITE,
    textAlign: "center",
  },
  button: {
    marginTop: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 15,
    width: "100%",
    borderRadius: 30,
    height: 60,
    backgroundColor: "#f1f1f1",
  },
});
