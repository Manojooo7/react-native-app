import BusinessList from "@/components/BusinessList";
import Categories from "@/components/Categories";
import Header from "@/components/Header";
import Slider from "@/components/Slider";
import Colors from "@/services/Colors";
import React from "react";
import { FlatList, View } from "react-native";

export default function Home() {
  return (
    <FlatList
      data={[]}
      renderItem={null}
      ListHeaderComponent={
        <View
          style={{
            paddingTop: 30,
            padding: 20,
          }}
        >
          <View
            style={{
              height: 300,
              width: "200%",
              backgroundColor: Colors.PRIMARY,
              position: "absolute",
            }}
          ></View>
          <Header />
          <Slider />
          <Categories />
          <BusinessList />

          <View style={{ height: 100 }}></View>
        </View>
      }
    />
  );
}
