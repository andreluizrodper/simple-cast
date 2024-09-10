import { Text, Modal, TouchableOpacity, View, ScrollView } from "react-native";
import tw from "twrnc";
import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/user";
import CategoryItem from "./category-item";

export default function CategoryList() {
  const { categories, updateCategories } = useContext(UserContext);
  const [selectedCategories, setSelectedCategories] = useState<any>([]);

  useEffect(() => {
    setSelectedCategories(categories);
  }, [categories]);

  const removeCategory = (category: any) => {
    const selectedCategoriesTmp = [...selectedCategories];
    const index = selectedCategoriesTmp.findIndex(
      (categoryName) => categoryName === category
    );
    selectedCategoriesTmp.splice(index, 1);
    setSelectedCategories(selectedCategoriesTmp);
    updateCategories(selectedCategoriesTmp);
  };

  return (
    <View style={tw`flex flex-col gap-2 mt-6`}>
      {selectedCategories.map((category) => (
        <CategoryItem
          key={category.id}
          category={category}
          removeCategory={removeCategory}
        />
      ))}
    </View>
  );
}
