import React from 'react';
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './ProfileStyles'; // Importando os estilos

export default function Profile() {
  return (
    <ScrollView style={styles.container}>

      
      <View style={styles.profileContainer}>
        <Ionicons name="person-circle" size={100} color="black" />
        <Text style={styles.username}>Herbert J. (Xx4DrKN35SxX)</Text>
        <Text style={styles.summonerTag}>SummonerTag</Text>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Editar perfil</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Sobre</Text>
        <Text style={styles.sectionContent}>Lorem ipsum dolor sit amet...</Text>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Jogos preferidos</Text>
        <View style={styles.gamesContainer}>
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Estatísticas</Text>
        <Text style={styles.stats}>Maior taxa de vitória com um deck: 80%</Text>
        <Text style={styles.stats}>Taxa de vitória geral: 67%</Text>
        <Text style={styles.stats}>Rodadas jogadas: 49</Text>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Histórico de embates</Text>
        <Text style={styles.matchHistory}>Neon Dynasty Championship - Herbert J. x Krabby T. (VITÓRIA)</Text>
        {/* More match history items */}
      </View>

      {/* Footer navigation would go here */}
    </ScrollView>
  );
};