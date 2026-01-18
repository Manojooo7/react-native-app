import Header from "@/components/Header";
import Colors from "@/services/Colors";
import React from "react";
import { View } from "react-native";

export default function Home() {
  return (
    <View
      style={{
        paddingTop: 30,
        padding: 20,
      }}
    >
      <View
        style={{
          height: 400,
          width: "200%",
          backgroundColor: Colors.PRIMARY,
          position: "absolute",
        }}
      ></View>
      {/* Header */}
      <Header />
      {/* Slider */}

      {/* Category */}

      {/* Popular Business */}
    </View>
  );
}
