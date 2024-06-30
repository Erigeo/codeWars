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

export default function EventoX() {
  const { dataUser, collectData, Renderize } = useUserData();
  const { event, collectEventDataById } = useUserEventData();
  const [selectedButton, setSelectedButton] = useState(null);
  
  const handleButtonPress = (buttonIndex) => {
    setSelectedButton(buttonIndex);
  };

  const [isLoading, setIsLoading] = useState(true);


  const { id } = useLocalSearchParams();
  const [userRole, setUserRole] = useState('');
  const [isUserSubscribed, setIsUserSubscribed] = useState(false); // Estado para verificar se o usuário está inscrito

  async function fetchUserRole() {
    const role = await AsyncStorage.getItem('userRole');
    console.log("roleee: " + role)
    setUserRole(role);
  }

  async function checkUserSubscription() {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const userIsSubscribed = await checkUserIsSubscribedToEvent(userId);
      setIsUserSubscribed(userIsSubscribed);
    } catch (error) {
      console.error('Erro ao verificar inscrição do usuário:', error);
      setIsUserSubscribed(false); // Caso de erro, assume que não está inscrito
    }
  }

  // TODO check uso de async storage - role
  useEffect(() => {
    setIsLoading(true); // Inicia o modo de carregamento ao carregar os dados do evento
try {
    if (id) {
      collectEventDataById(id as string);
      console.log("aaaa");
    }
    fetchUserRole();
    checkUserSubscription();
  }
  catch (error) {
    console.error('Erro ao carregar dados do evento:', error);
  } finally {
    setIsLoading(false); // Finaliza o modo de carregamento após a conclusão (com sucesso ou erro)
  }

  }, [id]); // executa apenas quando id mudar

  // TODO deixar bonito 
  const handleInscricao = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const token = await AsyncStorage.getItem('token'); // Obter token JWT do AsyncStorage
      const response = await Api.put(`api/players/${userId}/events/add`, id, {
        headers: {
          'Content-Type': 'text/plain', // Define o tipo de conteúdo como texto simples
          'Authorization': `Bearer ${token}`, // Incluir token JWT no cabeçalho Authorization
        },
      });
      if (response.status === 200) {
        // Atualizar estado para refletir que o usuário está inscrito
        setIsUserSubscribed(true);
        Alert.alert('Inscrição realizada com sucesso!');
      } else {
        Alert.alert('Erro ao se inscrever no evento.');
      }
    } catch (error) {
      console.error('Erro ao se inscrever no evento:', error);
      console.log(error.response.data);
      Alert.alert('Erro ao se inscrever no evento.');
    }
  };

  // Função para verificar se o usuário está inscrito no evento
  async function checkUserIsSubscribedToEvent(userId) {
    try {
      const token = await AsyncStorage.getItem('token');
      const playerIsInEvent = event.playerIds.includes(userId);

      return playerIsInEvent !== undefined; // Retorna true se o evento estiver na lista, caso contrário false
    } catch (error) {
      console.error('Erro ao verificar inscrição do usuário:', error);
      return false; // Em caso de erro, retorna false
    }
  }

  if(isLoading){
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

          <Pressable
            style={[styles.buttonSeeEvent, isUserSubscribed && styles.disabledButton]}
            onPress={() => {
              if (userRole === 'ROLE_MANAGER') {
                // Lógica para gerentes
                console.log('Lógica para gerentes');
              } else if (!isUserSubscribed) {
                // Lógica para usuários normais (ROLE_PLAYER) apenas se não estiver inscrito
                handleInscricao();
              }
            }}
            disabled={isLoading} // Desabilita o botão enquanto estiver carregando
            >
            <Text style={styles.buttonMyEventText1}>
            {isLoading ? 'Carregando...' : userRole === 'ROLE_MANAGER' ? 'Iniciar Evento' : isUserSubscribed ? 'Inscrito' : 'Inscrever-se'}
            </Text>
          </Pressable>

        </View>

      </View>

      <View style={styles.navbarcontainer} >

        <Pressable style={styles.navbarButtons} onPress={() => handleButtonPress(1)}>
          <Text style={[selectedButton === 1 && styles.selectedText]}>Detalhes</Text>
        </Pressable>
        <Pressable style={styles.navbarButtons} onPress={() => handleButtonPress(2)}>
          <Text style={[selectedButton === 2 && styles.selectedText]}>Torneio</Text>
        </Pressable>
        <Pressable style={styles.navbarButtons} onPress={() => handleButtonPress(3)}>
          <Text style={[selectedButton === 3 && styles.selectedText]}>Rodada</Text>
        </Pressable>
        <Pressable style={styles.navbarButtons} onPress={() => handleButtonPress(4)}>
          <Text style={[selectedButton === 4 && styles.selectedText]}>Grade</Text>
        </Pressable>
      </View>

      {selectedButton == 1 ? (
        <View>
          <View style={styles.textdetailscontainer}>
            <Text style={styles.TextTitleDetalhes}>Detalhes</Text>
            {userRole === 'ROLE_MANAGER' && (
              <Feather name="edit" size={20} color="gray" />
            )}
          </View>
          <Text style={styles.TextDetails}> {event.description}</Text>
          <View style={styles.textdetailscontainer}>
            <Text style={styles.TextTitleDetalhes}>Cronograma</Text>
            {userRole === 'ROLE_MANAGER' && (
              <Feather name="edit" size={20} color="gray" />
            )}
          </View>
          <Text style={styles.TextDetails}> {event.description}</Text>
          <View style={styles.textdetailscontainer}>
            <Text style={styles.TextTitleDetalhes}>Premiação</Text>
            {userRole === 'ROLE_MANAGER' && (
              <Feather name="edit" size={20} color="gray" />
            )}
          </View>
          <Text style={styles.TextDetails}> {event.description}</Text>
        </View>
      ) : null}

      {selectedButton == 2 ? (
        <View>
          <View style={styles.textTitleContainer}>
            <Text style={styles.TextTitleTorneio}>Torneio </Text>
          </View>
        </View>
      ) : null}

      {selectedButton == 3 ? (
        <View>
          <Text style={styles.TextTitleDetalhes}>Rodada</Text>
        </View>
      ) : null}

      {selectedButton == 4 ? (
        <View>
          <Text style={styles.TextTitleDetalhes}>Grade</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  matchsContainer: {

  }
  ,
  textTitleContainer: {
    alignItems: 'center'
  },

  TextTitleTorneio: {
    color: 'white',
    fontSize: 24,
    margin: 20,
  }
  ,
  textdetailscontainer: {
    alignItems: 'center',
    flexDirection: 'row',
    width: 200,
    justifyContent: 'space-between'
  },
  TextDetails: {
    color: 'white',
    fontSize: 12,
    marginHorizontal: 30
  },
  TextTitleDetalhes: {
    color: 'white',
    fontSize: 24,
    margin: 20
  }
  ,
  selectedText: {
    color: 'white'
  },
  navbarButtons: {
    backgroundColor: '#3D5D75',
    borderRightColor: 'black',
    borderRightWidth: 0.2,
    flexDirection: 'row',
    alignItems: 'center',
    width: '25%',
    justifyContent: 'center'

  }
  ,
  navbarcontainer: {
    flexDirection: 'row',
    width: '100%',
    height: 35,

    justifyContent: 'space-between',

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
  buttonSeeEvent: {
    flex: 1,
    backgroundColor: '#364753',
    width: '80%',
    flexDirection: 'row',
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    borderColor: 'green',
    borderWidth: 2
  },


  buttonMyEventText1: {
    color: '#FFFFFF',
    fontSize: 20
  },

  disabledButton: {
    opacity: 0.6,
  },

})
