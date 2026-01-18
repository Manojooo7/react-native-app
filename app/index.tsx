import Colors from "@/services/Colors";
import { axiosClinet } from "@/services/GlobalApi";
import { useSSO, useUser } from "@clerk/clerk-expo";
import * as AuthSession from "expo-auth-session";
import { useNavigation, useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useCallback, useEffect } from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export const useWarmUpBrowser = () => {
  useEffect(() => {
    if (Platform.OS !== "android") return;
    void WebBrowser.warmUpAsync();
    return () => {
      // Cleanup: closes browser when component unmounts
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

export default function Index() {
  useWarmUpBrowser();
  // Use the `useSSO()` hook to access the `startSSOFlow()` method
  const { startSSOFlow } = useSSO();
  const navigation = useNavigation();
  const { user } = useUser();
  const router = useRouter();
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const createNewuser = async () => {
    try {
      console.log({
        fullName: user?.fullName,
        email: user?.primaryEmailAddress?.emailAddress,
      });

      const result = await axiosClinet.post("/user-lists", {
        data: {
          fullName: user?.fullName,
          email: user?.primaryEmailAddress?.emailAddress,
        },
      });

      router.replace("/(tabs)/Home");
    } catch (error: any) {
      router.replace("/(tabs)/Home");
      console.log(error);
    }
  };

  useEffect(() => {
    user && createNewuser();
  }, [user]);

  const onPress = useCallback(async () => {
    try {
      // Start the authentication process by calling `startSSOFlow()`
      const { createdSessionId, setActive, signIn, signUp } =
        await startSSOFlow({
          strategy: "oauth_google",
          redirectUrl: AuthSession.makeRedirectUri(),
        });

      // If sign in was successful, set the active session
      if (createdSessionId) {
        setActive!({
          session: createdSessionId,
          navigate: async ({ session }) => {
            if (session?.currentTask) {
              console.log(session?.currentTask);
              router.push("/");
              return;
            }

            router.push("/");
          },
        });
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
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

        <TouchableOpacity onPress={onPress} style={[styles.button]}>
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
        </TouchableOpacity>

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
