import EncryptedStorage from 'react-native-encrypted-storage';

const setEncryptStorage = async <T>(key: string, value: T) => {
  await EncryptedStorage.setItem(key, JSON.stringify(value));
};

const getEncryptStorage = async <T>(key: string) => {
  const storedData = await EncryptedStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : null;
};

const removeEncryptStorage = async (key: string) => {
  const data = await EncryptedStorage.getItem(key);
  if (data) {
    await EncryptedStorage.removeItem(key);
  }
};

export {setEncryptStorage, getEncryptStorage, removeEncryptStorage};
