import { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { getProducts } from "../storage/productStorage";

export default function ProductsScreen() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((p) => p.id !== productId));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tüm Ürünler</Text>

      {products.length === 0 && (
        <Text style={styles.empty}>Henüz ürün yok</Text>
      )}

      {products.map((product) => (
        <View key={product.id} style={styles.product}>
          <View>
            <Text style={styles.name}>{product.name}</Text>
            {product.description ? (
              <Text style={styles.desc}>{product.description}</Text>
            ) : null}
          </View>

          <View style={styles.buttons}>
            <Pressable onPress={() => addToCart(product)}>
              <Text style={styles.plus}>➕</Text>
            </Pressable>

            <Pressable onPress={() => removeFromCart(product.id)}>
              <Text style={styles.minus}>➖</Text>
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
    justifyContent:"space-between",
    borderBottomWidth:1/2,
  },
  buttons: {
    marginRight: 10,
    paddingLeft:250,
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
