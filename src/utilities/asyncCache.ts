import AsyncStorage from '@react-native-async-storage/async-storage';

const EXP_KEY = '_asyncStorage_exp';

export const setItem = (key: string, item: any, ttl?: number) => {
  if (ttl) {
    return AsyncStorage.setItem(key, JSON.stringify({ item, [EXP_KEY]: Date.now() + ttl * 1000 }));
  }

  return AsyncStorage.setItem(key, item);
};

export const getItem = async (key: string) => {
  try {
    const data = JSON.parse((await AsyncStorage.getItem(key)) || '');
    if (EXP_KEY in data && Date.now() < data[EXP_KEY]) {
      return data.item;
    }
    return null;
  } catch {
    return AsyncStorage.getItem(key);
  }
};

export default AsyncStorage;
