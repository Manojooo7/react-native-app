import Colors from "@/services/Colors";
import Fontisto from "@expo/vector-icons/Fontisto";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import {
    Linking,
    Platform,
    Share,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import { BusinessListType } from "../BusinessList";

type Props = {
  business: BusinessListType;
};

export default function ActionButtons({ business }: Props) {
  const onNavigate = async () => {
    const nativeUrl =
      Platform.OS == "ios"
        ? `maps:0.0?q=${business?.address}`
        : `gep.0,0?q=${business?.address}`;

    await Linking.openURL(nativeUrl);
  };

  const onCall = async () => {
    const callUrl = `<tel:1>${business?.phone}<tel:1>`;
    await Linking.openURL(callUrl);
  };

  const onOpenWebsite = async () => {
    const websiteUrl = business.website.startsWith("http")
      ? business.website
      : `https://${business?.website}`;
    await Linking.openURL(websiteUrl);
  };

  const onShare = async () => {
    const result = await Share.share({
      message:
        "Checkou this local business: \n" + "Business Name: " + business.name,
    });
  };

  return (
    <View style={styles.actionContainer}>
      <TouchableOpacity
        style={styles.actionButtonContainer}
        onPress={onNavigate}
      >
        <MaterialIcons name="my-location" size={30} color={Colors.WHITE} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.actionButtonContainer}
        onPress={onOpenWebsite}
      >
        <Fontisto name="world-o" size={30} color={Colors.WHITE} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButtonContainer} onPress={onCall}>
        <MaterialIcons name="local-phone" size={30} color={Colors.WHITE} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButtonContainer} onPress={onShare}>
        <MaterialIcons name="share" size={30} color={Colors.WHITE} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  actionContainer: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 3,
  },
  actionButtonContainer: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 8,
  },
});
