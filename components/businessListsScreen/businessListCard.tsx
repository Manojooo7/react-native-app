import Colors from "@/services/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import React from "react";
import { Image, Text, View } from "react-native";
import { BusinessListType } from "../BusinessList";

type Props = {
  business: BusinessListType;
};

export default function BusinessListCard({ business }: Props) {
  return (
    <View
      style={{
        padding: 7,
        backgroundColor: Colors.WHITE,
        borderRadius: 15,
        marginTop: 10,
        display: "flex",
        flexDirection: "row",
        gap: 15,
      }}
    >
      <Image
        source={{ uri: business?.image[0]?.url }}
        style={{
          width: 120,
          height: 120,
          borderRadius: 8,
        }}
      />
      <View
        style={{
          display: "flex",
          gap: 5,
        }}
      >
        <Text
          style={{
            fontFamily: "appFontBold",
            fontSize: 18,
            width: 200,
          }}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {business?.name}
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: Colors.GRAY,
            width: 300,
          }}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {business?.address}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 3,
          }}
        >
          <AntDesign name="star" size={24} color="#ffd700" />
          <Text>4.5/5</Text>
        </View>
      </View>
    </View>
  );
}
