import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, FlatList, Alert
} from 'react-native';

import { collection, addDoc, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

export default function EventsScreen() {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [events, setEvents] = useState([]);

  const loadEvents = async () => {
    try {
      const q = query(
        collection(db, 'events'),
        orderBy('createdAt', 'desc')
      );
      const result = await getDocs(q);
      setEvents(result.docs.map(item => ({
        id: item.id,
        ...item.data()
      })));
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const addEvent = async () => {
    if (!eventName.trim() || !eventDate.trim()) {
      Alert.alert('Error', 'Please enter event name and date');
      return;
    }

    try {
      await addDoc(collection(db, 'events'), {
        eventName: eventName.trim(),
        eventDate: eventDate.trim(),
        createdAt: new Date().toISOString()
      });

      setEventName('');
      setEventDate('');
      Alert.alert('Success', 'Event added successfully');
      loadEvents();
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  React.useEffect(() => {
    loadEvents();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>📅 College Events</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter event name"
        value={eventName}
        onChangeText={setEventName}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter event date (DD/MM/YYYY)"
        value={eventDate}
        onChangeText={setEventDate}
      />

      <TouchableOpacity style={styles.button} onPress={addEvent}>
        <Text style={styles.buttonText}>+ Add Event</Text>
      </TouchableOpacity>

      <Text style={styles.subheading}>Upcoming Events</Text>

      <FlatList
        data={events}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <Text style={styles.empty}>No events added yet.</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.eventCard}>
            <Text style={styles.eventTitle}>{item.eventName}</Text>
            <Text style={styles.eventDate}>📆 {item.eventDate}</Text>
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
  button: {
    backgroundColor: '#0891B2',
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
  eventCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  eventTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#0E7490',
  },
  eventDate: {
    marginTop: 8,
    color: '#555',
  },
  empty: {
    color: '#777',
    textAlign: 'center',
    marginTop: 20,
  },
});