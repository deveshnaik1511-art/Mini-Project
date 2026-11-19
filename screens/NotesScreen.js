import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, FlatList, Alert
} from 'react-native';

import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';
import { db, auth } from '../firebase/firebaseConfig';

export default function NotesScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [notes, setNotes] = useState([]);

  const loadNotes = async () => {
    try {
      const q = query(
        collection(db, 'notes'),
        orderBy('createdAt', 'desc')
      );
      const result = await getDocs(q);
      setNotes(result.docs.map(item => ({
        id: item.id,
        ...item.data()
      })));
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const addNote = async () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert('Error', 'Enter note title and description');
      return;
    }

    try {
      await addDoc(collection(db, 'notes'), {
        title: title.trim(),
        description: description.trim(),
        userId: auth.currentUser.uid,
        createdAt: new Date().toISOString()
      });

      setTitle('');
      setDescription('');
      Alert.alert('Success', 'Note added successfully');
      loadNotes();
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  React.useEffect(() => {
    loadNotes();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>📚 Study Materials</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter note title"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={[styles.input, styles.description]}
        placeholder="Enter note description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={addNote}>
        <Text style={styles.buttonText}>+ Add Note</Text>
      </TouchableOpacity>

      <Text style={styles.subheading}>Your Notes</Text>

      <FlatList
        data={notes}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <Text style={styles.empty}>No notes added yet.</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.noteCard}>
            <Text style={styles.noteTitle}>{item.title}</Text>
            <Text style={styles.noteDescription}>
              {item.description}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    padding: 20,
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#3730A3',
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'white',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  description: {
    height: 90,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#4F46E5',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  subheading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 12,
  },
  noteCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
  },
  noteTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#3730A3',
  },
  noteDescription: {
    marginTop: 7,
    color: '#555',
  },
  empty: {
    color: '#777',
    textAlign: 'center',
    marginTop: 20,
  },
});