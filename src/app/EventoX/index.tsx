import { View, StyleSheet, Text, Pressable, FlatList, TouchableOpacity, Alert} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React, { useEffect, useState } from 'react'
import { useUserData } from "../../contexts/AuthContext";
import { useLocalSearchParams } from 'expo-router';
import { useUserEventData } from "../../contexts/EventContext";
import SubscribeButton from '../../components/SubscribeButton';
import { useEventData } from '../../hooks/useEventData';
import styles from './EventoXStyles';
import { Feather } from '@expo/vector-icons';
import { finalizeRound, savePairings, startEvent } from '../../services/ManagerService';

// TODO visao de usuario: tirar os icones + tudo que não pertença a ele - FEITO?
// TODO ver isso aí da grade
// TODO update uando renderizar corretament
// TODO iniciado = finalizado qnd for finalizado
// TODO qnd abrir os evntos ja abrir em detalhes 
// TODO nome dos players maiores
// TODO evento finaliazdo = mudar cor (esta preto)
export default function EventoX() {
  const { dataUser, collectData, Renderize} = useUserData();
  const {
    event,
    collectEventDataById,
    eventPlayers,
    collectPlayersDataByEventId,
    handleClick,
    availablePairings,
    getAvailablePairings,
    playerDetails,
    fetchPlayerDetails, 
    eventoFinalizado,
    finalizarEvent
  } = useUserEventData();
  const [selectedButton, setSelectedButton] = useState(null);
  const { id, role } = useLocalSearchParams();
  const [pairings, setPairings] = useState([]);
  const { userRole, isUserSubscribed, handleInscricao, isEventoFull } = useEventData(event);
  const [isLoading, setIsLoading] = useState(true);
  

  const handleButtonPress = (buttonIndex) => {
    setSelectedButton(buttonIndex);
  };

  const handlePressUser = (index, player) => {
    setPairings((prev) => {
     
      if (index < 0 || index >= prev.length) {
        return prev; 
      }
  
      
      const newPairings = [...prev];
  
      
      if (newPairings[index]) {
        newPairings[index].result = player;
      } else {
        
        console.error(`Index ${index} is out of bounds or item is undefined.`);
      }
  
      return newPairings;
    });
  };

  async function finishRound(){
    try{
      const resultado = await savePairings(pairings, id as string)
      
      if (resultado) {
        console.log('salvo no sistema resultado do round')
      }
    }catch(e){
      console.log(e)
    }finally{
      //setPairings([]);
    }
  }  

// TODO check modularização
 /* useEffect(() => {
    console.log("evento" + event.id)
    console.log("evento no" + event.numberOfParticipants)
    if (id) {
      collectEventDataById(id as string)
        .then(() => setIsLoading(false)) // Evento carregado
        .catch((error) => {
          console.error('Erro ao carregar dados do evento:', error);
          setIsLoading(false);
        });
    }

  }, [id, Renderize]); // executa apenas quando id mudar */

  useEffect(() => {
    if (id) {
      setIsLoading(false);
      collectEventDataById(id as string);
      collectPlayersDataByEventId(event);
      if(event.hasStarted && event.finished==false){
        getAvailablePairings(event);
        console.log(eventoFinalizado)
      if(eventoFinalizado == false){
      setPairings(playerDetails.map(detail => ({
        playerOneId: detail.playerOneId,
        playerTwoId: detail.playerTwoId,
        result: -1
      })));
    }
    }
  }
  }, [id, Renderize]);




  // TODO aqui mesmo?
  if (isLoading) {
    return <View style={styles.mainContainer}>
      </View>;
  }



  async function startEventX() {
    try {
      if(event.playerIds.length === 0){
        console.log("Para inciar um evento é necessário existir Players inscritos.")
        return null;
      }
      if(event.playerIds.length < 2){
        console.log("Para iniciar um evento de maneira correta é necessário no mínimo 2 jogadores")
        return null
      }
      const resultado = await startEvent(id as string);
      if (resultado) {
        return "ebaaa";
      }
    } catch (e) {
      console.log('falha ao iniciar evento');
    }
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
            <Text style={styles.titlePlayersNumber}>{eventPlayers.length}</Text>
          </View>
          <View style={styles.cardEventDate}>
            <Fontisto name="date" size={24} color="#4ECB71" />
            <Text style={styles.titleEventDate}>{event.date == (undefined || null) ? 'A definir' : event.date}</Text>
          </View>
        </View>

        <SubscribeButton
            userRole={userRole}
            isUserSubscribed={isUserSubscribed}
            isLoading={isLoading}
            isEventoFull={isEventoFull}
            handleInscricao={handleInscricao} eventHasStarted={event.hasStarted} startEventX={startEventX}        />

      </View>

    </View>

      <View style={styles.navbarcontainer}>
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

      {selectedButton === 1 && (
        <View>
          <View style={styles.textdetailscontainer}>
            <Text style={styles.TextTitleDetalhes}>Detalhes</Text>
            {userRole === 'ROLE_MANAGER' && <Feather name="edit" size={20} color="gray" />}
          </View>
          <Text style={styles.TextDetails}>{event.description}</Text>
          <View style={styles.textdetailscontainer}>
            <Text style={styles.TextTitleDetalhes}>Cronograma</Text>
            {userRole === 'ROLE_MANAGER' && <Feather name="edit" size={20} color="gray" />}
          </View>
          <Text style={styles.TextDetails}>{event.description}</Text>
          <View style={styles.textdetailscontainer}>
            <Text style={styles.TextTitleDetalhes}>Premiação</Text>
            {userRole === 'ROLE_MANAGER' && <Feather name="edit" size={20} color="gray" />}
          </View>
          <Text style={styles.TextDetails}>{event.description}</Text>
        </View>
      )}

      {selectedButton === 2 && (
        <View>
          <View style={styles.textTitleContainer}>
            <Text style={styles.TextTitleTorneio}>Torneio</Text>
          </View>
          <View></View>
        </View>
      )}

{selectedButton === 3 && role === "ROLE_MANAGER" &&(
  <View>
    <Text style={styles.TextTitleDetalhes}>Rodada</Text>
    {eventoFinalizado && event.finished ? (
      <View>
        <Text>Evento Finalizado!</Text>
      </View>
    ) :
    eventoFinalizado  ? (
      <View>
        <Text>Sem mais pairings, gostaria de finalizar evento?!</Text>
        <View style={styles.positionButtonFinishRound}>
          <Pressable style={styles.buttonFinishRound} onPress={() => finalizarEvent(id as string)}>
            <Text style={styles.titleButtonFinishRound}>Finalizar Evento</Text>
          </Pressable>
        </View>
      </View>
    )
   :
  event.hasStarted == false  ? (
    <View>
      <Text>Inicie Evento para gerar pairings</Text>
    </View>
  )

    :  (
      <View>
        <View style={styles.flatListContainer}>
          <FlatList
            data={playerDetails}
            style={styles.flatList}
            renderItem={({ item, index }) => {
              if (!item || !item.playerOne || !item.playerTwo) return null;
              const pairing = pairings[index];
              return (
                <View style={styles.myParticipantsPairing}>
                  <TouchableOpacity
                    onPress={() => handlePressUser(index, 0)}
                    style={styles.cardPairing}
                  >
                    <Image
                      source={require("../../../assets/puffleOrange.png")}
                      style={[
                        styles.imageParticipantCard,
                        pairing?.result === 0 && styles.imagePressed,
                      ]}
                    />
                    <Text
                      style={[
                        styles.nameTitle,
                        pairing?.result === 0 && styles.titlePressed,
                      ]}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {item.playerOne.name}
                    </Text>
                  </TouchableOpacity>
                  <Text style={styles.vsTitle}> VS </Text>
                  <TouchableOpacity
                    onPress={() => handlePressUser(index, 1)}
                    style={styles.cardPairing}
                  >
                    <Text
                      style={[
                        styles.nameTitle,
                        pairing?.result === 1 && styles.titlePressed,
                      ]}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {item.playerTwo ? item.playerTwo.name : 'jogador desconhecido'}
                    </Text>
                    <Image
                      source={require("../../../assets/puffleBlue.png")}
                      style={[
                        styles.imageParticipantCard,
                        pairing?.result === 1 && styles.imagePressed,
                      ]}
                    />
                  </TouchableOpacity>
                </View>
              );
            }}
            keyExtractor={(item, index) => {
              if (!item || !item.playerOneId || !item.playerTwoId) {
                return `default-key-${index}`;
              }
              return `${item.playerOneId}-${item.playerTwoId}`;
            }}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
          />
        </View>
        <View style={styles.positionButtonFinishRound}>
          <Pressable style={styles.buttonFinishRound} onPress={finishRound}>
            <Text style={styles.titleButtonFinishRound}>Finalizar Round</Text>
          </Pressable>
        </View>
      </View>
    )}
  </View>
)}



{selectedButton === 3 && role === "ROLE_PLAYER" &&(
  <View>
    <Text style={styles.TextTitleDetalhes}>Rodada</Text>
    {eventoFinalizado && event.finished ? (
      <View>
        <Text>Evento Finalizado!</Text>
      </View>
    ) :
    eventoFinalizado  ? (
      <View>
        <Text>Combates finalizados, aguarde o resultado!</Text>
      </View>
    )
   :
  event.hasStarted == false  ? (
    <View>
      <Text>Aguarde a formatação de pairings!</Text>
    </View>
  )

    :   event.hasStarted == true  ? (
      <View>
        <View style={styles.flatListContainer}>
          <FlatList
            data={playerDetails}
            style={styles.flatList}
            renderItem={({ item, index }) => {
              if (!item || !item.playerOne || !item.playerTwo) return null;
              const pairing = pairings[index];
              return (
                <View style={styles.myParticipantsPairing}>
                  <TouchableOpacity
                    onPress={() => handlePressUser(index, 0)}
                    style={styles.cardPairing}
                  >
                    <Image
                      source={require("../../../assets/puffleOrange.png")}
                      style={[
                        styles.imageParticipantCard,
                        pairing?.result === 0 && styles.imagePressed,
                      ]}
                    />
                    <Text
                      style={[
                        styles.nameTitle,
                        pairing?.result === 0 && styles.titlePressed,
                      ]}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {item.playerOne.name}
                    </Text>
                  </TouchableOpacity>
                  <Text style={styles.vsTitle}> VS </Text>
                  <TouchableOpacity
                    onPress={() => handlePressUser(index, 1)}
                    style={styles.cardPairing}
                  >
                    <Text
                      style={[
                        styles.nameTitle,
                        pairing?.result === 1 && styles.titlePressed,
                      ]}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {item.playerTwo ? item.playerTwo.name : 'jogador desconhecido'}
                    </Text>
                    <Image
                      source={require("../../../assets/puffleBlue.png")}
                      style={[
                        styles.imageParticipantCard,
                        pairing?.result === 1 && styles.imagePressed,
                      ]}
                    />
                  </TouchableOpacity>
                </View>
              );
            }}
            keyExtractor={(item, index) => {
              if (!item || !item.playerOneId || !item.playerTwoId) {
                return `default-key-${index}`;
              }
              return `${item.playerOneId}-${item.playerTwoId}`;
            }}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
          />
        </View>

      </View>
    ) : null}
  </View>
)}



{selectedButton === 4 && (
  <View>
    <View style={styles.flatListContainer}>
      <Text style={styles.titleParticipants}>Participantes</Text>
      {event.playerIds.length === 0 ? (
        <Text >Nenhum participante</Text>
      ) : (
        <FlatList
          data={eventPlayers}
          style={styles.flatList}
          renderItem={({ item }) => (
            <View style={styles.myParticipants}>
              <Image
                source={require("../../../assets/puffleOrange.png")}
                style={styles.imageParticipant}
              />
              <Text>{item.name}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  </View>
)}

</View>

  
  );
}