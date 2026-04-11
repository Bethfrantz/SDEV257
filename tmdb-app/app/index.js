import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { RowFadeLeft, RowFadeRight } from "../components/RowFades";

import { LinearGradient } from "expo-linear-gradient";
import {
  fetchNowPlaying,
  fetchTopRated,
  fetchTrending,
  fetchUpcoming,
  IMG_URL,
} from "../lib/tmdb";

export default function Home() {
  const [bannerMovie, setBannerMovie] = useState(null);
  const [trending, setTrending] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);

  useEffect(() => {
    fetchTrending().then((data) => {
      setTrending(data.results);
      setBannerMovie(data.results[0]);
    });

    fetchTopRated().then((data) => setTopRated(data.results));
    fetchUpcoming().then((data) => setUpcoming(data.results));
    fetchNowPlaying().then((data) => setNowPlaying(data.results));
  }, []);

  if (!bannerMovie) return null;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#111" }}>
      {/* ⭐ HERO BANNER */}
      <ImageBackground
        source={{ uri: IMG_URL + bannerMovie.backdrop_path }}
        style={{ width: "100%", height: 500, justifyContent: "flex-end" }}
      >
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.8)", "#111"]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 250,
          }}
        />

        <View style={{ padding: 20 }}>
          <Text style={{ color: "white", fontSize: 36, fontWeight: "bold" }}>
            {bannerMovie.title}
          </Text>

          <Text
            style={{ color: "#ccc", marginTop: 10, marginBottom: 20 }}
            numberOfLines={3}
          >
            {bannerMovie.overview}
          </Text>

          <View style={{ flexDirection: "row", gap: 10 }}>
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 6,
              }}
            >
              <Text style={{ color: "#111", fontSize: 16 }}>Play</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push(`/movie/${bannerMovie.id}`)}
              style={{
                backgroundColor: "#333",
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 6,
              }}
            >
              <Text style={{ color: "white", fontSize: 16 }}>More Info</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>

      {/* ⭐ MOVIE ROWS */}
      <MovieRow title="Trending" data={trending} />
      <MovieRow title="Top Rated" data={topRated} />
      <MovieRow title="Upcoming" data={upcoming} />
      <MovieRow title="Now Playing" data={nowPlaying} />
    </ScrollView>
  );
}

function MovieRow({ title, data }) {
  return (
    <View style={{ marginTop: 30 }}>
      <Text
        style={{
          color: "white",
          fontSize: 24,
          fontWeight: "600",
          marginLeft: 15,
          marginBottom: 12,
        }}
      >
        {title}
      </Text>

      <View style={{ position: "relative" }}>
        <RowFadeLeft />
        <RowFadeRight />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          decelerationRate="fast"
          snapToInterval={152} // poster width + margin
          snapToAlignment="start"
          contentContainerStyle={{ paddingLeft: 10 }}
        >
          {data.map((movie) => {
            const scale = useSharedValue(1);

            const animatedStyle = useAnimatedStyle(() => ({
              transform: [{ scale: scale.value }],
            }));

            return (
              <TouchableOpacity
                key={movie.id}
                onPressIn={() => (scale.value = withSpring(0.95))}
                onPressOut={() => (scale.value = withSpring(1))}
                onPress={() => router.push(`/movie/${movie.id}`)}
                style={{ marginRight: 14 }}
              >
                <Animated.Image
                  source={{ uri: IMG_URL + movie.poster_path }}
                  style={[
                    {
                      width: 140,
                      height: 210,
                      borderRadius: 8,
                      overflow: "hidden",
                    },
                    animatedStyle,
                  ]}
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}
