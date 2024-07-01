// TODO consertar update eventos on inscrição
import { View, Text, Pressable, FlatList, ScrollView } from 'react-native'
import { Image } from 'expo-image';
import React, { useEffect, useState } from 'react'
import { Link, router, useLocalSearchParams } from 'expo-router'
import { Events, Player } from '../../../interfaces/User'
import { Manager } from '../../../interfaces/User';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Ionicons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { useUserData } from '../../../contexts/AuthContext';
import { useUserEventData } from '../../../contexts/EventContext';
import { LinearGradient } from 'expo-linear-gradient';
import Api from '../../../services/Api';
import { getUserId } from '../../../services/StorageService';
import { getEventsByPlayerId } from '../../../services/PlayerService';
import { styles } from './HomeStyles';


export default function Home() {
  const { dataUser, collectData, Renderize, dataManager, handleClick } = useUserData();
  const [events, setEvents] = useState([]);
  const [playerEvents, setPlayerEvents] = useState([]);
  const [playerId, setPlayerId] = useState('');
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento


  //TODO dataUser nao tem player id?
  // Inicialize dataUser e playerId
  useEffect(() => {
    const initializeData = async () => {
      try {
        await collectData(); // Supondo que collectData inicializa dataUser
        const playerIdFromStorage = await AsyncStorage.getItem('userId');
        setPlayerId(playerIdFromStorage);
        setLoading(false); // Concluímos a inicialização
      } catch (error) {
        console.error("Erro ao inicializar os dados:", error); 
        setLoading(false); // Concluímos mesmo com erro
      }
    };

    initializeData();
  }, []); // Executa apenas uma vez no início

  // Use os dados quando estiverem prontos
  useEffect(() => {
    if (loading || !dataUser || !playerId) return; // Espera até que os dados estejam prontos

    console.log("user effect");

    const fetchData = async () => {
      try {
        if (dataUser.role === "ROLE_PLAYER") {
          console.log("Player ID obtido:", playerId);
          const events = await getEventsByPlayerId(playerId); // Chama a função para obter os eventos
          setPlayerEvents(events); // Atualiza o estado playerEvents com os eventos obtidos
          fetchEvents();
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, [dataUser, playerId, loading]); // Adiciona loading, dataUser e playerId como dependências

  // TODO stop doing this
  const fetchEvents = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log(token)
      const response = await Api.get(`api/events/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching player events:', error);
    }
  };



  const handlePress = (id: string) => {
    console.log(id)
    router.push({
      pathname: '/EventoX',
      params: { id },
    });
  };




  return (
    <View style={{ flex: 1, backgroundColor: '#2D3841' }}>
      <View style={{ maxWidth: '100%' }}>
        <Text style={styles.titleMyEvents}>Meus Eventos</Text>
      </View>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {dataManager && dataManager.role === "ROLE_MANAGER" && dataManager.events.length === 0 ? (
          <View style={styles.myevents1}>
            <Text style={styles.myEventsDescription}>Você ainda não criou nenhum evento!</Text>
            <Link href={"RegisterEvent"} asChild>
              <Pressable style={styles.buttonSearchEvents}>
                <Text style={styles.buttonMyEventText}>Criar evento</Text>
              </Pressable>
            </Link>
          </View>
        ) : null}

        {dataManager && dataManager.role === "ROLE_MANAGER" && dataManager.events.length >= 1 ? (
          <View style={styles.myeventsContainer}>
            <FlatList
              data={dataManager.events}
              style={{ maxHeight: '80%' }}
              renderItem={({ item }) => (
                <View style={styles.myevents}>
                  <Image style={styles.imageContainer} source={item.imagePath}></Image>
                  <View style={styles.titleContainer}>
                    <Text style={styles.titleEventName}>{item.name}</Text>
                    <View style={styles.infoCardsContainer}>
                      <View style={styles.cardPlayersNumber}>
                        <Ionicons name="people" size={28} color="#9747FF" />
                        <Text style={styles.titlePlayersNumber}>35</Text>
                      </View>
                      <View style={styles.cardEventDate}>
                        <Fontisto name="date" size={24} color="#4ECB71" />
                        <Text style={styles.titleEventDate}>02/05/24</Text>
                      </View>
                    </View>
                    <Pressable style={styles.buttonSeeEvent} onPress={() => handlePress(item.id)}>
                      <Text style={styles.buttonMyEventText1}>Visualizar evento</Text>
                    </Pressable>
                  </View>
                </View>
              )}
              keyExtractor={item => item.id}
              showsHorizontalScrollIndicator={false}
            />
            <View style={styles.buttonCreateContainer}>
              <Link href={"RegisterEvent"} asChild>
                <Pressable style={styles.buttonCreateEvents}>
                  <Text style={styles.buttonMyEventText}>Criar evento</Text>
                </Pressable>
              </Link>
            </View>
          </View>
        ) : null}

        {dataUser && dataUser.role === "ROLE_PLAYER" && dataUser.appliedEventsId.length === 0 ? (
          <View style={styles.noEventsContainer}>
            <Text style={styles.noEventsText}>Você ainda não está participando de nenhum evento. :(</Text>
            <Pressable style={styles.buttonContainer}>
              <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.findEventsButton}>
                <Text style={styles.findEventsButtonText}>Encontrar eventos</Text>
              </LinearGradient>
            </Pressable>
          </View>
        ) : null}

        {dataUser && dataUser.role === "ROLE_PLAYER" && dataUser.appliedEventsId.length >= 1 ? (
          <View style={{ width: '100%', paddingHorizontal: 20 }}>
            <Text style={styles.titleUpcomingEvents}>Eventos</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {dataUser && playerEvents.map(event => (
                <View key={event.id} style={styles.playerEventCard}>
                  <Image style={styles.playerEventImage} source={event.imagePath} />
                  <Text style={styles.playerEventName}>{event.name}</Text>
                  <Text style={styles.playerEventDate}>{event.date}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        ) : null}


        <View style={{ paddingHorizontal: 10 }}>
          <Text style={styles.titleUpcomingEvents}>Próximos Eventos</Text>
          <ScrollView style={{ maxHeight: 400 }}>
            {dataUser && events.map(event => (
              <View key={event.id} style={styles.upcomingEventCard}>
                <Image style={styles.upcomingEventImage} source={event.imagePath} />
                <Text style={styles.upcomingEventName}>{event.name}</Text>
                <Text style={styles.upcomingEventDate}>{event.date}</Text>
              </View>
            ))}
          </ScrollView>
        </View>


      </View>
    </View>
  );
}


