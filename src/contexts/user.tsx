import { createContext, useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type userType = {
  categories: string[];
  favorites: string[];
  updateCategories: (category: any) => void;
  updateFavorites: (category: any) => void;
};

const userData: userType = {
  categories: [],
  favorites: [],
  updateCategories: (category: any) => true,
  updateFavorites: (favorite: any) => true,
};

export const UserContext = createContext(userData);

export const UserProvider = ({ children }) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const getUserData = async () => {
      const categoriesValues = await AsyncStorage.getItem(
        "simpleCastCategories"
      );
      setCategories(JSON.parse(categoriesValues) ?? []);

      const favoritesValues = await AsyncStorage.getItem("simpleCastFavorites");
      setFavorites(JSON.parse(favoritesValues) ?? []);
    };
    getUserData();
  }, []);

  const updateCategories = async (categoriesList: any) => {
    AsyncStorage.setItem(
      "simpleCastCategories",
      JSON.stringify(categoriesList)
    );
    setCategories(categoriesList);
  };

  const updateFavorites = async (favoritesList: any) => {
    AsyncStorage.setItem("simpleCastFavorites", JSON.stringify(favoritesList));
    setFavorites(favoritesList);
  };

  return (
    <UserContext.Provider
      value={{
        categories,
        favorites,
        updateCategories,
        updateFavorites,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
