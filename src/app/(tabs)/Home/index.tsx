// TODO consertar update eventos on inscrição
import { View, Text, Pressable, FlatList, ScrollView, Dimensions } from 'react-native'
import { Image } from 'expo-image';
import React, { useEffect, useRef, useState } from 'react'
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

const { width: screenWidth } = Dimensions.get('window');


export default function Home() {
  const { dataUser, collectData, Renderize, dataManager, handleClick } = useUserData();
  const [events, setEvents] = useState([]);
  const [playerEvents, setPlayerEvents] = useState([]);
  const [playerId, setPlayerId] = useState('');
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null); // Referência para timeout do scroll automático

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
      console.error('Error fetching events:', error);
    }
  };



  const handlePress = (id: string) => { 
    console.log(id)
    router.push({
      pathname: '/EventoX',
      params: { id },
    });
  };

  const handlePressFindEvents = () => {
    router.push({
      pathname: '/Eventos',
    });
  };

  // TODO está usando eventos do player e não os promovidos
  // Efeito para avançar automaticamente o carrossel a cada 2 segundos
  useEffect(() => {
    const handleAutomaticScroll = () => {
      const newIndex = (activeIndex + 1) % playerEvents.length;
      scrollViewRef.current?.scrollTo({
        animated: true,
        x: screenWidth * newIndex,
      });
      setActiveIndex(newIndex);
    };

    // Define o intervalo para o scroll automático
    const startAutomaticScroll = () => {
      scrollTimeout.current = setInterval(handleAutomaticScroll, 3000); // 1500 milissegundos = 1.5 segundos
    };

    // Inicia o scroll automático apenas se houver eventos do jogador
    if (playerEvents.length > 0) {
      startAutomaticScroll();
    }

    // Limpa o intervalo ao desmontar o componente
    return () => {
      if (scrollTimeout.current) {
        clearInterval(scrollTimeout.current);
      }
    };
  }, [activeIndex, playerEvents]); // Dependências incluem activeIndex e playerEvents


  // Função para lidar com o scroll manual
  const handleManualScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / screenWidth);
    setActiveIndex(newIndex);
  };


  return (
    <View style={{ flex: 1, backgroundColor: '#2D3841' }}>
      {/* Carrossel de Imagens */}
      <View style={{ maxWidth: '100%', marginBottom: 10 }}>
        {playerEvents.length > 0 ? (
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handleManualScroll}
          >
            {playerEvents.map((event, index) => (
              <Pressable key={index} style={{ width: screenWidth }} onPress={() => handlePress(event.id)}>
                <View style={{ position: 'relative' }}>
                  <Image
                    style={styles.carouselImage}
                    source={event.imagePath}
                  />
                  {/* Indicador dentro da imagem */}
                  <View style={styles.imageIndicatorContainer}>
                    {playerEvents.map((_, i) => (
                      <View
                        key={i}
                        style={[
                          styles.indicator,
                          { backgroundColor: activeIndex === i ? 'green' : 'grey' },
                        ]}
                      />
                    ))}
                  </View>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        ) : (
          <Text style={styles.noEventsText}>Nenhum evento disponível</Text>
        )}
      </View>
    
      <View style={{ flex: 1, alignItems: 'center' }}>
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
            <Pressable style={styles.buttonContainer} onPress={() => handlePressFindEvents()}>
              <LinearGradient colors={['#58C263', '#E45858']} style={styles.findEventsButton} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }}>
                <Text style={styles.findEventsButtonText}>Encontrar eventos</Text>
              </LinearGradient>
            </Pressable>
          </View>
        ) : null}

        {dataUser && dataUser.role === "ROLE_PLAYER" && dataUser.appliedEventsId.length >= 1 ? (
          <View style={{ width: '100%', paddingHorizontal: 20 }}>
            <Text style={styles.titleUpcomingEvents}>Meus eventos</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {playerEvents.map(event => (
                <Pressable
                  key={event.id}
                  style={styles.playerEventCard}
                  onPress={() => handlePress(event.id)}
                >
                  <Image style={styles.playerEventImage} source={event.imagePath} />
                  <Text style={styles.playerEventName}>{event.name}</Text>
                  <Text style={styles.playerEventDate}>{event.date}</Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        ) : null}

        <View >
          <Text style={styles.titleUpcomingEvents}>Próximos eventos</Text>
          <View style={styles.myeventsContainer}>
            <FlatList
              data={events}
              style={{ maxHeight: '80%' }}
              renderItem={({ item }) => (
                <View style={styles.myevents}>
                  <Image style={styles.imageContainer} source={item.imagePath}></Image>
                  <View style={styles.titleContainer}>
                    <Text style={styles.titleEventName}>{item.name}</Text>
                    <View style={styles.infoCardsContainer}>
                      <View style={styles.cardPlayersNumber}>
                        <Ionicons name="people" size={28} color="#9747FF" />
                        <Text style={styles.titlePlayersNumber}>{item.numberOfParticipants}</Text>
                      </View>
                      <View style={styles.cardEventDate}>
                        <Fontisto name="date" size={24} color="#4ECB71" />
                        <Text style={styles.titleEventDate}>{item.date}</Text>
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
          </View>
        </View>

      </View>
    </View>
  );
}


