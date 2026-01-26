import { axiosClinet } from "@/services/GlobalApi";
import React, { useEffect } from "react";
import { Text, View } from "react-native";

export default function Slider() {
  useEffect(() => {
    getSlider();
  }, []);
  const getSlider = async () => {
    const sliders = await axiosClinet.get("/sliders?populate=*");
    console.log(sliders.data);
  };
  return (
    <View>
      <Text>Slider</Text>
    </View>
  );
}
