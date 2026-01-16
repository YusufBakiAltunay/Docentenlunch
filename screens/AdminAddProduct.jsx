import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { addProduct } from "../storage/productStorage";

export default function AdminAddProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = async () => {
    if (!name) {
      alert("Ürün adı zorunlu");
      return;
    }

    const newProduct = {
      id: Date.now(),
      name,
      description,
    };

    await addProduct(newProduct);

    alert("Ürün eklendi");

    setName("");
    setDescription("");
    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Yeni Ürün Ekle</Text>

      <TextInput
        style={styles.input}
        placeholder="Ürün adı *"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Ürün açıklaması (opsiyonel)"
        value={description}
        onChangeText={setDescription}
      />

      <Pressable style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Kaydet</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
