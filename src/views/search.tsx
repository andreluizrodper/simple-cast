import { TextInput, View, Text } from "react-native";
import Header from "../components/header";
import ListFeed from "../components/home/list-feed";
import tw from "twrnc";
import { useContext, useEffect, useState } from "react";
import { PodcastContext } from "../contexts/podcast";

export default function Search() {
  const [search, setSearch] = useState<string>();
  const { searchPodcasts } = useContext(PodcastContext);

  let timeout;
  const doSearch = (term: string) => {
    setSearch(term);
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      searchPodcasts(term);
    }, 400);
  };

  return (
    <>
      <Header />
      <View style={tw`px-4 my-2`}>
        <TextInput
          placeholder="Faça a sua buscar aqui"
          style={tw`border border-gray-400 rounded px-2 py-2`}
          onChangeText={(text) => doSearch(text)}
        />
      </View>
      {!search && (
        <View style={tw`px-4 py-2 text-center w-full`}>
          <Text style={tw`text-gray-500`}>
            Busque por, categoria ou pelo nome do seu podcast favorito
          </Text>
        </View>
      )}
      <ListFeed />
    </>
  );
}
