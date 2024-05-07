import { View, Text, Pressable, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link } from 'expo-router'
import { User } from '../../../interfaces/User'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getUserData } from '../../../services/UserService'

export default function Home() {
  const [dataUser, setDataUser] = useState({} as User)

  useEffect(()=> {
    async function collectData() {
      try{
       
      const idUser = await AsyncStorage.getItem('userId')
      const resultado = await getUserData(idUser)
      if(resultado){
        setDataUser(resultado)
        console.log(resultado)
      }
    }catch(e){
      console.log(e)
    }
  }
    
  collectData()
  console.log(dataUser.eventos + 'vish')
  },
  [])


  return (
    <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#2D3841'}}>
      <Text style={styles.titleMyEvents}>Meus Eventos</Text>
      
        {dataUser.tipoDeUser == "Manager" && (dataUser.eventos).length == 0 ? (
          
        <View style={styles.myevents}>
          
          <Text style={styles.myEventsDescription}>Voce ainda não criou nenhum evento!</Text>
         <Pressable style={styles.buttonSearchEvents}>
            <Text style={styles.buttonMyEventText}>criar evento</Text>
         </Pressable>
      
        </View>
        
): null
}
{dataUser.tipoDeUser == "User" && (dataUser.eventos).length == 0 ? (
       
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
  myevents: {
  
    borderRadius: 15,
    backgroundColor: '#364753',
    paddingHorizontal: 20,
    paddingVertical: 20,
    width: '80%',
    marginTop: 20,
    alignItems: 'center',
    
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
    color: '#FFFFFF',
    fontSize: 24
  },
  myEventsDescription: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 10
  },
  buttonMyEventText: {
    color: '#FFFFFF',
    fontSize: 20
  }
})