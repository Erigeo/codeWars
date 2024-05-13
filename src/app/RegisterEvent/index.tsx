import { View, Text, Pressable, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Link } from 'expo-router'
import { v4 as uuidv4 } from 'uuid';
import { createEvent } from '../../services/UserService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './RegisterEventStyles';
import 'react-native-get-random-values';


export default function RegisterEvent() {
  const [dados, setDados] = useState({} as any);




function atualizarDados(id: string, valor: string){
  setDados({...dados, [id]: valor})}

  async function cadastrarEvento(){
    try{
      const resultado = await createEvent({
        id: uuidv4(),
        userId:  await AsyncStorage.getItem('userId'),
        eventoNome: dados.eventoNome,
        numParticipantes: dados.numParticipantes,
        participantes: [],
        imagem: 'https://transform.nws.ai/https%3A%2F%2Fcdn.thenewsroom.io%2Fplatform%2Fstory_media%2F1288806935%2F720x511-Magic-WorldChampionship-XXVIII-Logo.png/w_1200,c_limit/', 
        dataInicio: dados.dataInicio,
        etapas: [],
        descricao: '',
        local: dados.local,
      })
      console.log(resultado)
      if (resultado) {
        console.log("criado")
       // router.replace("/Login")
      }
      }catch(e){
        console.log(e)
      }
    }
    

   
  

  return (


    <View style={styles.container} >
    
      <View>
         <Text style={styles.title}>Cadastro Evento</Text>
         </View>
     
     

     
      <TextInput style={styles.input} placeholder="nome do evento" autoCapitalize='none' onChangeText={(text) => atualizarDados("eventoNome", text)}  />
      <TextInput style={styles.input} placeholder="num participantes" autoCapitalize='none' onChangeText={(text) => atualizarDados("numParticipantes", text)}  />
      <TextInput style={styles.input} placeholder="local" autoCapitalize='none' onChangeText={(text) => atualizarDados("local", text)}  />

    
      <Pressable style={styles.button} onPress={()=>cadastrarEvento()}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </Pressable>

     
        

    </View>
  );
}