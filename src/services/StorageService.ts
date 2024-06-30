import AsyncStorage from '@react-native-async-storage/async-storage';

export async function fetchUserRole() {
  return await AsyncStorage.getItem('userRole');
}

export async function getUserId() {
  return await AsyncStorage.getItem('userId');
}

export async function getToken() {
  return await AsyncStorage.getItem('token');
}

