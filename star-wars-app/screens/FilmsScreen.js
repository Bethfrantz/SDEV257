import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Image
} from 'react-native';

import SwipeableItem from '../components/SwipeableItem';

export default function FilmsScreen({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const [films, setFilms] = useState([]);

  useEffect(() => {
    fetch("https://swapi.py4e.com/api/films/")
      .then(res => res.json())
      .then(data => setFilms(data.results))
      .catch(err => console.error(err));
  }, []);

  function handleSwipe(film) {
    navigation.navigate("FilmDetail", { film });
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/films.jpg")}
        style={{ width: "100%", height: 150, resizeMode: "cover", marginBottom: 15 }}
      />

      <Text style={styles.header}>Films</Text>

      <TextInput
        style={styles.input}
        placeholder="Search films..."
        value={searchText}
        onChangeText={setSearchText}
      />

      <ScrollView style={{ marginTop: 10 }}>
        {films
          .filter(f => f.title.toLowerCase().includes(searchText.toLowerCase()))
          .map(film => (
            <SwipeableItem
              key={film.title}
              item={{ name: film.title }}
              onSwipe={() => handleSwipe(film)}
            />
          ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, marginBottom: 15, fontWeight: 'bold' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
  }
});


