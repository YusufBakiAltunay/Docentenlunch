import { useState } from "react";
import { View, Text, StyleSheet, Pressable, SafeAreaView } from "react-native";
import TabBar from "../components/TabBar";
import AdminAddProduct from "./AdminAddProduct.jsx";
import ProductsScreen from "./ProductsScreen.jsx";
import CartScreen from "./CartScreen.jsx";
import OrderHistoryScreen from "./OrderHistoryScreen.jsx";
import QuickProductsScreen from "./QuickProductsScreen.jsx";

export default function HomeTabs({ docent, onLogout }) {
  const [activeTab, setActiveTab] = useState("products");
  const [cart, setCart] = useState([]);

  return (
    <SafeAreaView style={styles.safeArea}>
      
      <View style={styles.header}>
        <Text style={styles.welcome}>
          Welkom, {docent.voornaam} {docent.tussenvoegsel} {docent.achternaam}
        </Text>

        <Pressable style={styles.logoutButton} onPress={onLogout}>
          <Text style={styles.logoutText}>Uitloggen</Text>
        </Pressable>
      </View>

      
      <View style={styles.content}>
        {activeTab === "products" && (
          <ProductsScreen docent={docent} cart={cart} setCart={setCart} />
        )}

        {activeTab === "cart" && (
          <CartScreen
            cart={cart}
            setCart={setCart}
            setActiveTab={setActiveTab}
            docent={docent}
          />
        )}

        {activeTab === "history" && <OrderHistoryScreen docent={docent} />}

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

        {activeTab === "quick" && (
          <QuickProductsScreen cart={cart} setCart={setCart} />
        )}
      </View>

      
      <TabBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isAdmin={docent.isAdmin}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f9fafb",
  },

  welcome: {
    fontSize: 18,
    fontWeight: "bold",
  },

  logoutButton: {
    backgroundColor: "#f87171",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },

  logoutText: {
    color: "#fff",
    fontWeight: "bold",
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
