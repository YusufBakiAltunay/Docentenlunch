import { View, Text, Pressable, StyleSheet } from "react-native";

export default function TabBar({ activeTab, setActiveTab, isAdmin }) {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => setActiveTab("products")}>
        <Text
          style={activeTab === "products" ? styles.active : styles.inactive}
        >
          Producten
        </Text>
      </Pressable>

      <Pressable onPress={() => setActiveTab("cart")}>
        <Text style={activeTab === "cart" ? styles.active : styles.inactive}>
          Winkelmand
        </Text>
      </Pressable>

      <Pressable onPress={() => setActiveTab("history")}>
        <Text style={activeTab === "history" ? styles.active : styles.inactive}>
          Geschiedenis
        </Text>
      </Pressable>

      {isAdmin && (
        <Pressable onPress={() => setActiveTab("admin")}>
          <Text style={activeTab === "admin" ? styles.active : styles.inactive}>
            Admin
          </Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: "#ddd",
    padding:20,
  },
  active: {
    color: "#2563eb",
    fontWeight: "bold",
  },
  inactive: {
    color: "#555",
  },
});
