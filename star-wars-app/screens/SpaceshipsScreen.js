import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";

export default function SpaceshipsScreen() {
  const [ships, setShips] = useState([]);

  useEffect(() => {
    fetch("https://swapi.dev/api/starships/")
      .then((res) => res.json())
      .then((data) => setShips(data.results))
      .catch((err) => console.log(err));
  }, []);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={ships}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <Text style={{ padding: 10, fontSize: 18 }}>
            {item.name}
          </Text>
        )}
      />
    </View>
  );
}
