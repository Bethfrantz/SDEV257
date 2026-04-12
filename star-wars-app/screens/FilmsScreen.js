import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet } from 'react-native';

export default function FilmsScreen() {
  const [searchText, setSearchText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleSubmit = () => {
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Films</Text>

      <TextInput
        style={styles.input}
        placeholder="Search films..."
        value={searchText}
        onChangeText={setSearchText}
      />

      <Button title="Submit" onPress={handleSubmit} />

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>You entered:</Text>
            <Text style={styles.modalText}>{searchText}</Text>

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


