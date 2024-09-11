import { createContext, useState, useEffect } from "react";
import CryptoJS from "crypto-js";

type podcastType = {
  list: any;
  episodes: any;
  categories: any;
  episode: any;
  podcastDetails: any;
  searchPodcasts: (search: string, limit?: number) => void;
  fetchEpisodes: (feedId: string) => void;
  selectEpisode: (episode: any) => void;
  getCategories: () => void;
  getPodcastByCategory: (category: string) => void;
  getPodcastById: (id: string) => void;
};

const podcastData: podcastType = {
  list: [],
  episodes: [],
  categories: [],
  episode: {},
  podcastDetails: {},
  searchPodcasts: (search: string, limit: number) => true,
  fetchEpisodes: (feedId: string) => true,
  selectEpisode: (episode: any) => true,
  getCategories: () => true,
  getPodcastByCategory: (category: string) => Promise<any>,
  getPodcastById: (id: string) => Promise<any>,
};

export const PodcastContext = createContext(podcastData);

export const PodcastProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [list, setList] = useState([]);
  const [episode, setEpisode] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [podcastDetails, setPodcastDetails] = useState([]);
  const api_key = "";
  const api_secret = "";
  const currentTime = Math.floor(Date.now() / 1000);

  const hash_data = api_key + api_secret + currentTime;
  const auth_header = CryptoJS.SHA1(hash_data).toString();
  const headers = {
    "User-Agent": "YourAppName/1.0",
    "X-Auth-Date": currentTime.toString(),
    "X-Auth-Key": api_key,
    Authorization: auth_header,
  };

  const getPodcastById = async (id: string) => {
    try {
      const data = await fetch(
        `https://api.podcastindex.org/api/1.0/podcasts/byfeedid?id=${id}`,
        {
          method: "GET",
          headers,
        }
      )
        .then((data) => data.json())
        .then((data) => data.feed);
      return data;
    } catch (error) {
      console.error("Error fetching details:", error);
    }
  };

  const searchPodcasts = async (search: string, limit: number = 15) => {
    try {
      setList([]);
      fetch(
        `https://api.podcastindex.org/api/1.0/search/byterm?q=${encodeURIComponent(
          search
        )}`,
        {
          method: "GET",
          headers,
        }
      )
        .then((data) => data.json())
        .then((data) => setList(data.feeds.slice(0, limit)));
    } catch (error) {
      console.error("Error searching podcasts:", error);
    }
  };

  const fetchEpisodes = async (feedId: string) => {
    try {
      setEpisodes([]);
      fetchPodcastDetails(feedId);
      fetch(
        `https://api.podcastindex.org/api/1.0/episodes/byfeedid?id=${feedId}`,
        {
          method: "GET",
          headers,
        }
      )
        .then((data) => data.json())
        .then((data) => setEpisodes(data));
    } catch (error) {
      console.error("Error fetching episodes:", error);
    }
  };

  const fetchPodcastDetails = async (feedId: string) => {
    try {
      fetch(
        `https://api.podcastindex.org/api/1.0/podcasts/byfeedid?id=${feedId}`,
        {
          method: "GET",
          headers,
        }
      )
        .then((data) => data.json())
        .then((data) => setPodcastDetails(data.feed));
    } catch (error) {
      console.error("Error fetching details:", error);
    }
  };

  const selectEpisode = (episodeData: any) => {
    setEpisode(episodeData);
  };

  const getPodcastByCategory = async (category: string) => {
    try {
      const data = await fetch(
        `https://api.podcastindex.org/api/1.0/search/byterm?q=${encodeURIComponent(
          category
        )}`,
        {
          method: "GET",
          headers,
        }
      )
        .then((data) => data.json())
        .then((data) => data.feeds.slice(0, 15));
      return data;
    } catch (e) {
      console.log(e);
    }
  };

  const getCategories = async () => {
    fetch("https://api.podcastindex.org/api/1.0/categories/list", {
      method: "GET",
      headers,
    })
      .then((data) => data.json())
      .then((data) => setCategories(data.feeds));
  };

  return (
    <PodcastContext.Provider
      value={{
        list,
        searchPodcasts,
        fetchEpisodes,
        episodes,
        selectEpisode,
        episode,
        podcastDetails,
        getCategories,
        categories,
        getPodcastByCategory,
        getPodcastById,
      }}
    >
      {children}
    </PodcastContext.Provider>
  );
};
