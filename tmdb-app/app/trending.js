import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { fetchTrending, IMG_URL } from "../lib/tmdb";

export default function Trending() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchTrending().then((data) => setMovies(data.results));
  }, []);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#111", padding: 10 }}>
      {movies.map((movie) => (
        <TouchableOpacity
          key={movie.id}
          onPress={() => router.push(`/movie/${movie.id}`)}
          style={{ marginBottom: 20 }}
        >
          <ImageBackground
            source={{ uri: IMG_URL + movie.poster_path }}
            style={{ width: "100%", height: 300, borderRadius: 8 }}
          />
          <Text style={{ color: "white", marginTop: 10 }}>{movie.title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
