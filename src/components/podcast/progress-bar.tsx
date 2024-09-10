import React, { useEffect, useState } from "react";
import { View, Text, Slider } from "react-native";
import TrackPlayer, { useProgress } from "react-native-track-player";

const ProgressBar = () => {
  const { position, duration } = useProgress();

  const handleSlideComplete = async (value) => {
    await TrackPlayer.seekTo(value);
  };

  return (
    <View style={{ margin: 20 }}>
      <Slider
        value={position}
        minimumValue={0}
        maximumValue={duration}
        onSlidingComplete={handleSlideComplete}
        minimumTrackTintColor="#1fb28a"
        maximumTrackTintColor="#d3d3d3"
        thumbTintColor="#b9e4c9"
      />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text>{new Date(position * 1000).toISOString().substr(14, 5)}</Text>
        <Text>{new Date(duration * 1000).toISOString().substr(14, 5)}</Text>
      </View>
    </View>
  );
};

export default ProgressBar;
