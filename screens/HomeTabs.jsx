import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import TabBar from "../components/TabBar";
import AdminAddProduct from "./AdminAddProduct.jsx";
import ProductsScreen from "./ProductsScreen.jsx";
import CartScreen from "./CartScreen.jsx";
import OrderHistoryScreen from "./OrderHistoryScreen.jsx";

export default function HomeTabs({ docent }) {
  const [activeTab, setActiveTab] = useState("products");
  const [cart, setCart] = useState([]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {activeTab === "products" && (
          <ProductsScreen docent={docent} cart={cart} setCart={setCart} />
        )}

        {activeTab === "cart" && (
          <CartScreen
            cart={cart}
            setCart={setCart}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === "history" && <Text>📜 Bestelgeschiedenis</Text>}

        {activeTab === "admin" && (
          <AdminAddProduct setActiveTab={setActiveTab} />
        )}

        {activeTab === "tikkie" && (
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 24, marginBottom: 10 }}>💸 Tikkie</Text>
            <Text>De betaling vindt buiten de app plaats.</Text>
            <Text>Stuur een Tikkie naar de docent.</Text>
          </View>
        )}

        {activeTab === "history" && <OrderHistoryScreen docent={docent} />}
      </View>

      <TabBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isAdmin={docent.isAdmin}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
