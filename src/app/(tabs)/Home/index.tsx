import { View, Text, Pressable, StyleSheet, FlatList } from 'react-native'
import { Image } from 'expo-image';
import React, { useEffect, useState } from 'react'
import { Link, router } from 'expo-router'
import { Evento, User } from '../../../interfaces/User'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getEventData, getUserData } from '../../../services/UserService'
import { Ionicons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { useUserData } from '../../../contexts/AuthContext';
import { useUserEventData } from '../../../contexts/EventContext';

export default function Home() {
  const { dataUser, collectData, Renderize } = useUserData();
  const {eventList, collectUserEvent} = useUserEventData();

  useEffect(()=> {
  
  collectData(), collectUserEvent()
  
  },
  [Renderize])

  const handlePress = (id: string) => {
    router.push({
      pathname: '/EventoX',
      params:{ id },
    });
  };



  return (
    <View style={{flex:1, backgroundColor: '#2D3841'}}>
      <View style={{ maxWidth: '40%', marginLeft: 5}}>
           <Text style={styles.titleMyEvents}>Meus Eventos</Text>
      </View>
      
      {/* <Text> {JSON.stringify(eventList[0].id)} </Text>  */} 
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>

     
        {dataUser.tipoDeUser == "Manager" && eventList.length==null ? (
          <View style={styles.myevents}>
            <Text style={styles.myEventsDescription}>Voce ainda não criou nenhum evento!</Text>
            <Link href={"RegisterEvent"} asChild>
              <Pressable style={styles.buttonSearchEvents}>
                <Text style={styles.buttonMyEventText}>criar evento</Text>
              </Pressable>
            </Link>
        </View>
        
): null
}

          {dataUser.tipoDeUser == "Manager" && eventList.length>=1 ? (
          <View style={styles.myeventsContainer}>
            <FlatList
            data={eventList}
            style={{ maxHeight: '80%'}}
            renderItem={({item}) => { return (
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
                
                  <Pressable style={styles.buttonSeeEvent} onPress={() => handlePress(item.id)} >
                    <Text style={styles.buttonMyEventText1}>Visualizar evento</Text>
                  </Pressable>
                
              </View>
              
            </View>
          )}}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
        />
        <View style={styles.buttonCreateContainer}> 
              <Link href={"RegisterEvent"} asChild>
                <Pressable style={styles.buttonCreateEvents}>
                  <Text style={styles.buttonMyEventText}>criar evento</Text>
                </Pressable>
              </Link>
          </View>
      </View>
          
  ): null
}
</View>


{dataUser.tipoDeUser == "User"  ? (
       
        <View style={styles.myevents}>
          <Text style={styles.myEventsDescription}>Voce ainda não está participando de nenhum evento!</Text>
         <Pressable style={styles.buttonSearchEvents}>
            <Text style={styles.buttonMyEventText}>Encontrar Eventos</Text>
         </Pressable>
      
        </View>
): null
}
</View>
  )
  
}


const styles = StyleSheet.create({
  myeventsContainer: {
    flex: 1,
    width: '95%',
    marginTop: 10,
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
  buttonCreateEvents: {
   
    backgroundColor: '#364753',
    width: '70%',
    alignItems: 'center',
    height: 30,
    justifyContent: 'center',
    borderRadius: 15,
    borderColor: '#3D5D75',
    borderWidth: 2,
  },
  buttonCreateContainer: {
    
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  
    
    
  }
  
})