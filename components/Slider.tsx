import { axiosClinet } from "@/services/GlobalApi";
import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, Image, View } from "react-native";

export type SliderType = {
  name: string;
  image: { url: string };
};

export default function Slider() {
  const [sliders, setSliders] = useState<SliderType[]>();
  useEffect(() => {
    getSlider();
  }, []);
  const getSlider = async () => {
    const getSliders = await axiosClinet.get("/sliders?populate=*");
    setSliders(getSliders?.data.data);
    // console.log("slider data: ", sliders);
  };
  return (
    <View
      style={{
        marginTop: 20,
      }}
    >
      <FlatList
        data={sliders}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        automaticallyAdjustContentInsets
        pagingEnabled={true}
        renderItem={({ item, index }) => (
          <View key={index}>
            <Image
              source={{ uri: item?.image?.url }}
              style={{
                width: Dimensions.get("screen").width * 0.9,
                height: 200,
                borderRadius: 20,
                gap: 15,
              }}
            />
          </View>
        )}
      />
    </View>
  );
}
