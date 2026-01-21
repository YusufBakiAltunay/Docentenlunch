import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'products';

export const getProducts = async () => {
  const data = await AsyncStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
};

export const addProduct = async (product) => {
  const products = await getProducts();
  products.push(product);
  await AsyncStorage.setItem(KEY, JSON.stringify(products));
};

export const deleteProduct = async (productId) => {
  const products = await getProducts(); 
  const filtered = products.filter((p) => p.id !== productId); 
  await AsyncStorage.setItem("products", JSON.stringify(filtered)); 
};
