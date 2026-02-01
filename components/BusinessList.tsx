import Colors from "@/services/Colors";
import { axiosClinet } from "@/services/GlobalApi";
import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { CategoryType } from "./Categories";

export type ImageType = {
  url: string;
};
export type BusinessListType = {
  name: string;
  address: string;
  description: string;
  image: ImageType[];
  createdby: string;
  premium: boolean;
  category: CategoryType;
};

export default function BusinessList() {
  const [businessList, setBusinessList] = useState<BusinessListType[]>();
  const [loading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    getAllBusinessList();
  }, []);

  const getAllBusinessList = async () => {
    setIsLoading(true);
    const getBusinessList = await axiosClinet(
      "/business-lists?filters[premium][$eq]=true&populate=*",
    );
    setBusinessList(getBusinessList.data.data);
    setIsLoading(false);
    console.log(getBusinessList.data.data);
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
          Business
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
      {loading && <ActivityIndicator size={"large"} />}

      <FlatList
        data={businessList}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View
            key={index}
            style={{
              width: 230,
              marginRight: 10,
              backgroundColor: Colors.WHITE,
              borderRadius: 10,
            }}
          >
            <Image
              source={{ uri: item.image[0].url }}
              style={{
                width: "100%",
                height: 120,
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
              }}
            />

            <View
              style={{
                marginTop: 5,
                padding: 5,
              }}
            >
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "bold",
                }}
              >
                {item?.name}
              </Text>
              <Text
                style={{
                  marginTop: 2,
                  fontSize: 12,
                  color: Colors.GRAY,
                }}
              >
                {item?.address}
              </Text>

              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 5,
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <AntDesign name="star" size={15} color="#eab308" />
                  <Text>4</Text>
                </View>

                <Text>View</Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}
