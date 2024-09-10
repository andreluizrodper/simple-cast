import { useContext, useState, useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import { ThemeContext } from "../../contexts/theme";
import { PodcastContext } from "../../contexts/podcast";
import { Pause, Play, RefreshCcw, X } from "lucide-react-native";
import {
  Audio,
  AVPlaybackStatus,
  InterruptionModeAndroid,
  InterruptionModeIOS,
} from "expo-av";

type duration = { currentTime: number; duration: number };

export default function player() {
  const [status, setStatus] = useState<any>();
  const [info, setInfo] = useState<duration>();
  const { theme } = useContext(ThemeContext);
  const { episode, selectEpisode } = useContext(PodcastContext);
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  const formatTime = (totalLenght) => {
    const minutes = Math.floor((totalLenght % 3600) / 60);
    const hours = Math.floor(totalLenght / 3600);
    const seconds = ((totalLenght % 60000) / 1000).toFixed(0);

    return `${hours > 0 ? `${hours}h` : ""}${
      minutes > 0 ? `${minutes}m` : ""
    }${seconds}s`;
  };

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync(); // Unload the sound when the component is unmounted
        }
      : undefined;
  }, [sound]);

  useEffect(() => {
    if (sound) {
      if (status) {
        playPauseSound();
      }
    }
  }, [status]);

  const loadSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      { uri: episode.episode.enclosureUrl },
      { shouldPlay: false },
      onPlaybackStatusUpdate,
      false
    );
    setSound(sound);
  };

  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setPosition((status.positionMillis / status.durationMillis) * 100);
      setIsPlaying(status.isPlaying);
    } else if (status.error) {
      console.log("Error during playback:", status.error);
    }
  };

  const playPauseSound = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
    }
  };

  useEffect(() => {
    if (episode && episode.episode && episode.podcast) loadSound();
  }, [episode]);

  return (
    episode &&
    episode.episode &&
    episode.podcast && (
      <View
        style={tw`absolute gap-2 bg-white border-t border-gray-400 bottom-0 left-0 right-0 p-2 flex flex-row pb-6`}
      >
        <View style={tw`absolute top-0 left-0 right-0 bg-gray-100 h-2`}>
          <View
            style={{
              width: `${position}%`,
              height: 6,
              backgroundColor: "green",
            }}
          />
        </View>
        <View style={tw`flex w-full gap-2 flex-row`}>
          <View style={tw`flex items-center justify-center`}>
            <TouchableOpacity
              activeOpacity={1}
              style={tw`size-8 rounded border-gray-200 border flex items-center justify-center`}
              onPress={() => {
                selectEpisode(null);
                setStatus(false);
              }}
            >
              <X size={16} style={tw`text-black`} />
            </TouchableOpacity>
          </View>
          <View style={tw`flex-1 mt-5 flex flex-col gap-1 justify-start`}>
            <Text style={tw`text-xs text-gray-900`}>
              {episode?.podcast?.title}
            </Text>
            <Text
              style={tw`text-base ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              {episode.episode.title}
            </Text>
            <Text style={tw`text-sm text-gray-600 `}>
              {formatTime(episode.episode.duration)}
            </Text>
          </View>
          <View style={tw`flex items-center justify-center`}>
            <TouchableOpacity
              disabled={!sound}
              style={tw`size-8 rounded border-gray-200 border flex items-center justify-center`}
              onPress={() => playPauseSound()}
              activeOpacity={1}
            >
              {!sound && <Play size={16} style={tw`text-gray-800`} />}
              {sound && !isPlaying && <RefreshCcw size={16} />}
              {isPlaying && <Pause size={16} style={tw`text-gray-800`} />}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  );
}
