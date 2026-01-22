import { View, Text, Pressable, StyleSheet } from "react-native";

export default function TabBar({ activeTab, setActiveTab, isAdmin }) {
  return (
    <View style={styles.container}>
      
      <Pressable onPress={() => setActiveTab("products")}>
        <Text
          style={activeTab === "products" ? styles.active : styles.inactive}
        >
          🥪
        </Text>
      </Pressable>

     
      <Pressable onPress={() => setActiveTab("cart")}>
        <Text style={activeTab === "cart" ? styles.active : styles.inactive}>
          🛒
        </Text>
      </Pressable>

      
      <Pressable onPress={() => setActiveTab("history")}>
        <Text style={activeTab === "history" ? styles.active : styles.inactive}>
          📜
        </Text>
      </Pressable>

      
      {isAdmin && (
        <Pressable onPress={() => setActiveTab("admin")}>
          <Text style={activeTab === "admin" ? styles.active : styles.inactive}>
            ⚙️
          </Text>
        </Pressable>
      )}

      <Pressable onPress={() => setActiveTab("quick")}>
        <Text style={activeTab === "quick" ? styles.active : styles.inactive}>
          ⭐
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderColor: "#ddd",
    paddingTop:20,
  },
  active: {
    color: "#2563eb",
    fontWeight: "bold",
  },
  inactive: {
    color: "#555",
  },
});
