import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    headerImage: {
      width: '100%',
      height: 200, // Set this to the correct aspect ratio of your image
      resizeMode: 'cover',
    },
    profileContainer: {
      alignItems: 'center',
      marginTop: -50, // Adjust based on the size of the avatar image
    },
    username: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    summonerTag: {
      color: 'gray',
    },
    editButton: {
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
    },
    editButtonText: {
      color: '#fff',
    },
    sectionContainer: {
      padding: 20,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    sectionContent: {
      fontSize: 14,
      color: 'gray',
    },
    gamesContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    stats: {
      fontSize: 16,
      marginVertical: 5,
    },
    matchHistory: {
      fontSize: 14,
      marginVertical: 2,
    },
    // Add additional styling for games icons and footer navigation as needed
  });