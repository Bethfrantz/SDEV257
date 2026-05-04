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

export default function PlanetsScreen() {
  const [searchText, setSearchText] = useState('');
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    fetch("https://swapi.py4e.com/api/planets/")
      .then(res => res.json())
      .then(data => setPlanets(data.results))
      .catch(err => console.error(err));
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/planets.jpg")}
        style={{ width: "100%", height: 150, resizeMode: "cover", marginBottom: 15 }}
      />

      <Text style={styles.header}>Planets</Text>

      <TextInput
        style={styles.input}
        placeholder="Search planets..."
        value={searchText}
        onChangeText={setSearchText}
      />

      <ScrollView style={{ marginTop: 10 }}>
        {planets
          .filter(p => p.name.toLowerCase().includes(searchText.toLowerCase()))
          .map(planet => (
            <SwipeableItem
              key={planet.name}
              item={{ name: planet.name }}
              onSwipe={() => {}}
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

