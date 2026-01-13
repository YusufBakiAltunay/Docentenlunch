import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import { getDocent } from './storage/docentStorage';

export default function App() {
  const [page, setPage] = useState('login');
  const [docent, setDocent] = useState(null);

  useEffect(() => {
    const loadDocent = async () => {
      const storedDocent = await getDocent();
      if (storedDocent) {
        setDocent(storedDocent);
        setPage('home');
      }
    };
    loadDocent();
  }, []);

  return (
    <View style={styles.app}>
      {page === 'login' && (
        <LoginScreen
          onLogin={(d) => {
            setDocent(d);
            setPage('home');
          }}
          goToRegister={() => setPage('register')}
        />
      )}

      {page === 'register' && (
  <RegisterScreen
    goToLogin={() => setPage('login')}
  />
)}


      {page === 'home' && (
        <HomeScreen
          docent={docent}
          onLogout={() => {
            setDocent(null);
            setPage('login');
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
});
