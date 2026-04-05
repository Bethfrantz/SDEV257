import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";

export default function PlanetsScreen() {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    fetch("https://swapi.dev/api/planets/")
      .then((res) => res.json())
      .then((data) => setPlanets(data.results))
      .catch((err) => console.log(err));
  }, []);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={planets}
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
