import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from "./Api"

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

