import { View, Text, Pressable, StyleSheet } from 'react-native';
import { removeDocent } from '../storage/docentStorage';

export default function HomeScreen({ docent, onLogout }) {
  const handleLogout = () => {
    onLogout();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        Welkom {docent.voornaam} {docent.tussenvoegsel} {docent.achternaam}
      </Text>

      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Uitloggen</Text>
      </Pressable>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  text: {
    color: '#555',
    marginBottom: 30,
  },
  logoutButton: {
    backgroundColor: '#ef4444',
    padding: 14,
    borderRadius: 8,
  },
  logoutText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
