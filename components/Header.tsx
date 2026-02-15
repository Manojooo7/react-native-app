import Colors from "@/services/Colors";
import { useUser } from "@clerk/clerk-expo";
import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { Image, Text, TextInput, View } from "react-native";

export default function Header() {
  const { user } = useUser();
  return (
    <View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 13,
          }}
        >
          <Image
            source={{ uri: user?.imageUrl }}
            style={{
              width: 50,
              height: 50,
              borderRadius: 99,
            }}
          />
          <View>
            <Text>Welcome</Text>
            {user?.firstName && <Text>{user?.firstName}</Text>}
          </View>
        </View>

        <Feather name="bell" size={30} color="black" />
      </View>

      <TextInput
        placeholder="search"
        style={{
          padding: 15,
          fontSize: 20,
          backgroundColor: Colors.WHITE,
          borderRadius: 99,
          paddingHorizontal: 20,
          marginTop: 15,
        }}
      />
    </View>
  );
}
