import { View, Text, StyleSheet, Pressable, Alert } from "react-native";

const QUICK_PRODUCTS = [
  {
    id: "q1",
    name: "Kaasbroodje",
    description: "Vers bladerdeeg met gesmolten kaas",
  },
  {
    id: "q2",
    name: "Tosti kaas",
    description: "Geroosterd brood met kaas",
  },
  {
    id: "q3",
    name: "Koffie",
    description: "Zwarte koffie of met melk",
  },
  {
    id: "q4",
    name: "Soep van de dag",
    description: "Dagelijks wisselende verse soep",
  },
  {
    id: "q5",
    name: "Broodje gezond",
    description: "Belegd broodje met kaas, groente en ei",
  },
];


export default function QuickProductsScreen({ cart, setCart }) {
  const addToCart = (product) => {
    setCart([...cart, product]);
    Alert.alert("Toegevoegd", `${product.name} toegevoegd`);
  };

  const removeFromCart = (product) => {
    const index = cart.findIndex((p) => p.name === product.name);
    if (index === -1) return;

    const updated = [...cart];
    updated.splice(index, 1);
    setCart(updated);

    Alert.alert("Verwijderd", `${product.name} verwijderd`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>⭐ Veel gekozen producten</Text>

      {QUICK_PRODUCTS.map((item) => (
        <View key={item.id} style={styles.box}>
          <View>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.desc}>{item.description}</Text>
          </View>

          <View style={styles.controls}>
            <Pressable onPress={() => addToCart(item)}>
              <Text style={styles.icon}>➕</Text>
            </Pressable>

            <Pressable onPress={() => removeFromCart(item)}>
              <Text style={styles.icon}>➖</Text>
            </Pressable>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 20,
    backgroundColor: "#f9fafb",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  box: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    alignItems:'center',
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
  },
  controls: {
    flexDirection: "row",
    gap: 12,
  },
  icon: {
    fontSize: 20,
  },
});
