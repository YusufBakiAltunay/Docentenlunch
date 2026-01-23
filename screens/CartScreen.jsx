import { View, Text, Pressable, StyleSheet, TextInput } from "react-native";
import { addOrder } from "../storage/orderStorage";
import { useState } from "react";


export default function CartScreen({ cart, setCart, setActiveTab, docent }) {
    const [note, setNote] = useState("");
  const completeOrder = async () => {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();

   
    if (hour > 11 || (hour === 11 && minute >= 30)) {
      alert("Je kunt alleen vóór 11:30 bestellen.");
      return;
    }
    const newOrder = {
      id: Date.now(),
      items: cart,
      note: note,
      user: `${docent.voornaam} ${docent.tussenvoegsel} ${docent.achternaam}`,
      date: new Date().toLocaleString(),
    };

    await addOrder(newOrder);

    setCart([]);
    setNote("");
    setActiveTab("tikkie");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛒 Mijn winkelwagen</Text>

      {cart.length === 0 && (
        <Text style={styles.empty}>De winkelwagen is leeg</Text>
      )}

      {cart.map((item, index) => (
        <Text key={index} style={styles.item}>
          • {item.name}
        </Text>
      ))}

      {cart.length > 0 && (
        <>
          <Text style={styles.noteLabel}>Extra wensen / opmerkingen</Text>

          <TextInput
            style={styles.noteInput}
            placeholder="Bijv. zonder saus, allergie, iets anders..."
            value={note}
            onChangeText={setNote}
            multiline
          />
        </>
      )}

      {cart.length > 0 && (
        <Pressable style={styles.button} onPress={completeOrder}>
          <Text style={styles.buttonText}>Bestelling afronden</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    padding: 20,
    backgroundColor: "#f9fafb",
    justifyContent: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  empty: {
    textAlign: "center",
    color: "#6b7280",
    marginTop: 40,
    fontSize: 16,
  },

  itemBox: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },

  itemText: {
    fontSize: 16,
    fontWeight: "500",
  },

  button: {
    backgroundColor: "#16a34a",
    padding: 16,
    borderRadius: 10,
    marginTop: 20,
  },

  buttonText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },

  noteLabel: {
    marginTop: 20,
    marginBottom: 6,
    fontSize: 14,
    fontWeight: "600",
  },

  noteInput: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    minHeight: 80,
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
});
