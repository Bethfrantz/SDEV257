import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Modal,
  StyleSheet,
  ScrollView,
  Image
} from 'react-native';

import SwipeableItem from '../components/SwipeableItem';

export default function SpaceshipsScreen() {
  const [searchText, setSearchText] = useState('');
  const [ships, setShips] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedShip, setSelectedShip] = useState(null);

  // Example fetch — replace with your existing fetch logic
  useEffect(() => {
    fetch("https://swapi.dev/api/starships/")
      .then(res => res.json())
      .then(data => setShips(data.results))
      .catch(err => console.error(err));
  }, []);

  function handleSwipe(ship) {
    setSelectedShip(ship);
    setModalVisible(true);
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/ships.jpg")}
        style={{ width: "100%", height: 150, resizeMode: "cover", marginBottom: 15 }}
        loading="lazy"
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
              item={ship}
              onSwipe={handleSwipe}
            />
          ))}
      </ScrollView>

      {/* Modal for swiped item */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>You swiped:</Text>
            <Text style={styles.modalText}>{selectedShip?.name}</Text>

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
