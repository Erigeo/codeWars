import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Image, Alert, StyleSheet, Dimensions } from 'react-native';
import { registerDeck, fetchDeckImages, deleteDeck } from '../../../services/DeckServices';
import { getUserData } from '../../../services/PlayerService';
import { useUserData } from '../../../contexts/AuthContext';
import { getFullImageUrl } from '../../../services/Api'; // Ensure the correct path

export default function Decks() {
  const { dataUser } = useUserData();
  const [deckName, setDeckName] = useState('');
  const [deckList, setDeckList] = useState('');
  const [deckImages, setDeckImages] = useState([]); // State to store fetched image URLs
  const [deckId, setDeckId] = useState('');

  const userId = dataUser ? dataUser.id : '';

  const fetchUserDeckId = async () => {
    try {
      const userData = await getUserData(userId);
      if (userData) {
        const userDeckId = userData.deckId;
        console.log('User Deck ID:', userDeckId); // Log the user's deck ID
        if (userDeckId) {
          setDeckId(userDeckId);
          handleFetchDeckImages(userDeckId);
        }
      }
    } catch (error) {
      console.error("Error fetching user's deck ID:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserDeckId();
    }
  }, [userId]);

  // Fetch images from backend and set state
  const handleFetchDeckImages = async (deckId) => {
    if (!deckId) {
      setDeckImages([]);
      return;
    }

    try {
      const response = await fetchDeckImages(deckId);
      if (response && response.status === 200) {
        const fullUrls = response.data.map((imagePath) => {
          const fullUrl = getFullImageUrl(imagePath);
          console.log('Full Image URL:', fullUrl); // Log the full image URL
          return fullUrl;
        });
        setDeckImages(fullUrls); // Set fetched image URLs to state
        console.log('Fetched Deck Images:', fullUrls); // Log the fetched deck images
      } else {
        setDeckImages([]);
        Alert.alert('Error', 'No images found for the provided deck.');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  // Register a new deck
  const handleRegisterDeck = async () => {
    if (!deckName || !deckList) {
      Alert.alert('Error', 'Please enter both deck name and deck list.');
      return;
    }

    try {
      const response = await registerDeck(userId, deckName, deckList);
      if (response && response.status === 201) {
        Alert.alert('Success', 'Deck registered successfully!');
        setDeckName(''); // Clear deckName
        setDeckList(''); // Clear deckList
        fetchUserDeckId(); // Refresh component
      } else {
        Alert.alert('Error', response ? response.data : 'An error occurred while registering the deck.');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  // Delete the current deck
  const handleDeleteDeck = async () => {
    try {
      const response = await deleteDeck(userId);
      if (response && response.status === 200) {
        Alert.alert('Success', 'Deck deleted successfully!');
        setDeckImages([]);
        setDeckId('');
      } else {
        Alert.alert('Error', response ? response.data : 'An error occurred while deleting the deck.');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const renderItem = ({ item }) => {
    console.log('Rendering item:', item); // Debug log for item rendering
    return (
      <View style={styles.cardContainer}>
        {item && typeof item === 'string' ? (
          <Image
            source={{ uri: item }}
            style={styles.cardImage}
            onError={(error) => console.log('Image load error:', error)}
          />
        ) : (
          <Text>Invalid Image</Text>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Your Deck</Text>
      <TextInput
        style={styles.input}
        placeholder="Deck Name"
        value={deckName}
        onChangeText={setDeckName}
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Deck List (comma separated card codes)"
        value={deckList}
        onChangeText={setDeckList}
        multiline
        numberOfLines={4}
      />
      {deckId ? (
        <Button  title="Delete Deck" onPress={handleDeleteDeck} />
      ) : (
        <Button  title="Register Deck" onPress={handleRegisterDeck} />
      )}

      <Text style={styles.title}>Current Deck</Text>
      {deckId && deckImages.length > 0 ? (
        <FlatList
          data={deckImages} // Uses the state that contains the image URLs
          keyExtractor={(item, index) => index.toString()}
          numColumns={5} // Defines the number of columns for the grid
          renderItem={renderItem}
        />
      ) : (
        <Text>No images available</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
   backgroundColor: '#2D3841'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff'
  },
  input: {
    height: 40,
    borderColor: '#DAE2E9',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  textArea: {
    height: 80, // Adjust the height as needed
    textAlignVertical: 'top', // Align text to the top
  },
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    margin: 5,
  },
  cardImage: {
    width: Dimensions.get('window').width / 5 - 10,
    height: Dimensions.get('window').width / 5 * 1.5 - 10,
    resizeMode: 'contain',
    margin: 5,
  },
  buttonPad: {
    backgroundColor: 'white',
    width: '60%',
    height: 30
  }
});
