import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Header from "../components/header";
import AddCategory from "../components/home/add-category";
import ListCategories from "../components/home/category-list";
import tw from "twrnc";
import { useContext, useEffect, useState } from "react";
import { PodcastContext } from "../contexts/podcast";
import { RouteContext } from "../contexts/route";
import ListFeed from "../components/home/list-feed";
import { ChevronLeft } from "lucide-react-native";
import { ThemeContext } from "../contexts/theme";

export default function Category() {
  const { searchPodcasts } = useContext(PodcastContext);
  const { route, setRoute } = useContext(RouteContext);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    searchPodcasts(route.params.category, 60);
  }, [route]);

  return (
    <>
      <Header />
      <View style={tw`p-4 flex flex-row gap-2`}>
        <TouchableOpacity onPress={() => setRoute({ name: "Home" })}>
          <ChevronLeft
            size={18}
            style={tw`${theme === "light" ? "text-black" : "text-white"}`}
          />
        </TouchableOpacity>
        <Text style={tw`${theme === "light" ? "text-black" : "text-white"}`}>
          {route.params.category}
        </Text>
      </View>
      <ScrollView>
        <View style={tw`mb-8`}>
          <ListFeed />
        </View>
      </ScrollView>
    </>
  );
}
