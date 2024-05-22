import { View, Text } from 'react-native'
import React from 'react'
import { Button, ScrollView, StyleSheet } from 'react-native';
import { Link } from 'expo-router'

interface EventProps {
  title: string;
  date: string;
  status: string;
}

const Event: React.FC<EventProps> = ({ title, date, status }) => {
  return (
    <View style={styles.event}>
      <Text style={styles.eventTitle}>{title}</Text>
      <Text style={styles.eventDate}>{date}</Text>
      <Button title={status} onPress={() => {}} color="#ff4500" />
    </View>
  );
};

export default function Eventos() {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Meus eventos</Text>
      <View style={styles.eventBox}>
        <Text style={styles.noEventText}>Você ainda não está participando de nenhum evento. :(</Text>
        <Button title="Encontrar eventos" onPress={() => {}} color="#ff4500"/>
      </View>
      <Text style={styles.sectionTitle}>Próximos eventos</Text>
      <ScrollView style={styles.eventsList}>
        {/* Map your events data to these Event components */}
        <Event title="Neon Dynasty Championship" date="22/11/2023" status="Participar" />
        <Event title="Championship ONE PIECE 2022" date="05/04/2023" status="Em progresso" />
        <Event title="Championship 2024 ONE PIECE" date="23/11/2024" status="Em progresso" />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: 'white',
    },
    banner: {
      width: '100%',
      height: 200,
      resizeMode: 'cover'
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 20,
      marginLeft: 10,
    },
    eventBox: {
      alignItems: 'center',
      marginVertical: 20,
    },
    noEventText: {
      fontSize: 16,
      color: 'grey',
      marginBottom: 10,
    },
    eventsList: {
      paddingHorizontal: 10,
    },
    event: {
      backgroundColor: '#f0f0f0',
      padding: 10,
      marginBottom: 10,
      borderRadius: 5,
    },
    eventTitle: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    eventDate: {
      fontSize: 14,
      color: 'grey',
    }
<<<<<<< HEAD
  });
=======
  });
>>>>>>> 9e89e82 (adicionei ContextApi para tornar dados globais, dessa forma conseguimos renderizar componentes ao por exemplo criar um evento. Dessa forma, todos os componentes que existirem relacionados a exibição desses eventos irão ser atualizados.)
