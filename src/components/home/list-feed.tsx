import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import { useContext, useEffect } from "react";
import { PodcastContext } from "../../contexts/podcast";
import { RouteContext } from "../../contexts/route";

export default function ListFeed() {
  const { setRoute } = useContext(RouteContext);
  const { list } = useContext(PodcastContext);

  return (
    <ScrollView>
      {list &&
        list.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={tw`p-4`}
            activeOpacity={1}
            onPress={() =>
              setRoute({ name: "Podcast", params: { id: item.id } })
            }
          >
            <View style={tw`flex gap-2 flex-row items-start`}>
              {item.image ? (
                <Image
                  source={{
                    uri: item.image,
                  }}
                  style={tw`size-12 rounded`}
                />
              ) : (
                <View style={tw`size-12 rounded bg-gray-100`} />
              )}
              <View style={tw`flex flex-1 flex-col gap-2 justify-center`}>
                <Text style={tw`text-base`}>{item.title}</Text>
                <Text style={tw`text-xs`}>{item.author}</Text>
                <View style={tw`flex flex-row flex-wrap gap-2`}>
                  {item.categories &&
                    Object.keys(item.categories).map((category, index) => (
                      <Text
                        key={index}
                        style={tw`px-2 py-0.5 bg-gray-100 rounded-lg text-xs`}
                      >
                        {item.categories[category]}
                      </Text>
                    ))}
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
    </ScrollView>
  );
}
