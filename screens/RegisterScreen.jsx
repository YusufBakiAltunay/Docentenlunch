import { useState } from 'react';
import { View, TextInput, Text, Pressable, StyleSheet } from 'react-native';
import { saveDocent } from '../storage/docentStorage';

export default function RegisterScreen({ onRegister, goToLogin }) {
  const [voornaam, setVoornaam] = useState('');
  const [tussenvoegsel, setTussenvoegsel] = useState('');
  const [achternaam, setAchternaam] = useState('');

  const handleRegister = async () => {
  if (!voornaam || !achternaam) {
    alert('Voornaam en achternaam zijn verplicht');
    return;
  }

  const docent = { voornaam, tussenvoegsel, achternaam };
  await saveDocent(docent);

  alert('Registratie succesvol. Log nu in.');
  goToLogin();
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registreren</Text>

      <TextInput
        style={styles.input}
        placeholder="Voornaam *"
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
        placeholder="Achternaam *"
        value={achternaam}
        onChangeText={setAchternaam}
      />

      <Pressable style={styles.primaryButton} onPress={handleRegister}>
        <Text style={styles.primaryButtonText}>Registreren</Text>
      </Pressable>

      <Pressable onPress={goToLogin}>
        <Text style={styles.link}>Terug naar login</Text>
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
