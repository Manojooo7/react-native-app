import BusinessDescription from "@/components/businesDetails/BusinessDescription";
import BusinessInfo from "@/components/businesDetails/BusinessInfo";
import Colors from "@/services/Colors";
import Feather from "@expo/vector-icons/Feather";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";

export default function BusinessDetails() {
  const router = useRouter();
  const { business } = useLocalSearchParams();
  const businessDetails = JSON.parse(business.toString());

  return (
    <View
      style={{
        padding: 20,
        paddingTop: 25,
      }}
    >
      <View
        style={{
          height: 200,
          backgroundColor: Colors.PRIMARY,
          position: "absolute",
          width: "150%",
        }}
      ></View>
      <View
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={30} color={Colors.WHITE} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Feather name="bookmark" size={30} color={Colors.WHITE} />
        </TouchableOpacity>
      </View>

      <BusinessInfo business={businessDetails} />
      <BusinessDescription business={businessDetails} />
    </View>
  );
}
