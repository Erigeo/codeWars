import { View, Text, Pressable, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Link } from 'expo-router'
import { v4 as uuidv4 } from 'uuid';
import { createEtapa, createEvent } from '../../services/UserService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './RegisterEventStyles';
import 'react-native-get-random-values';
import { useUserData } from '../../contexts/AuthContext';
import { MultiSelect } from 'react-native-element-dropdown';



export default function RegisterEvent() {
  const [dados, setDados] = useState({} as any);
  const {collectData, handleClick} = useUserData();
  const [selected, setSelected] = useState([]);
  const data = [
    { label: 'One piece', value: 'One piece' },
    { label: 'Gratuito', value: 'Gratuito' },
    { label: 'Pago', value: 'Pago' },
    { label: 'Com classificatórias', value: 'Com classificatórias' },
    { label: 'Premiação', value: 'Premiação' },
    { label: 'Presencial', value: 'Presencial' },
    { label: 'Online', value: 'Online' },
    { label: 'Magic', value: 'Magic' },
    { label: 'Pokemon', value: 'Pokemon' },
    { label: 'Formato Suiço', value: 'Formato Suiço' },
  ];

  
   
  


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
        descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent tincidunt posuere nisi, eget tempor massa mollis vel. Nulla nec augue vulputate, tempus eros vitae, aliquet quam. Mauris ut luctus ligula. Nunc ac tempor lorem. Maecenas ut augue fringilla, ornare velit at, dapibus ante. Suspendisse potenti. Ut lacinia ex odio. Morbi sit amet eros augue. Nulla accumsan libero feugiat eleifend cursus.',
        local: dados.local,
        tags: selected,
        numEtapas: dados.numEtapas
        
      })
      handleClick()
      for(let i=1; i < parseInt(dados.numEtapas)+1; i++){
      const resultado1 = await createEtapa({
        id: uuidv4(),
        eventoId: resultado,
        nome: `Dia ${i}`
      })}
      
      }catch(e){
        console.log(e)
      }
    }
    

   
  

  return (


    <View style={styles.container} >
    
      <View style={styles.titleContainer}>
         <Text style={styles.title}>Cadastrar Evento</Text>
         </View>
     
     <View style={styles.inputsContainer}>
      
          <View style={styles.inputContainer}>
            <Text style={styles.textInput}>Nome do Evento</Text>
            <TextInput style={styles.input} placeholder="nome do evento" autoCapitalize='none' onChangeText={(text) => atualizarDados("eventoNome", text)}  />
          </View>
        
        <View style={styles.inputContainer} >
          <Text style={styles.textInput}>Número de Participantes</Text>
          <TextInput style={styles.input} placeholder="num participantes" autoCapitalize='none' onChangeText={(text) => atualizarDados("numParticipantes", text)}  />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.textInput}>Local</Text>
          <TextInput style={styles.input} placeholder="local" autoCapitalize='none' onChangeText={(text) => atualizarDados("local", text)}  />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.textInput}>Número de Etapas</Text>
         <TextInput style={styles.input} placeholder="Numero de etapas" autoCapitalize='none' onChangeText={(text) => atualizarDados("numEtapas", text)}  />
        </View>
     </View>
     
      <MultiSelect
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          containerStyle={styles.containerSearch}
          itemTextStyle={styles.textItem}
          activeColor={"#3D5D75"}
          search
          data={data}
          labelField="label"
          valueField="value"
          placeholder="Adicione Tags"
          searchPlaceholder="buscar..."
          value={selected}
          onChange={item => {
            setSelected(item);
          }}
          
          selectedStyle={styles.selectedStyle}
        />

      <Pressable style={styles.button} onPress={()=>cadastrarEvento()}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </Pressable>

     
        

    </View>
  );
}