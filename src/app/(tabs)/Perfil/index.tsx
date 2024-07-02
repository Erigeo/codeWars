import React, { useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useUserData } from '../../../contexts/AuthContext';
import { StyleSheet } from 'react-native';

export default function Perfil() {
  const { dataUser, dataManager, collectData, Renderize, handleClick } = useUserData();

  useEffect(() => {
    // Fetch user data when component mounts
    collectData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Ionicons name="person-circle" size={100} color="black" />
        {dataUser ? (
          <>
            <Text style={styles.username}>{dataUser.name} ({dataUser.username})</Text>
          </>
        ) : dataManager ? (
          <>
            <Text style={styles.username}>{dataManager.name} ({dataManager.username})</Text>
          </>
        ) : (
          <Text style={styles.username}>Loading...</Text>
        )}
        <TouchableOpacity style={styles.editButton} onPress={handleClick}>
          <Text style={styles.editButtonText}>Editar perfil</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Sobre</Text>
        <Text style={styles.sectionContent}>Lorem ipsum dolor sit amet...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
   
  },
  headerImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  profileContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#2e2e2e',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#fff',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  summonerTag: {
    color: 'gray',
    fontSize: 16,
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: '#5a5a5a',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  sectionContainer: {
    padding: 20,
    backgroundColor: '#1e1e1e',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
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
  gameIcon: {
    width: 50,
    height: 50,
    margin: 5,
  },
  stats: {
    fontSize: 16,
    color: '#fff',
    marginVertical: 5,
  },
  matchHistory: {
    fontSize: 14,
    color: '#fff',
    marginVertical: 2,
  },
  footerNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#2e2e2e',
    paddingVertical: 10,
  },
  footerNavItem: {
    alignItems: 'center',
  },
  footerNavIcon: {
    color: '#fff',
  },
  footerNavText: {
    color: '#fff',
    fontSize: 12,
  },
});
