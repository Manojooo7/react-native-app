import Colors from "@/services/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import Fontisto from "@expo/vector-icons/Fontisto";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Image, Text, View } from "react-native";
import { BusinessListType } from "../BusinessList";
import ActionButtons from "./ActionButtons";

type Props = {
  business: BusinessListType;
};

export default function BusinessInfo({ business }: Props) {
  return (
    <View
      style={{
        marginTop: 30,
      }}
    >
      <Image
        source={{ uri: business?.image[0]?.url }}
        style={{
          width: "100%",
          height: 200,
          borderRadius: 15,
        }}
      />
      <View
        style={{
          marginTop: 20,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontFamily: "appFontBold",
              fontSize: 20,
            }}
          >
            {business.name}
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
            <Text
              style={{
                fontSize: 18,
                color: Colors.GRAY,
              }}
            >
              4.5
            </Text>
          </View>
        </View>

        <View
          style={{
            display: "flex",
            gap: 8,
            marginTop: 20,
          }}
        >
          <View
            style={{
              display: "flex",
              gap: 5,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Ionicons
              name="location-outline"
              size={25}
              color={Colors.PRIMARY}
            />
            <Text
              style={{
                fontFamily: "appFont",
                fontSize: 20,
                color: Colors.GRAY,
              }}
            >
              {business.address}
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              gap: 5,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Fontisto name="world-o" size={25} color={Colors.PRIMARY} />
            <Text
              style={{
                fontFamily: "appFont",
                fontSize: 20,
                color: Colors.GRAY,
              }}
            >
              {business.website || "some-website.com"}
            </Text>
          </View>
        </View>
        <ActionButtons business={business} />
      </View>
    </View>
  );
}
