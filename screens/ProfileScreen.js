import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity,
  StyleSheet, ActivityIndicator, Alert
} from 'react-native';

import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebaseConfig';

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const currentUser = auth.currentUser;

        if (currentUser) {
          const userDoc = await getDoc(
            doc(db, 'users', currentUser.uid)
          );

          if (userDoc.exists()) {
            setUser(userDoc.data());
          } else {
            setUser({
              name: currentUser.displayName || 'Student',
              email: currentUser.email
            });
          }
        }
      } catch (error) {
        Alert.alert('Error', 'Unable to load profile');
      }

      setLoading(false);
    };

    loadProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);

      navigation.getParent()?.reset({
        index: 0,
        routes: [{ name: 'Login' }]
      });
    } catch (error) {
      Alert.alert('Error', 'Logout failed');
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4F46E5" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.avatar}>👨‍🎓</Text>
      <Text style={styles.title}>My Profile</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Student Name</Text>
        <Text style={styles.info}>{user?.name || 'Student'}</Text>

        <Text style={styles.label}>Email Address</Text>
        <Text style={styles.info}>{user?.email || 'Not available'}</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>LOGOUT</Text>
      </TouchableOpacity>
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
  avatar: {
    fontSize: 75,
    textAlign: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3730A3',
    textAlign: 'center',
    marginVertical: 20,
  },
  card: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 12,
  },
  label: {
    color: '#666',
    fontSize: 14,
    marginTop: 10,
  },
  info: {
    color: '#222',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  button: {
    backgroundColor: '#DC2626',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});