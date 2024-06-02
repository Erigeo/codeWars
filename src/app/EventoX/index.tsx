import { View, StyleSheet, Text, Pressable} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React, { useEffect, useState } from 'react'
import { Link } from 'expo-router'
import { useUserData } from "../../contexts/AuthContext";
import { useLocalSearchParams } from 'expo-router';
import { useUserEventData } from "../../contexts/EventContext";

export default function EventoX(){
    const { dataUser, collectData, Renderize } = useUserData();
    const {eventList, collectUserEvent, collectEventDataById} = useUserEventData();
    const [selectedButton, setSelectedButton] = useState(null);
    const handleButtonPress = (buttonIndex) => {
      setSelectedButton(buttonIndex);
    };

    const  {id}  = useLocalSearchParams();
    const item = collectEventDataById(id as string)


  useEffect(()=> {
  
  collectData(), collectUserEvent()
  
  },
  [Renderize])


    return(
        <View style={styles.mainContainer}>
            <View style={styles.myevents}> 
              <Image style={styles.imageContainer} source={item.imagem}></Image>
            
               <View style={styles.titleContainer}>
                  <Text style={styles.titleEventName}> {item.eventoNome} </Text>  

                  <View style={styles.infoCardsContainer}>
                
                    <View style={styles.cardPlayersNumber}>
                      < Ionicons name="people" size={28} color="#9747FF" />
                      <Text style={styles.titlePlayersNumber}> 35</Text>
                    </View>
                    <View style={styles.cardEventDate}>
                      <Fontisto name="date" size={24} color="#4ECB71" />
                      <Text style={styles.titleEventDate}> 02/05/24</Text>
                    </View>
                  </View>
                
                  <Pressable style={styles.buttonSeeEvent}>
                    <Text style={styles.buttonMyEventText1}>Iniciar Evento</Text>
                  </Pressable>
                
              </View>
              
            </View>

            <View style={styles.navbarcontainer} >
                
                  <Pressable style={styles.navbarButtons} onPress={()=> handleButtonPress(1)}>
                    <Text style={[
                        selectedButton === 1 && styles.selectedText
                    ]}>Detalhes</Text>
                  </Pressable>
                  <Pressable style={styles.navbarButtons} onPress={()=> handleButtonPress(2)}>
                    <Text style={[
                        selectedButton === 2 && styles.selectedText
                    ]}>Torneio</Text>
                  </Pressable>
                  <Pressable style={styles.navbarButtons} onPress={()=> handleButtonPress(3)}>
                    <Text style={[
                        selectedButton === 3 && styles.selectedText
                    ]}>Rodada</Text>
                  </Pressable>
                  <Pressable style={styles.navbarButtons} onPress={()=> handleButtonPress(4)}>
                    <Text style={[
                        selectedButton === 4 && styles.selectedText
                    ]}>Grade</Text>
                  </Pressable>
            </View>
            
            {selectedButton == 1? (
              <View>
                <Text style={styles.TextTitleDetalhes}>Detalhes</Text>
                  
              </View>
            ): null}

            {selectedButton == 2? (
              <View>
              <Text style={styles.TextTitleDetalhes}>Torneio</Text>
            </View>
            ): null}

             {selectedButton == 3? (
              <View>
              <Text style={styles.TextTitleDetalhes}>Rodada</Text>
            </View>
            ): null}

            {selectedButton == 4? (
              <View>
              <Text style={styles.TextTitleDetalhes}>Grade</Text>
            </View>
            ): null}
            
        </View>
    )
}

const styles = StyleSheet.create({
  TextTitleDetalhes:{
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

})
