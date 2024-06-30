import { View, StyleSheet, Text, Pressable, FlatList, Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React, { useEffect, useState } from 'react'
import { useUserData } from "../../contexts/AuthContext";
import { useLocalSearchParams } from 'expo-router';
import { useUserEventData } from "../../contexts/EventContext";
import { Feather } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Api from "../../services/Api";
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

  //const [isLoading, setIsLoading] = useState(true);


  const { id } = useLocalSearchParams();
 // const [userRole, setUserRole] = useState('');
 // const [isUserSubscribed, setIsUserSubscribed] = useState(false); // Estado para verificar se o usuário está inscrito

  const { isLoading, userRole, isUserSubscribed, handleInscricao } = useEventData(event);


  /*async function fetchUserRole() {
    const role = await AsyncStorage.getItem('userRole');
    console.log("roleee: " + role)
    setUserRole(role);
  }*/

  /*async function checkUserSubscription() {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const userIsSubscribed = await checkUserIsSubscribedToEvent(userId);
      setIsUserSubscribed(userIsSubscribed);
    } catch (error) {
      console.error('Erro ao verificar inscrição do usuário:', error);
      setIsUserSubscribed(false); // Caso de erro, assume que não está inscrito
    }
  }*/

  // TODO check uso de async storage - role
  useEffect(() => {
    console.log("evento" + event.id)
    //setIsLoading(true); // Inicia o modo de carregamento ao carregar os dados do evento
    try {
      if (id) {
        collectEventDataById(id as string);
      }
      //fetchUserRole();
      //checkUserSubscription();
      //useEventData(event, id);
    }
    catch (error) {
      console.error('Erro ao carregar dados do evento:', error);
    } finally {
      //setIsLoading(false); // Finaliza o modo de carregamento após a conclusão (com sucesso ou erro)
    }

  }, [id]); // executa apenas quando id mudar

  // TODO deixar bonito 

  // Função para verificar se o usuário está inscrito no evento
 /* async function checkUserIsSubscribedToEvent(userId) {
    try {
      const token = await AsyncStorage.getItem('token');
      const playerIsInEvent = event.playerIds.includes(userId);

      return playerIsInEvent !== undefined; // Retorna true se o evento estiver na lista, caso contrário false
    } catch (error) {
      console.error('Erro ao verificar inscrição do usuário:', error);
      return false; // Em caso de erro, retorna false
    }
  }*/

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
  buttonSearchEvents: {
    backgroundColor: 'green',
    width: '80%',
    padding: 20,
    margin: 20,
    alignItems: 'center',
    borderRadius: 15
  },
  titleMyEvents: {
    marginTop: 20,
    color: '#FFFFFF',
    fontSize: 24,

  },
  myEventsDescription: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 10
  },
  buttonMyEventText: {
    color: '#FFFFFF',
    fontSize: 20
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
