import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import styles from './RegisterStyles'; // Importando os estilos
import { signUpPlayer } from '../../services/PlayerService';
import { router } from 'expo-router';
import { signUpManager } from '../../services/ManagerService';


export default function Register() {
  const [dados, setDados] = useState({} as any);

  const handlePress = async () => {
    if (dados.tipoDeUser === 'ROLE_PLAYER') {
      await cadastrarPlayer();
    } else if (dados.tipoDeUser === 'ROLE_MANAGER') {
      await cadastrarManager();
    } else {
      console.log('Tipo de usuário desconhecido');
    }
  };



function atualizarDados(id: string, valor: string){
  setDados({...dados, [id]: valor})}

  async function cadastrarPlayer(){
    try{
      const resultado = await signUpPlayer({
        //cpf: dados.cpf,
        //nome: dados.nome,
        email: dados.email,
        username: dados.username,
        name: dados.name,
        //endereco: {
          //cep: dados.cep,
          //cidade: dados.cidade,
          //estado: dados.estado,  
        //},
        password: dados.password,
       // telefone: dados.telefone,
      })
      console.log(resultado)
      if (resultado) {
        console.log("criado")
        router.replace('/');

      }
      }catch(e){
        console.log(e)
      }
    }

    async function cadastrarManager(){
      try{
        const resultado = await signUpManager({
          //cpf: dados.cpf,
          //nome: dados.nome,
          email: dados.email,
          username: dados.username,
          name: dados.name,
          //endereco: {
            //cep: dados.cep,
            //cidade: dados.cidade,
            //estado: dados.estado,  
          //},
          password: dados.password,
         // telefone: dados.telefone,
        })
        console.log(resultado)
        if (resultado) {
          console.log("criado")
          router.replace('/');
  
        }
        }catch(e){
          console.log(e)
        }
      }
    

   
  

  return (

    <View style={styles.container} >
    
      
      <Text style={styles.title}>Cadastro</Text>
      <TextInput style={styles.input} placeholder="email" autoCapitalize='none' onChangeText={(text) => atualizarDados("email", text)}  />
      <TextInput style={styles.input} placeholder="Nome" autoCapitalize='none' onChangeText={(text) => atualizarDados("name", text)}  />
      <TextInput style={styles.input} placeholder="Username" autoCapitalize='none' onChangeText={(text) => atualizarDados("username", text)}  />
      <TextInput style={styles.input} placeholder="Senha" autoCapitalize='none' onChangeText={(text) => atualizarDados("password", text)}  />
    
    <View  style={styles.picker}>
    <RNPickerSelect
      onValueChange={(text) => atualizarDados('tipoDeUser', text)}
      items={[
        { label: 'Competidor', value: 'ROLE_PLAYER' },
        { label: 'Manager', value: 'ROLE_MANAGER' },
      ]}
    />
    </View>

    
      <Pressable style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </Pressable>
        

    </View>
  );
}
