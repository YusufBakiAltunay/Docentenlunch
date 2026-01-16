import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import TabBar from "../components/TabBar";

export default function HomeTabs({ docent }) {
  const [activeTab, setActiveTab] = useState("products");

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {activeTab === "products" && <Text>📦 Ürünler Sayfası</Text>}
        {activeTab === "cart" && <Text>🛒 Sepet Sayfası</Text>}
        {activeTab === "history" && <Text>📜 Geçmiş Sayfası</Text>}
        {activeTab === "admin" && <Text>➕ Admin Ürün Ekle</Text>}
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
