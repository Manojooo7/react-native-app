import Colors from "@/services/Colors";
import { axiosClinet } from "@/services/GlobalApi";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

export type CategoryType = {
  name: string;
  premium: boolean;
  icon: { url: string };
};
export default function Categories() {
  const [categories, setCategories] = useState<CategoryType[]>();
  const router = useRouter();

  useEffect(() => {
    getAllCategories();
  }, []);
  const getAllCategories = async () => {
    const getCategories = await axiosClinet(
      "/categories?filters[premium][$eq]=true&populate=*",
    );
    // console.log("categories", getCategories.data.data);
    setCategories(getCategories?.data?.data);
  };

  const hanldeCategoryClick = (categoty: string) => {
    router.push({
      pathname: "/business-list",
      params: {
        categoryName: categoty,
      },
    });
  };

  return (
    <View
      style={{
        marginTop: 15,
      }}
    >
      <View
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Categories
        </Text>
        <Text
          style={{
            color: Colors.PRIMARY,
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          View All
        </Text>
      </View>

      <FlatList
        data={categories}
        numColumns={4}
        style={{
          marginTop: 7,
        }}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            key={index}
            style={{
              flex: 1,
              alignItems: "center",
              padding: 5,
              backgroundColor: Colors.WHITE,
              margin: 3,
              borderRadius: 5,
              justifyContent: "center",
              gap: 3,
            }}
            onPress={() => hanldeCategoryClick(item.name)}
          >
            <Image
              source={{ uri: item.icon.url }}
              style={{
                width: 40,
                height: 40,
              }}
            />
            <Text
              style={{
                textAlign: "center",
                fontSize: 12,
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
