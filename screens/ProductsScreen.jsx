import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Alert,
} from "react-native";
import { getProducts, deleteProduct } from "../storage/productStorage";

export default function ProductsScreen({ docent, cart, setCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  const isAdmin =
    docent &&
    docent.voornaam?.toLowerCase() === "admin" &&
    docent.achternaam?.toLowerCase() === "admin";

  
  const addToCart = (product) => {
    setCart([...cart, product]);
    Alert.alert(
      "Toegevoegd aan winkelmand",
      `${product.name} is toegevoegd aan de winkelmand`
    );
  };

  
  const removeFromCart = (product) => {
    const index = cart.findIndex((p) => p.id === product.id);

    if (index === -1) {
      Alert.alert("Waarschuwing", "Dit product zit niet in de winkelmand");
      return;
    }

    const updatedCart = [...cart];
    updatedCart.splice(index, 1);

    setCart(updatedCart);
    Alert.alert(
      "Verwijderd uit winkelmand",
      `${product.name} is verwijderd uit de winkelmand`
    );
  };

  
  const handleDelete = (productId) => {
    Alert.alert(
      "Product verwijderen",
      "Weet je zeker dat je dit product wilt verwijderen?",
      [
        { text: "Annuleren", style: "cancel" },
        {
          text: "Verwijderen",
          style: "destructive",
          onPress: async () => {
            await deleteProduct(productId);
            const updated = await getProducts();
            setProducts(updated);
          },
        },
      ]
    );
  };

  const renderProduct = ({ item }) => (
    <View style={styles.productBox}>
      
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        {item.description ? (
          <Text style={styles.productDesc}>{item.description}</Text>
        ) : null}
      </View>

      
      <View style={styles.leftControls}>
        <Pressable style={styles.iconButton} onPress={() => addToCart(item)}>
          <Text style={styles.icon}>➕</Text>
        </Pressable>

        <Pressable
          style={styles.iconButton}
          onPress={() => removeFromCart(item)}
        >
          <Text style={styles.icon}>➖</Text>
        </Pressable>
      </View>

      
      {isAdmin && (
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
      <Text style={styles.title}>🥪 Producten</Text>

      {products.length === 0 ? (
        <Text style={styles.empty}>Nog geen producten</Text>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderProduct}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 20,
    backgroundColor: "#f9fafb",
    marginTop: 50,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },

  empty: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: "#6b7280",
  },

  productBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },

  leftControls: {
    marginRight: 10,
    alignItems: "center",
  },

  iconButton: {
    padding: 4,
  },

  icon: {
    fontSize: 20,
  },

  productInfo: {
    flex: 1,
  },

  productName: {
    fontSize: 16,
    fontWeight: "bold",
  },

  productDesc: {
    fontSize: 14,
    color: "#6b7280",
  },

  deleteButton: {
    padding: 6,
    backgroundColor: "#f87171",
    borderRadius: 8,
  },

  deleteText: {
    fontSize: 18,
    color: "#fff",
  },
});
