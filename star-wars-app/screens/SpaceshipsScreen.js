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

export default function SpaceshipsScreen() {
  const [searchText, setSearchText] = useState('');
  const [ships, setShips] = useState([]);

  useEffect(() => {
    fetch("https://swapi.py4e.com/api/starships/")
      .then(res => res.json())
      .then(data => setShips(data.results))
      .catch(err => console.error(err));
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/ships.jpg")}
        style={{ width: "100%", height: 150, resizeMode: "cover", marginBottom: 15 }}
      />

      <Text style={styles.header}>Spaceships</Text>

      <TextInput
        style={styles.input}
        placeholder="Search spaceships..."
        value={searchText}
        onChangeText={setSearchText}
      />

      <ScrollView style={{ marginTop: 10 }}>
        {ships
          .filter(s => s.name.toLowerCase().includes(searchText.toLowerCase()))
          .map(ship => (
            <SwipeableItem
              key={ship.name}
              item={{ name: ship.name }}
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

