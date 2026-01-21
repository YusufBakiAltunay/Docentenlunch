import AsyncStorage from "@react-native-async-storage/async-storage";

const ORDER_KEY = "orders";

export const getOrders = async () => {
  const data = await AsyncStorage.getItem(ORDER_KEY);
  return data ? JSON.parse(data) : [];
};

export const addOrder = async (order) => {
  const orders = await getOrders();
  orders.push(order);
  await AsyncStorage.setItem(ORDER_KEY, JSON.stringify(orders));
};

export const deleteOrder = async (orderId) => {
  const orders = await getOrders();
  const filtered = orders.filter((order) => order.id !== orderId);
  await AsyncStorage.setItem(ORDER_KEY, JSON.stringify(filtered));
};
