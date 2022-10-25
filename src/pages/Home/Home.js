import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import SearchableDropdown from "react-native-searchable-dropdown";

let items = [
  {
    id: 1,
    name: "senhor dos anéis",
  },
  {
    id: 2,
    name: "senhor dos anéis 2",
  },
  {
    id: 3,
    name: "senhor dos anéis 3",
  },
  {
    id: 4,
    name: "O Hobbit",
  },
  {
    id: 5,
    name: "O Hobbit 2",
  },
  {
    id: 6,
    name: "O Hobbit 3",
  },
  {
    id: 7,
    name: "Click",
  },
  {
    id: 8,
    name: "Como se Fosse a Primeira vez",
  },
  {
    id: 9,
    name: "Um Faz de Conta que Acontece",
  },
];

export default function Home({ navigation }) {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelect = (item) => {
    const items = selectedItems;
    items.push(item);
    setSelectedItems([item]);
  }

  const handleRemove = (item) => {
    setSelectedItems(prevState => prevState.filter((sitem) => sitem.id !== item.id));
  }

  useEffect(() => {
    console.log("selectedItems", selectedItems);
  }, [selectedItems])

  return (
    <View style={Styles.container}>
      <Text style={Styles.input}>
        Tens o'que é necessario para achar o filme?
      </Text>

      <SearchableDropdown
        multi={false}
        onItemSelect={(item) => handleSelect(item)}
        containerStyle={{ padding: 5 }}
        onRemoveItem={(item) => handleRemove(item)}
        itemStyle={{
          padding: 10,
          marginTop: 2,
          backgroundColor: "#ddd",
          borderColor: "#bbb",
          borderWidth: 1,
          borderRadius: 5,
        }}
        itemTextStyle={{ color: "#222" }}
        itemsContainerStyle={{ maxHeight: 140 }}
        items={items}
        defaultIndex={2}
        resetValue={false}
        textInputProps={{
          placeholder: "placeholder",
          underlineColorAndroid: "transparent",
          style: {
            padding: 12,
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 5,
          }
        }}
        listProps={{
          nestedScrollEnabled: true,
        }}
      />
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#252525",
  },
  txt: {
    color: "#D4D4D4",
    textAlign: "center",
    marginTop: 5 + "%",
  },
  btt: {
    borderRadius: 10,
    width: 45 + "%",
    height: 5 + "%",
    backgroundColor: "#000000",
    marginTop: 5 + "%",
  },
  input: {
    color: "#D3D3D3",
  },
});
