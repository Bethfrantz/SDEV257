import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text } from "react-native";
import { fetchMovieDetails, IMG_URL } from "../../lib/tmdb";

export default function MovieDetail() {
  const { id } = useLocalSearchParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchMovieDetails(id).then(setMovie);
  }, [id]);

  if (!movie) {
    return <Text style={{ color: "white", padding: 20 }}>Loading...</Text>;
  }

  const poster = movie.poster_path
    ? IMG_URL + movie.poster_path
    : "https://via.placeholder.com/500x750?text=No+Image";

  const title = movie.title || "Untitled Movie";
  const overview = movie.overview || "No description available.";
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#111", padding: 20 }}>
      <Image
        source={{ uri: poster }}
        style={{ width: "100%", height: 450, borderRadius: 12 }}
      />

      <Text style={{ color: "white", fontSize: 28, marginTop: 20 }}>
        {title}
      </Text>

      <Text style={{ color: "#ccc", marginTop: 10 }}>⭐ {rating} / 10</Text>

      <Text style={{ color: "white", marginTop: 20, lineHeight: 22 }}>
        {overview}
      </Text>
    </ScrollView>
  );
}
