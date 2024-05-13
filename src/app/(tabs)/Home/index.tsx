import { View, Text, Pressable, StyleSheet, FlatList } from 'react-native'
import { Image } from 'expo-image';
import React, { useEffect, useState } from 'react'
import { Link } from 'expo-router'
import { Evento, User } from '../../../interfaces/User'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getEventData, getUserData } from '../../../services/UserService'
import { Ionicons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';

export default function Home() {
  const [dataUser, setDataUser] = useState({} as User)
  const [eventList, setEventList] = useState<Evento[]>([])

  useEffect(()=> {
    console.log("passei aqui")
    async function collectData() {
      try{
       
      const idUser = await AsyncStorage.getItem('userId')
      const resultado = await getUserData(idUser)
      if(resultado){
        setDataUser(resultado)
        //console.log(resultado)
      }
    }catch(e){
      console.log(e)
    }
  }

  async function collectUserEvent(){
    
    try{
      const idUser = await AsyncStorage.getItem('userId')
      const resultado = await getEventData()
      if(resultado){
        const resultadoFiltrado = resultado.filter((Evento: Evento)=> {
          return Evento.userId == idUser;
        })
       
        setEventList(resultadoFiltrado)

      }
    }catch(e){
      console.log("falhoooou aquiii")

    }
  }
    
  collectData(), collectUserEvent()
  
  },
  [])



  return (
    <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#2D3841'}}>
      <Text style={styles.titleMyEvents}>Meus Eventos</Text>
      {/* <Text> {JSON.stringify(eventList[0].id)} </Text>  */} 
      
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
                <Link href={"RegisterEvent"} asChild>
                  <Pressable style={styles.buttonSeeEvent}>
                    <Text style={styles.buttonMyEventText1}>Visualizar evento</Text>
                  </Pressable>
                </Link>
              </View>
            </View>
            
          )}}
            keyExtractor={item => item.id}
            horizontal={true}
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
    maxHeight: 200,
    width: '100%',
    marginTop: 10,
    
    
  },
  myevents: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 15,
    backgroundColor: '#364753',
    width: 400,
    height: 150,
    marginHorizontal: 15,
    
    

    
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
    marginLeft: -160
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
    borderWidth: 2
  },
  buttonCreateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10
  
    
    
  }
  
})