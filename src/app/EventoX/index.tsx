import { View, StyleSheet, Text, Pressable, FlatList } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useUserEventData } from "../../contexts/EventContext";
import { Feather } from '@expo/vector-icons';
import styles from './EventoXStyles';
import { startEvent } from '../../services/ManagerService';

export default function EventoX() {
  const {
    event,
    collectEventDataById,
    eventPlayers,
    collectPlayersDataByEventId,
    Renderize,
    handleClick,
    availablePairings,
    getAvailablePairings,
    playerDetails,
    fetchPlayerDetails
  } = useUserEventData();
  const [selectedButton, setSelectedButton] = useState(null);
  const { id } = useLocalSearchParams();

  const handleButtonPress = (buttonIndex) => {
    setSelectedButton(buttonIndex);
  };

  async function startEventX() {
    try {
      const resultado = await startEvent(id as string);
      if (resultado) {
        return "ebaaa";
      }
    } catch (e) {
      console.log('falha ao iniciar evento');
    }
  }

  useEffect(() => {
    if (id) {
      collectEventDataById(id as string);
      collectPlayersDataByEventId(event);
      getAvailablePairings(event);
      
    }
  }, [id, Renderize]);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.myevents}>
        <Image style={styles.imageContainer} source={{ uri: event.imagePath }} />
        <View style={styles.titleContainer}>
          <Text style={styles.titleEventName}>{event.name}</Text>
          <View style={styles.infoCardsContainer}>
            <View style={styles.cardPlayersNumber}>
              <Ionicons name="people" size={28} color="#9747FF" />
              <Text style={styles.titlePlayersNumber}>{eventPlayers.length}</Text>
            </View>
            <View style={styles.cardEventDate}>
              <Fontisto name="date" size={24} color="#4ECB71" />
              <Text style={styles.titleEventDate}>02/05/24</Text>
            </View>
          </View>
          <Pressable style={styles.buttonSeeEvent} onPress={() => startEventX()}>
            <Text style={styles.buttonMyEventText1}>Iniciar Evento</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.navbarcontainer}>
        <Pressable style={styles.navbarButtons} onPress={() => { handleButtonPress(1); handleClick(); }}>
          <Text style={[selectedButton === 1 && styles.selectedText]}>Detalhes</Text>
        </Pressable>
        <Pressable style={styles.navbarButtons} onPress={() => { handleButtonPress(2); handleClick(); }}>
          <Text style={[selectedButton === 2 && styles.selectedText]}>Torneio</Text>
        </Pressable>
        <Pressable style={styles.navbarButtons} onPress={() => { handleButtonPress(3); handleClick(); }}>
          <Text style={[selectedButton === 3 && styles.selectedText]}>Rodada</Text>
        </Pressable>
        <Pressable style={styles.navbarButtons} onPress={() => { handleButtonPress(4); handleClick(); }}>
          <Text style={[selectedButton === 4 && styles.selectedText]}>Gerenciar</Text>
        </Pressable>
      </View>

      {selectedButton === 1 && (
        <View>
          <View style={styles.textdetailscontainer}>
            <Text style={styles.TextTitleDetalhes}>Detalhes</Text>
            <Feather name="edit" size={20} color="gray" />
          </View>
          <Text style={styles.TextDetails}>{event.description}</Text>
          <View style={styles.textdetailscontainer}>
            <Text style={styles.TextTitleDetalhes}>Cronograma</Text>
            <Feather name="edit" size={20} color="gray" />
          </View>
          <Text style={styles.TextDetails}>{event.description}</Text>
          <View style={styles.textdetailscontainer}>
            <Text style={styles.TextTitleDetalhes}>Premiação</Text>
            <Feather name="edit" size={20} color="gray" />
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

      {selectedButton === 3 && (
        <View>
          <Text style={styles.TextTitleDetalhes}>Rodada</Text>
          <View style={styles.flatListContainer}>
          <FlatList
        data={playerDetails}
        style={styles.flatList}
        renderItem={({ item }) => {
          if (!item.playerOneId || !item.playerTwoId) return null;
          return (
            <View style={styles.myParticipantsPairing}>
              <View style={styles.cardPairing}>
                <Image source={require("../../../assets/puffleOrange.png")} style={styles.imageParticipantCard} />
                <Text style={styles.nameTitle}>{item.playerOne.name}</Text>
                </View>
              <Text style={styles.vsTitle}> VS </Text>
              <View style={styles.cardPairing}>

              <Text style={styles.nameTitle}>{item.playerTwo.name}</Text>
              <Image source={require("../../../assets/puffleBlue.png")} style={styles.imageParticipantCard} />

              </View>

            </View>
          );
        }}
        keyExtractor={(item, index) => {
          if (!item.playerOneId || !item.playerTwoId) {
            return `default-key-${index}`;
          }
          return `${item.playerOneId}-${item.playerTwoId}`;
        }}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
      />
          </View>
        </View>
      )}

      {selectedButton === 4 && (
        <View>
          <View style={styles.flatListContainer}>
            <Text style={styles.titleParticipants}>Participantes</Text>
            <FlatList
              data={eventPlayers}
              style={styles.flatList}
              renderItem={({ item }) => (
                <View style={styles.myParticipants}>
                  <Image source={require("../../../assets/puffleOrange.png")} style={styles.imageParticipant} />
                  <Text>{item.name}</Text>
                </View>
              )}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
      )}
    </View>
  );
}