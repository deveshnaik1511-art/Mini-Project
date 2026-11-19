import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView
} from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcome}>Welcome to 👋</Text>
        <Text style={styles.title}>Student Hub</Text>
        <Text style={styles.subtitle}>
          Your Campus, Your World!
        </Text>
      </View>

      <Text style={styles.heading}>Explore Services</Text>

      <View style={styles.grid}>
        <TouchableOpacity
          style={[styles.card, { backgroundColor: '#4F46E5' }]}
          onPress={() => navigation.navigate('Notes')}
        >
          <Text style={styles.icon}>📚</Text>
          <Text style={styles.cardTitle}>Study Materials</Text>
          <Text style={styles.cardText}>Access your notes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, { backgroundColor: '#0891B2' }]}
          onPress={() => navigation.navigate('Events')}
        >
          <Text style={styles.icon}>📅</Text>
          <Text style={styles.cardTitle}>College Events</Text>
          <Text style={styles.cardText}>Upcoming activities</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, { backgroundColor: '#16A34A' }]}
          onPress={() => navigation.navigate('Weather')}
        >
          <Text style={styles.icon}>🌤️</Text>
          <Text style={styles.cardTitle}>Weather</Text>
          <Text style={styles.cardText}>Check local weather</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, { backgroundColor: '#EA580C' }]}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.icon}>👤</Text>
          <Text style={styles.cardTitle}>My Profile</Text>
          <Text style={styles.cardText}>View your account</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.info}>
        <Text style={styles.infoTitle}>🎓 Student Hub</Text>
        <Text style={styles.infoText}>
          Manage your studies, explore college events and stay updated.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    backgroundColor: '#4F46E5',
    padding: 30,
    paddingTop: 45,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  welcome: {
    color: 'white',
    fontSize: 18,
  },
  title: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 5,
  },
  subtitle: {
    color: '#E0E7FF',
    marginTop: 8,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    margin: 20,
    color: '#1F2937',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  card: {
    width: '43%',
    padding: 18,
    borderRadius: 15,
    marginBottom: 18,
    minHeight: 145,
  },
  icon: {
    fontSize: 32,
    marginBottom: 10,
  },
  cardTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardText: {
    color: 'white',
    fontSize: 12,
    marginTop: 5,
  },
  info: {
    backgroundColor: 'white',
    margin: 18,
    padding: 20,
    borderRadius: 15,
    marginBottom: 30,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3730A3',
  },
  infoText: {
    color: '#555',
    marginTop: 8,
    lineHeight: 22,
  },
});