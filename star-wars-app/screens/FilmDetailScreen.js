// FilmDetailScreen.js
import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

export default function FilmDetailScreen({ route }) {
  const { film } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{film.title}</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Episode</Text>
        <Text style={styles.value}>{film.episode_id}</Text>

        <Text style={styles.label}>Director</Text>
        <Text style={styles.value}>{film.director}</Text>

        <Text style={styles.label}>Producer</Text>
        <Text style={styles.value}>{film.producer}</Text>

        <Text style={styles.label}>Release Date</Text>
        <Text style={styles.value}>{film.release_date}</Text>

        <Text style={styles.label}>Opening Crawl</Text>
        <Text style={styles.value}>{film.opening_crawl}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#111" },
  title: { fontSize: 28, fontWeight: "bold", color: "#FFE81F", marginBottom: 20 },
  card: { backgroundColor: "#222", padding: 20, borderRadius: 10 },
  label: { color: "#999", marginTop: 12, fontSize: 14 },
  value: { color: "white", fontSize: 18, marginTop: 4 }
});
