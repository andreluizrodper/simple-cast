import { Text, Modal, TouchableOpacity, View, ScrollView } from "react-native";
import tw from "twrnc";
import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/user";
import FavoritePodcastItem from "./favorite-item";
import { Scroll } from "lucide-react-native";

export default function FavoriteList() {
  const { favorites } = useContext(UserContext);

  if (!favorites) return;
  return (
    <View style={tw`border border-gray-400 rounded mx-4 mt-6 -mb-4`}>
      <View style={tw`flex justify-between flex-row p-2`}>
        <Text style={tw`text-base`}>My favorites</Text>
      </View>
      <ScrollView style={tw`px-2 pb-4`} horizontal={true}>
        {favorites.map((favorite, index) => {
          return <FavoritePodcastItem key={index} id={favorite} />;
        })}
      </ScrollView>
    </View>
  );
}
