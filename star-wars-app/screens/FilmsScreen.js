import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";

export default function FilmsScreen() {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    fetch("https://swapi.dev/api/films/")
      .then((res) => res.json())
      .then((data) => setFilms(data.results))
      .catch((err) => console.log(err));
  }, []);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={films}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <Text style={{ padding: 10, fontSize: 18 }}>
            {item.title}
          </Text>
        )}
      />
    </View>
  );
}
