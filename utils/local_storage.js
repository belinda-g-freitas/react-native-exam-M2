import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeString = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    console.log('Stored')
  } catch (e) {
    // saving error
  }
};

export const storeObject = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    console.log('Stored')
  } catch (e) {
    // saving error
  }
};

export const removeFromDB = async (key) => {
  try {
    await AsyncStorage.removeItem(key)
    console.log('Removed')
  } catch (e) {
    // remove error
  }

}

export const getAllKeysFromDB = async () => {
  let keys = []
  try {
    keys = await AsyncStorage.getAllKeys();
    return keys;
  } catch (e) {
    // read key error
  }
}

export const getMultipleFromDB = async (keys) => {
  let values
  try {
    values = await AsyncStorage.multiGet(keys);
    return values;
  } catch (e) {
    // read error
  }
  console.log(values)

  // example console.log output:
  // [ ['@MyApp_user', 'myUserValue'], ['@MyApp_key', 'myKeyValue'] ]
}

// const multiSet = async () => {
//   const firstPair = ['@MyApp_user', 'value_1']
//   const secondPair = ['@MyApp_key', 'value_2']
//   try {
//     await AsyncStorage.multiSet([firstPair, secondPair])
//   } catch (e) {
//     //save error
//   }

//   console.log('Done.')
// }

export const removeFewFromDB = async (keys) => {
  try {
    await AsyncStorage.multiRemove(keys)
    console.log('Removed')
  } catch (e) {
    // remove error
  }
}

export const clearAllFromDB = async () => {
  try {
    await AsyncStorage.clear()
    console.log('Cleared')
  } catch (e) {
    // clear error
  }
}

export const getStringFromDB = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // value previously stored
    }
  } catch (e) {
    // error reading value
  }
};

export const getObjectFromDB = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};
