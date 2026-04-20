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

export default function FilmsScreen() {
  const [searchText, setSearchText] = useState('');
  const [films, setFilms] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFilm, setSelectedFilm] = useState(null);

  // Fetch films (or use your existing fetch logic)
  useEffect(() => {
    fetch("https://swapi.py4e.com/api/films/")
      .then(res => res.json())
      .then(data => setFilms(data.results))
      .catch(err => console.error(err));
  }, []);

  function handleSwipe(film) {
    setSelectedFilm(film);
    setModalVisible(true);
  }

  return (
    <View style={styles.container}>
       <Image
        source={require("../assets/images/films.jpg")}
        style={{ width: "100%", height: 150, resizeMode: "cover", marginBottom: 15 }}
        loading="lazy"
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
              item={{ name: film.title }}   // SwipeableItem expects item.name
              onSwipe={() => handleSwipe(film)}
            />
          ))}
      </ScrollView>

      {/* Modal for swiped film */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>You swiped:</Text>
            <Text style={styles.modalText}>{selectedFilm?.title}</Text>

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


