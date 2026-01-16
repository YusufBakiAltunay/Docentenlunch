import { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import HomeTabs from './screens/HomeTabs.jsx';

export default function App() {
  const [page, setPage] = useState('login');
  const [docent, setDocent] = useState(null);

  return (
    <View style={styles.app}>
      {page === 'login' && (
        <LoginScreen
          onLogin={(d) => {
            // ADMIN KONTROLÜ
            const isAdmin =
              d.voornaam === 'Admin' && d.achternaam === 'Admin';

            setDocent({ ...d, isAdmin });
            setPage('home');
          }}
          goToRegister={() => setPage('register')}
        />
      )}

      {page === 'register' && (
        <RegisterScreen goToLogin={() => setPage('login')} />
      )}

      {page === 'home' && <HomeTabs docent={docent} />}
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
