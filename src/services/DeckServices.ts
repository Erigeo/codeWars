import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { Platform } from 'react-native';

const getBaseURL = () => {
  if (Platform.OS === 'android' || Platform.OS === 'ios') {
    return 'http://192.168.0.58:8080/cardwars/'; // Use your notebook's local IP address
  } else {
    return 'http://localhost:8080/cardwars/'; // Default to localhost for other platforms
  }
};

const Api = axios.create({
  baseURL: getBaseURL()
});

export const registerDeck = async (userId, deckName, deckList) => {
  const token = await getAuthToken();
  return Api.post(`/api/players/${userId}/registerDeck?deckName=${encodeURIComponent(deckName)}&deckList=${encodeURIComponent(deckList)}`, null, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const fetchDeckImages = async (deckId) => {
  const token = await getAuthToken();
  return Api.get(`/decks/${deckId}/images`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const deleteDeck = async (userId) => {
  const token = await getAuthToken();
  return Api.delete(`/api/players/${userId}/deleteDeck`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

// Function to get auth token
const getAuthToken = async () => {
  const token = await AsyncStorage.getItem('token');
  return token;
};

export default Api;

