import { Text, Image, TouchableOpacity, View, ScrollView } from "react-native";
import tw from "twrnc";
import { Scroll, X } from "lucide-react-native";
import { useContext, useEffect, useState } from "react";
import { PodcastContext } from "../../contexts/podcast";
import { RouteContext } from "../../contexts/route";

type CategoryItemProps = {
  category: any;
  removeCategory: (category: any) => void;
};

export default function CategoryItem({
  category,
  removeCategory,
}: CategoryItemProps) {
  const [podcasts, setPodcasts] = useState<any>([]);
  const { getPodcastByCategory } = useContext(PodcastContext);
  const { setRoute } = useContext(RouteContext);

  useEffect(() => {
    const getPodcasts = async () => {
      const podcastList = await getPodcastByCategory(category.name);
      setPodcasts(podcastList);
    };

    getPodcasts();
  }, [category]);

  return (
    <View key={category.id} style={tw`border border-gray-400 rounded mx-4`}>
      <View style={tw`flex justify-between flex-row p-2`}>
        <Text style={tw`text-base`}>{category.name}</Text>
        <TouchableOpacity
          style={tw`border border-gray-400 flex items-center justify-center size-6 rounded`}
          onPress={() => removeCategory(category)}
        >
          <X size={16} style={tw`text-gray-400`} />
        </TouchableOpacity>
      </View>
      <ScrollView style={tw`px-2 pb-4`} horizontal={true}>
        {podcasts &&
          podcasts.map((podcast) => (
            <TouchableOpacity
              key={podcast.id}
              style={tw`pr-2`}
              activeOpacity={1}
              onPress={() =>
                setRoute({ name: "Podcast", params: { id: podcast.id } })
              }
            >
              <View style={tw`size-24`}>
                {podcast.image ? (
                  <Image
                    source={{
                      uri: podcast.image,
                    }}
                    style={tw`size-24 rounded`}
                  />
                ) : (
                  <View style={tw`size-24 rounded bg-gray-100`} />
                )}
              </View>
            </TouchableOpacity>
          ))}
        <TouchableOpacity
          activeOpacity={1}
          onPress={() =>
            setRoute({ name: "Category", params: { category: category.name } })
          }
        >
          <View
            style={tw`size-24 p-2 border border-dashed border-gray-200 flex gap-2 flex-col items-center justify-center mr-4`}
          >
            <Text>Check more podcasts on {category.name}</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
