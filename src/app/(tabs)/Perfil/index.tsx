import React, { useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../ProfileStyles'; // Import your styles
import { useUserData } from '../../../contexts/AuthContext';

export default function Perfil() {
  const { dataUser, dataManager, collectData, Renderize, handleClick } = useUserData();

  useEffect(() => {
    // Fetch user data when component mounts
    collectData();
  }, []);

  return (
    <ScrollView style={styles.container}>
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
    </ScrollView>
  );
}