import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity,
  StyleSheet, ActivityIndicator, Alert
} from 'react-native';

export default function WeatherScreen() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const getWeather = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=15.40&longitude=73.98&current=temperature_2m,relative_humidity_2m,wind_speed_10m'
      );

      const data = await response.json();
      setWeather(data.current);
    } catch (error) {
      Alert.alert('Error', 'Unable to load weather');
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather</Text>
      <Text style={styles.subtitle}>Current Weather in Goa</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={getWeather}
      >
        <Text style={styles.buttonText}>GET WEATHER</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#4F46E5" />}

      {weather && (
        <View style={styles.card}>
          <Text style={styles.info}>
            Temperature: {weather.temperature_2m} °C
          </Text>
          <Text style={styles.info}>
            Humidity: {weather.relative_humidity_2m} %
          </Text>
          <Text style={styles.info}>
            Wind Speed: {weather.wind_speed_10m} km/h
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    padding: 25,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#3730A3',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 17,
    textAlign: 'center',
    marginVertical: 20,
    color: '#555',
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
  },
  card: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 12,
    marginTop: 25,
  },
  info: {
    fontSize: 18,
    marginVertical: 10,
    color: '#333',
  },
});