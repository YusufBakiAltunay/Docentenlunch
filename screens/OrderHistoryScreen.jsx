import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Alert,
} from "react-native";
import { getOrders, deleteOrder } from "../storage/orderStorage";


export default function OrderHistoryScreen({ docent }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    const data = await getOrders();
    setOrders(data.reverse()); 
  };

  const handleDelete = (orderId) => {
    Alert.alert(
      "Bestelling verwijderen",
      "Weet je zeker dat je deze bestelling wilt verwijderen?",
      [
        { text: "Annuleren", style: "cancel" },
        {
          text: "Verwijderen",
          style: "destructive",
          onPress: async () => {
            await deleteOrder(orderId);

            const updatedOrders = await getOrders();
            setOrders(updatedOrders.reverse());
          },
        },
      ]
    );
  };

  const renderOrder = ({ item }) => (
    <View style={styles.orderBox}>
      <Text style={styles.user}>👤 {item.user}</Text>

      <Text style={styles.date}>{item.date}</Text>

      {item.items.map((product, index) => (
        <Text key={index} style={styles.item}>
          • {product.name}
        </Text>
      ))}

      {item.note ? <Text style={styles.note}>📝 Notitie: {item.note}</Text> : null}

      {docent &&
        docent.voornaam.toLowerCase() === "admin" &&
        docent.achternaam.toLowerCase() === "admin" && (
          <Pressable
            style={styles.deleteButton}
            onPress={() => handleDelete(item.id)}
          >
            <Text style={styles.deleteText}>🗑️</Text>
          </Pressable>
        )}
    </View>
  );

  return (
    
      <View style={styles.container}>
        <Text style={styles.title}>📜 Bestelgeschiedenis</Text>

        {orders.length === 0 ? (
          <Text style={styles.empty}>Nog geen bestellingen</Text>
        ) : (
          <FlatList
            data={orders}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderOrder}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9fafb",
    width: "100%",
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

  orderBox: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },

  date: {
    fontWeight: "bold",
    marginBottom: 8,
    color: "#2563eb",
  },

  item: {
    fontSize: 15,
    marginLeft: 5,
    marginBottom: 3,
  },

  deleteButton: {
    marginTop: 10,
    padding: 8,
    backgroundColor: "#f87171",
    borderRadius: 8,
    alignSelf: "flex-start",
  },

  deleteText: {
    fontSize: 18,
    color: "#fff",
  },

  note: {
    marginTop: 8,
    fontStyle: "italic",
    color: "#374151",
  },
  user: {
    fontWeight: "bold",
    marginBottom: 4,
    color: "#111827",
  },
});
