import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import TabBar from "../components/TabBar";
import AdminAddProduct from "./AdminAddProduct.jsx";
import ProductsScreen from "./ProductsScreen.jsx";



export default function HomeTabs({ docent }) {
  const [activeTab, setActiveTab] = useState("products");

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {activeTab === "products" && <ProductsScreen />}
        {activeTab === "cart" && <Text>🛒 Sepet Sayfası</Text>}
        {activeTab === "history" && <Text>📜 Geçmiş Sayfası</Text>}
        {activeTab === "admin" && <AdminAddProduct />}
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
