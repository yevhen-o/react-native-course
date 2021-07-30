import AsyncStorage from '@react-native-async-storage/async-storage';

const ROOT_STORAGE_KEY = 'rn-first-app';
let storage = {};

async function getStorage() {
  try {
    const storageString = await AsyncStorage.getItem(ROOT_STORAGE_KEY);
    storage = JSON.parse(storageString) || {};
  } catch (e) {
    storage = {};
  }
}

getStorage();

function storageSave() {
  AsyncStorage.setItem(ROOT_STORAGE_KEY, JSON.stringify(storage));
}

export function storageRemoveItem(key) {
  const value = storage[key];
  delete storage[key];
  storageSave();
  return value;
}

export async function storageGetLatest(key, def = {}) {
  try {
    const storeString = await AsyncStorage.getItem(ROOT_STORAGE_KEY);
    const storage = JSON.parse(storeString) || {};
    return key in storage ? storage[key] : def;
  } catch (e) {
    return def;
  }
}

export function storageGet(key, def) {
  return key in storage ? storage[key] : def;
}

export function storageSet(key, value) {
  const oldValue = storage[key];

  storage[key] = value;

  storageSave();

  return oldValue;
}

export function storageGetKey(prefix, resourceId) {
  return `--${prefix}${resourceId ? `--${resourceId}` : ''}`;
}

export const storageKeys = {
  userLoginState: storageGetKey('userLoginState'),
};

export default {
  storageGet,
  storageSet,
  storageKeys,
  storageGetKey,
  storageGetLatest,
  storageRemoveItem,
};
