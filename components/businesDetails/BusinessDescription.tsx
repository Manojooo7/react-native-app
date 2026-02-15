import Colors from "@/services/Colors";
import React from "react";
import { Text, View } from "react-native";
import { BusinessListType } from "../BusinessList";

type Props = {
  business: BusinessListType;
};

export default function BusinessDescription({ business }: Props) {
  return (
    <View style={{ marginTop: 30 }}>
      <Text style={{ fontFamily: "appFontBold", fontSize: 20 }}>
        Description
      </Text>
      <Text style={{ color: Colors.GRAY }}>{business.description}</Text>
    </View>
  );
}
