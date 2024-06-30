import { View, StyleSheet, Text, Pressable, FlatList, Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React, { useEffect, useState } from 'react'
import { useUserData } from "../../contexts/AuthContext";
import { useLocalSearchParams } from 'expo-router';
import { useUserEventData } from "../../contexts/EventContext";
import SubscribeButton from '../../components/SubscribeButton';
import EventDetails from '../../components/EventDetails';
import { useEventData } from '../../hooks/useEventData';



export default function EventoX() {
  const { dataUser, collectData, Renderize } = useUserData();
  const { event, collectEventDataById } = useUserEventData();
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonPress = (buttonIndex) => {
    setSelectedButton(buttonIndex);
  };

  const { id } = useLocalSearchParams();
  const { isLoading, userRole, isUserSubscribed, handleInscricao } = useEventData(event);


  // TODO check modularização
  useEffect(() => {
    console.log("evento" + event.id)
    try {
      if (id) {
        collectEventDataById(id as string);
      }
    }
    catch (error) {
      console.error('Erro ao carregar dados do evento:', error);
    } finally {
      //setIsLoading(false); // TODO aqui ou em useEventData?
    }

  }, [id]); // executa apenas quando id mudar

  // TODO aqui mesmo?
  if (isLoading) {
    return null
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.myevents}>
        <Image style={styles.imageContainer} source={event.imagePath}></Image>

        <View style={styles.titleContainer}>
          <Text style={styles.titleEventName}>{event.name}</Text>

          <View style={styles.infoCardsContainer}>
            <View style={styles.cardPlayersNumber}>
              <Ionicons name="people" size={28} color="#9747FF" />
              <Text style={styles.titlePlayersNumber}> 35</Text>
            </View>
            <View style={styles.cardEventDate}>
              <Fontisto name="date" size={24} color="#4ECB71" />
              <Text style={styles.titleEventDate}> 02/05/24</Text>
            </View>
          </View>

          <SubscribeButton
            userRole={userRole}
            isUserSubscribed={isUserSubscribed}
            isLoading={isLoading}
            handleInscricao={handleInscricao}
          />

        </View>

      </View>

      <EventDetails selectedButton={selectedButton}
        handleButtonPress={handleButtonPress}
        userRole={userRole}
        event={event} />
    </View>
  );
}

const styles = StyleSheet.create({
  matchsContainer: {

  }
  ,
  mainContainer: {
    backgroundColor: '#364753',
    flex: 1,
  },
  myevents: {
    flexDirection: 'row',
    borderRadius: 15,
    backgroundColor: '#364753',
    width: 400,
    height: 150,
    marginBottom: 10,

  },
  imageContainer: {
    padding: 70,
  },
  titleContainer: {
    flex: 1,
    marginRight: 20,
    marginLeft: 10,
    marginTop: 10,
    alignItems: 'center'
  },
  titleEventName: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  infoCardsContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: -25
  },
  cardPlayersNumber: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    width: 5,
    height: 30,
    gap: 5
  },
  titlePlayersNumber: {
    color: '#9747FF',
    fontWeight: 'bold'
  },
  cardEventDate: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: 5,
    height: 30,
    gap: 5
  },
  titleEventDate: {
    color: '#4ECB71',
    fontWeight: 'bold'
  },

})
