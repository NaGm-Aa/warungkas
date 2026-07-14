import AsyncStorage from '@react-native-async-storage/async-storage';

const DB_KEY = 'WARUNGKAS_DB_V2';

const getDatabase = async () => {
  const data = await AsyncStorage.getItem(DB_KEY);
  return data ? JSON.parse(data) : {};
};

export const getShopList = async () => {
  const db = await getDatabase();
  return Object.keys(db);
};

export const createShop = async (name) => {
  const db = await getDatabase();
  if (!db[name]) {
    db[name] = { prices: [], history: [] };
    await AsyncStorage.setItem(DB_KEY, JSON.stringify(db));
  }
};

export const getPrices = async (shopName) => {
  const db = await getDatabase();
  return db[shopName]?.prices || [];
};

export const savePrices = async (shopName, prices) => {
  const db = await getDatabase();
  if (db[shopName]) {
    db[shopName].prices = prices;
    await AsyncStorage.setItem(DB_KEY, JSON.stringify(db));
  }
};

export const saveTransaction = async (shopName, total, received, change, itemsCount) => {
  const db = await getDatabase();
  if (db[shopName]) {
    const newTx = { id: Date.now().toString(), date: new Date().toISOString(), total, received, change, itemsCount };
    db[shopName].history.unshift(newTx);
    await AsyncStorage.setItem(DB_KEY, JSON.stringify(db));
  }
};

export const getHistory = async (shopName) => {
  const db = await getDatabase();
  return db[shopName]?.history || [];
};
export const deleteShop = async (name) => {
  const db = await getDatabase();
  delete db[name];
  await AsyncStorage.setItem(DB_KEY, JSON.stringify(db));
};