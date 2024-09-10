import {
  ScrollView,
  TextInput,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../components/header";
import tw from "twrnc";
import { useContext, useEffect, useState } from "react";
import { PodcastContext } from "../contexts/podcast";
import { RouteContext } from "../contexts/route";
import { ChevronLeft, Heart } from "lucide-react-native";
import { UserContext } from "../contexts/user";

export default function Podcast() {
  const { route, setRoute } = useContext(RouteContext);
  const { favorites, updateFavorites } = useContext(UserContext);
  const { podcastDetails, fetchEpisodes, episodes, selectEpisode } =
    useContext(PodcastContext);

  useEffect(() => {
    fetchEpisodes(route.params.id);
  }, [route]);

  const toggleFavorite = () => {
    const favoritesTmp = [...favorites];
    if (favoritesTmp.includes(podcastDetails.id)) {
      const index = favoritesTmp.findIndex((id) => id === podcastDetails.id);
      favoritesTmp.splice(index, 1);
    } else {
      favoritesTmp.push(podcastDetails.id);
    }
    updateFavorites(favoritesTmp);
  };

  const isFavorite = favorites.includes(podcastDetails.id);

  return (
    <>
      <Header />

      <View style={tw`p-4 flex flex-row gap-2`}>
        <TouchableOpacity onPress={() => setRoute({ name: "Home" })}>
          <ChevronLeft size={18} style={tw`text-black`} />
        </TouchableOpacity>
        <View style={tw`flex gap-2 flex-row items-start`}>
          {podcastDetails.image ? (
            <Image
              source={{
                uri: podcastDetails.image,
              }}
              style={tw`size-12 rounded`}
            />
          ) : (
            <View style={tw`size-12 rounded bg-gray-100`} />
          )}
          <View style={tw`flex flex-col gap-2 justify-center`}>
            <Text style={tw`text-base w-80`}>{podcastDetails.title}</Text>
            <Text style={tw`text-xs w-80`}>{podcastDetails.author}</Text>
            <View style={tw`flex flex-row gap-1 w-80 flex-wrap`}>
              {podcastDetails.categories &&
                Object.keys(podcastDetails.categories).map(
                  (category, index) => (
                    <Text
                      key={index}
                      style={tw`px-2 py-0.5 bg-gray-100 rounded-lg text-xs`}
                    >
                      {podcastDetails.categories[category]}
                    </Text>
                  )
                )}
            </View>
          </View>
        </View>
      </View>
      <View
        style={tw`py-2 px-2 border-t border-gray-100 mt-2 flex flex-row justify-between items-center`}
      >
        <Text style={tw`text-xs`}>{episodes.count} episodes</Text>
        <TouchableOpacity
          style={tw`size-8 rounded border-gray-200 border flex items-center justify-center ${
            isFavorite && "bg-gray-800"
          }`}
          onPress={() => toggleFavorite()}
        >
          <Heart
            size={16}
            style={tw`${isFavorite ? "text-white" : "text-gray-800"}`}
            fill={isFavorite && "white"}
          />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={tw`pb-12`}>
          {episodes.items &&
            episodes.items.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={tw`flex flex-row gap-2 px-2 my-2`}
                onPress={() =>
                  selectEpisode({ episode: item, podcast: podcastDetails })
                }
              >
                {item.feedImage ? (
                  <Image
                    source={{
                      uri: item.feedImage,
                    }}
                    style={tw`size-12 rounded`}
                  />
                ) : (
                  <View style={tw`size-12 rounded bg-gray-100`} />
                )}
                <View style={tw`flex flex-1 flex-col w-80 gap-2`}>
                  <Text style={tw`text-base`}>{item.title}</Text>
                  <Text style={tw`text-sm`}>{item.datePublishedPretty}</Text>
                </View>
              </TouchableOpacity>
            ))}
        </View>
      </ScrollView>
    </>
  );
}
