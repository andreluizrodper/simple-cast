import { RouteContext } from "./contexts/route";
import { useContext, useState } from "react";
import Home from "./views/home";
import Podcast from "./views/podcast";
import Search from "./views/search";
import Category from "./views/category";
import Player from "./components/podcast/player";
import { StatusBar } from "expo-status-bar";
import { ThemeContext } from "./contexts/theme";
import InlineAd from "./components/banner";

export default function App() {
  const { route } = useContext(RouteContext);
  const { theme } = useContext(ThemeContext);

  return (
    <>
      {route.name === "Home" && <Home />}
      {route.name === "Search" && <Search />}
      {route.name === "Podcast" && <Podcast />}
      {route.name === "Category" && <Category />}
      <Player />
      <StatusBar style={theme === "dark" ? "light" : "dark"} />
      <InlineAd />
    </>
  );
}
