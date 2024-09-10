import { Image, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import { useContext, useEffect, useState } from "react";
import { PodcastContext } from "../../contexts/podcast";
import { RouteContext } from "../../contexts/route";

type FavoriteItemProps = {
  id: string;
};

export default function FavoriteItem({ id }: FavoriteItemProps) {
  const [podcast, setPodcast] = useState<any>([]);
  const { getPodcastById } = useContext(PodcastContext);
  const { setRoute } = useContext(RouteContext);

  useEffect(() => {
    const getPodcasts = async () => {
      const podcastList = await getPodcastById(id);
      setPodcast(podcastList);
    };

    getPodcasts();
  }, [id]);

  if (!podcast) return;
  return (
    <TouchableOpacity
      style={tw`mr-2`}
      onPress={() => setRoute({ name: "Podcast", params: { id: id } })}
    >
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
    </TouchableOpacity>
  );
}
