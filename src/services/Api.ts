import axios from "axios";
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getBaseURL = () => {
  if (Platform.OS === 'android' || Platform.OS === 'ios') {
    return 'http://192.168.1.133:8080/cardwars/'; // Use your notebook's local IP address
  } else {
    return 'http://localhost:8080/cardwars/'; // Default to localhost for other platforms
  }
};

const Api = axios.create({
  baseURL: getBaseURL()
});

export const getFullImageUrl = (imagePath) => {
  return `${Api.defaults.baseURL}${imagePath}`;
};

export const getAuthToken = async () => {
  const token = await AsyncStorage.getItem('token');
  console.log('Auth Token:', token); // Debug log to check token
  return token;
};

export default Api;
