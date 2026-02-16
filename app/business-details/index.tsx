import BusinessDescription from "@/components/businesDetails/BusinessDescription";
import BusinessInfo from "@/components/businesDetails/BusinessInfo";
import Colors from "@/services/Colors";
import { axiosClinet } from "@/services/GlobalApi";
import { useUser } from "@clerk/clerk-expo";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ToastAndroid, TouchableOpacity, View } from "react-native";

export type UserFavorite = {
  businessId: number;
  createdAt: string;
  documentId: string;
  id: number;
  publishedAt: string;
  updatedAt: string;
  userEmail: string;
};

export default function BusinessDetails() {
  const router = useRouter();
  const { business } = useLocalSearchParams();
  const businessDetails = JSON.parse(business.toString());

  const { user } = useUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress;
  const [favorite, setFavorite] = useState<UserFavorite[]>([]);
  const [isFav, setIsFav] = useState<boolean>(false);

  useEffect(() => {
    user && checkUserFavorite();
  }, []);

  const handleFavorite = async () => {
    if (isFav) {
      await axiosClinet.delete("/user-favorites/" + favorite[0].documentId);
      ToastAndroid.show("Removed Business", ToastAndroid.BOTTOM);
      checkUserFavorite();
    } else {
      const result = await axiosClinet.post("/user-favorites", {
        data: {
          businessId: businessDetails?.id,
          userEmail: userEmail,
        },
      });

      ToastAndroid.show("Business Marked Favorite", ToastAndroid.BOTTOM);
      checkUserFavorite();
    }
  };

  const checkUserFavorite = async () => {
    const result = await axiosClinet.get(
      "/user-favorites?filters[userEmail][$eq]=" +
        userEmail +
        "&filters[businessId][$eq]=" +
        businessDetails?.id,
    );

    const data = result?.data?.data;

    if (data.length > 0) {
      setFavorite(data);
      setIsFav(true);
    } else {
      setFavorite([]);
      setIsFav(false);
    }
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
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={30} color={Colors.WHITE} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleFavorite}>
          {isFav ? (
            <Ionicons name="bookmark" size={30} color={Colors.WHITE} />
          ) : (
            <Ionicons name="bookmark-outline" size={30} color={Colors.WHITE} />
          )}
        </TouchableOpacity>
      </View>

      <BusinessInfo business={businessDetails} />
      <BusinessDescription business={businessDetails} />
    </View>
  );
}
