import AsyncStorage from "@react-native-async-storage/async-storage";

export const getToken = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await AsyncStorage.getItem("token");
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
