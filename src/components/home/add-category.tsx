import { Text, Modal, TouchableOpacity, View, ScrollView } from "react-native";
import tw from "twrnc";
import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/user";
import { PodcastContext } from "../../contexts/podcast";

export default function AddCategory() {
  const { categories: userCategories, updateCategories } =
    useContext(UserContext);
  const { categories, getCategories } = useContext(PodcastContext);
  const [selectedCategories, setSelectedCategories] = useState<any>([]);
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    if (categories.length < 1 && visible) {
      getCategories();
    }
  }, [visible]);

  useEffect(() => {
    setSelectedCategories(userCategories);
  }, [userCategories]);

  const toggleCategory = useCallback(
    (category) => {
      const selectedCategoriesTmp = [...selectedCategories];
      if (selectedCategoriesTmp.includes(category)) {
        const index = selectedCategoriesTmp.findIndex(
          (categoryName) => categoryName === category
        );
        selectedCategoriesTmp.splice(index, 1);
        setSelectedCategories(selectedCategoriesTmp);
      } else {
        selectedCategoriesTmp.push(category);
        setSelectedCategories(selectedCategoriesTmp);
      }
      updateCategories(selectedCategoriesTmp);
    },
    [selectedCategories]
  );

  return (
    <>
      <TouchableOpacity
        onPress={() => setVisible(true)}
        style={tw`py-6 text-center flex items-center justify-center border border-dashed m-4 border-gray-400 rounded`}
      >
        <Text>Add a category here</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        visible={visible}
        transparent={true}
        onRequestClose={() => {
          setVisible(false);
        }}
      >
        <TouchableOpacity
          style={tw`absolute top-0 bottom-0 right-0 left-0 bg-black opacity-20`}
          onPress={() => setVisible(false)}
          activeOpacity={0.2}
        />
        <View
          style={tw`bg-white border-t border-gray-200 h-[400px] absolute bottom-0 left-0 right-0 rounded-t-lg`}
        >
          <Text style={tw`text-center text-base mt-6 mb-3`}>
            Select the categories you would like to see.
          </Text>
          <ScrollView style={tw`mb-8`}>
            <View style={tw`flex gap-2 flex-row flex-wrap px-2`}>
              {categories &&
                categories.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    activeOpacity={1}
                    onPress={() => toggleCategory(item)}
                    style={tw`py-1 px-2 rounded ${
                      selectedCategories.findIndex(
                        (selectedItem) => selectedItem.id === item.id
                      ) >= 0
                        ? "bg-green-600"
                        : "bg-gray-100"
                    }`}
                  >
                    <Text
                      style={tw`text-sm ${
                        selectedCategories.findIndex(
                          (selectedItem) => selectedItem.id === item.id
                        ) >= 0
                          ? "text-white"
                          : "text-gray-800"
                      }`}
                    >
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                ))}
            </View>
          </ScrollView>
        </View>
      </Modal>
    </>
  );
}
