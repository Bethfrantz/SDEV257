import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { fetchTrending, IMG_URL } from "../lib/tmdb";

export default function Trending() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchTrending().then((data) => setMovies(data.results));
  }, []);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#111", padding: 10 }}>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {movies.map((movie) => (
          <TouchableOpacity
            key={movie.id}
            onPress={() => router.push(`/movie/${movie.id}`)}
            style={{ marginBottom: 20 }}
          >
            <ImageBackground
              source={{ uri: IMG_URL + movie.poster_path }}
              style={{
                width: 180,
                height: 270, // perfect TMDB poster ratio
                borderRadius: 8,
                overflow: "hidden",
              }}
            />

            <Text
              style={{
                color: "white",
                marginTop: 10,
                width: 180,
              }}
              numberOfLines={1}
            >
              {movie.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
