import { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import { ThemeContext } from "../contexts/theme";
import { Moon, Search, Sun } from "lucide-react-native";
import { RouteContext } from "../contexts/route";

export default function header() {
  const { setRoute } = useContext(RouteContext);

  return (
    <View style={tw`mt-16 flex flex-row justify-between px-4`}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => setRoute({ name: "Home" })}
      >
        <View style={tw`flex justify-start items-end flex-row`}>
          <Text style={tw`text-2xl m-0 p-0 text-purple-800`}>Simple</Text>
          <Text style={tw`text-2xl m-0 p-0`}>Cast</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => setRoute({ name: "Search" })}
        style={tw`border size-8 rounded border-gray-400 flex items-center justify-center`}
      >
        <Search size={16} style={tw`text-black`} />
      </TouchableOpacity>
    </View>
  );
}
