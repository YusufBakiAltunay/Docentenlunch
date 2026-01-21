import { View, Text, Pressable, StyleSheet } from "react-native";

export default function CartScreen({ cart, setCart, setActiveTab }) {
  const completeOrder = () => {
    setCart([]); 
    setActiveTab("tikkie"); 
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sepetim</Text>

      {cart.length === 0 && <Text style={styles.empty}>Sepet boş</Text>}

      {cart.map((item, index) => (
        <Text key={index} style={styles.item}>
          • {item.name}
        </Text>
      ))}

      {cart.length > 0 && (
        <Pressable style={styles.button} onPress={completeOrder}>
          <Text style={styles.buttonText}>Siparişi Tamamla</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:'100%',
    width:"100%",
    padding: 20,
    backgroundColor: "#f9fafb",
    justifyContent:"center",
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
});
