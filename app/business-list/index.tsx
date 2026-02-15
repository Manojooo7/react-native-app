import { BusinessListType } from "@/components/BusinessList";
import BusinessListCard from "@/components/businessListsScreen/BusinessListCard";
import Colors from "@/services/Colors";
import { axiosClinet } from "@/services/GlobalApi";
import Feather from "@expo/vector-icons/Feather";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function BusinessList() {
  const [businessList, setBusinessList] = useState<BusinessListType[]>([]);
  const [filteredBusinessLists, setFilteredBusinessList] = useState<
    BusinessListType[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { categoryName } = useLocalSearchParams();
  // console.log(categoryName);

  const router = useRouter();

  useEffect(() => {
    getBusinesListBycategory();
  }, []);
  const getBusinesListBycategory = async () => {
    setLoading(true);
    const result = await axiosClinet(
      "/business-lists?filters[category][name][$eq]=" +
        categoryName +
        "&populate=*",
    );
    setBusinessList(result?.data?.data);
    setFilteredBusinessList(result?.data?.data);
    setLoading(false);
    // console.log("Category List: ", result.data.data);
  };

  const searchAndFilterBusinessList = (searchInput: string) => {
    if (!searchInput) {
      setFilteredBusinessList(businessList);
      return;
    }

    const filteredList = filteredBusinessLists.filter((item) =>
      item.name.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase()),
    );

    setFilteredBusinessList(filteredList);
  };

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
          alignItems: "center",
          gap: 12,
          flexDirection: "row",
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color={Colors.WHITE} />
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: "appFontBold",
            fontSize: 20,
            color: Colors.WHITE,
          }}
        >
          {categoryName} Business List
        </Text>
      </View>
      <View>
        <TextInput
          style={{
            backgroundColor: Colors.WHITE,
            padding: 15,
            borderRadius: 50,
            paddingHorizontal: 20,
            fontSize: 18,
            marginTop: 6,
          }}
          placeholder="Search by category..."
          onChangeText={(value) => searchAndFilterBusinessList(value)}
        />
      </View>

      <FlatList
        data={filteredBusinessLists}
        onRefresh={() => getBusinesListBycategory()}
        refreshing={loading}
        renderItem={({ item, index }) => (
          <BusinessListCard key={index} business={item} />
        )}
      />
    </View>
  );
}
