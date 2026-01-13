import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'docent';

export const saveDocent = async (docent) => {
  await AsyncStorage.setItem(KEY, JSON.stringify(docent));
};

export const getDocent = async () => {
  const data = await AsyncStorage.getItem(KEY);
  return data ? JSON.parse(data) : null;
};

export const removeDocent = async () => {
  await AsyncStorage.removeItem(KEY);
};
