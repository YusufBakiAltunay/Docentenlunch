import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { getDocent } from '../storage/docentStorage';

export default function LoginScreen({ onLogin, goToRegister }) {
  const [voornaam, setVoornaam] = useState('');
  const [tussenvoegsel, setTussenvoegsel] = useState('');
  const [achternaam, setAchternaam] = useState('');

  const handleLogin = async () => {
    const storedDocent = await getDocent();
    if (!storedDocent) {
      alert('Geen account gevonden, registreer eerst');
      return;
    }

    if (
      storedDocent.voornaam === voornaam &&
      storedDocent.tussenvoegsel === tussenvoegsel &&
      storedDocent.achternaam === achternaam
    ) {
      onLogin(storedDocent);
    } else {
      alert('Gegevens komen niet overeen. Probeer opnieuw.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inloggen</Text>

      <TextInput
        style={styles.input}
        placeholder="Voornaam"
        value={voornaam}
        onChangeText={setVoornaam}
      />

      <TextInput
        style={styles.input}
        placeholder="Tussenvoegsel (optioneel)"
        value={tussenvoegsel}
        onChangeText={setTussenvoegsel}
      />

      <TextInput
        style={styles.input}
        placeholder="Achternaam"
        value={achternaam}
        onChangeText={setAchternaam}
      />

      <Pressable style={styles.primaryButton} onPress={handleLogin}>
        <Text style={styles.primaryButtonText}>Inloggen</Text>
      </Pressable>

      <Pressable onPress={goToRegister}>
        <Text style={styles.link}>Account aanmaken</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding:10,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  primaryButton: {
    backgroundColor: '#2563eb',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  primaryButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  link: {
    textAlign: 'center',
    color: '#2563eb',
    marginTop: 15,
  },
});
