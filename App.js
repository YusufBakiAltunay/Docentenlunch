import { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import HomeTabs from './screens/HomeTabs.jsx';

export default function App() {
  const [page, setPage] = useState('login');
  const [docent, setDocent] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const savedUser = await AsyncStorage.getItem('currentUser');
        if (savedUser) {
          setDocent(JSON.parse(savedUser));
          setPage('home');
        }
      } catch (e) {
        console.log('Gebruiker kon niet geladen worden', e);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const handleLogout = async () => {
    Alert.alert(
      'Uitloggen',
      'Weet je zeker dat je wilt uitloggen?',
      [
        { text: 'Annuleren', style: 'cancel' },
        {
          text: 'Uitloggen',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.removeItem('currentUser');
            setDocent(null);
            setPage('login');
          },
        },
      ]
    );
  };

  return (
    <View style={styles.app}>
      {page === 'login' && (
        <LoginScreen
          onLogin={async (d) => {
            const isAdmin =
              d.voornaam === 'Admin' && d.achternaam === 'Admin';

            const user = { ...d, isAdmin };
            setDocent(user);
            await AsyncStorage.setItem('currentUser', JSON.stringify(user));
            setPage('home');
          }}
          goToRegister={() => setPage('register')}
        />
      )}

      {page === 'register' && (
        <RegisterScreen
          goToLogin={() => setPage('login')}
          onRegister={async (d) => {
            const isAdmin =
              d.voornaam === 'Admin' && d.achternaam === 'Admin';

            const user = { ...d, isAdmin };
            setDocent(user);
            await AsyncStorage.setItem('currentUser', JSON.stringify(user));
            setPage('home');
          }}
        />
      )}

      {page === 'home' && (
        <HomeTabs docent={docent} onLogout={handleLogout} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
