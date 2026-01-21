import { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { getProducts } from "../storage/productStorage";
import { Alert } from "react-native";


export default function ProductsScreen({ cart, setCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
    Alert.alert("Sepete eklendi", product.name);
  };


  const removeFromCart = (productId) => {
    setCart(cart.filter((p) => p.id !== productId));
    Alert.alert("Sepetten çıkarıldı");
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tüm Ürünler</Text>

      {products.map((product) => (
        <View key={product.id} style={styles.product}>
          <View>
            <Text style={styles.name}>{product.name}</Text>
            <Text style={styles.desc}>{product.description}</Text>
          </View>

          <View style={styles.buttons}>
            <Pressable onPress={() => addToCart(product)}>
              <Text style={styles.icon}>➕</Text>
            </Pressable>

            <Pressable onPress={() => removeFromCart(product.id)}>
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
    padding: 20,
  },
  title: {
    fontSize: 22,
    marginBottom: 15,
    fontWeight: "bold",
  },
  empty: {
    color: "#777",
    textAlign: "center",
    marginTop: 30,
  },
  product: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    justifyContent: "space-between",
    borderBottomWidth: 1 / 2,
  },
  buttons: {
    marginRight: 10,
    paddingLeft: 250,
  },
  plus: {
    fontSize: 20,
  },
  minus: {
    fontSize: 20,
    marginTop: 5,
  },
  name: {
    fontWeight: "bold",
  },
  desc: {
    color: "#555",
  },
});
