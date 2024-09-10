import { ScrollView, View } from "react-native";
import Header from "../components/header";
import AddCategory from "../components/home/add-category";
import ListCategories from "../components/home/category-list";
import ListFavorites from "../components/home/favorite-list";
import tw from "twrnc";

export default function Home() {
  return (
    <>
      <Header />
      <ScrollView>
        <ListFavorites />
        <ListCategories />
        <AddCategory />
      </ScrollView>
    </>
  );
}
