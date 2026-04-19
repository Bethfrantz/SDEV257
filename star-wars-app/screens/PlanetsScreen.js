import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Modal,
  StyleSheet,
  ScrollView
} from 'react-native';

import SwipeableItem from '../components/SwipeableItem';

export default function PlanetsScreen() {
  const [searchText, setSearchText] = useState('');
  const [planets, setPlanets] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  // Fetch planets (or use your existing fetch logic)
  useEffect(() => {
    fetch("https://swapi.dev/api/planets/")
      .then(res => res.json())
      .then(data => setPlanets(data.results))
      .catch(err => console.error(err));
  }, []);

  function handleSwipe(planet) {
    setSelectedPlanet(planet);
    setModalVisible(true);
  }

  return (
    <View style={styles.container}>
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
              item={planet}
              onSwipe={handleSwipe}
            />
          ))}
      </ScrollView>

      {/* Modal for swiped item */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>You swiped:</Text>
            <Text style={styles.modalText}>{selectedPlanet?.name}</Text>

            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
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
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalText: { fontSize: 18, marginBottom: 15 },
});
