import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import styles from './RegisterStyles'; // Importando os estilos
import { signUpUser } from '../../services/UserService';
import { router } from 'expo-router';


export default function Register() {
  const [dados, setDados] = useState({} as any);




function atualizarDados(id: string, valor: string){
  setDados({...dados, [id]: valor})}

  async function cadastrarUser(){
    try{
      const resultado = await signUpUser({
        //cpf: dados.cpf,
        //nome: dados.nome,
        email: dados.email,
        //nickname: dados.nickname,
        tipoDeUser: dados.tipoDeUser,
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
        router.replace("/Login")

      }
      }catch(e){
        console.log(e)
      }
    }
    

   
  

  return (

    <View style={styles.container} >
    
      
      <Text style={styles.title}>Cadastro</Text>
      <TextInput style={styles.input} placeholder="email" autoCapitalize='none' onChangeText={(text) => atualizarDados("email", text)}  />
      <TextInput style={styles.input} placeholder="Senha" autoCapitalize='none' onChangeText={(text) => atualizarDados("password", text)}  />
    
    <View  style={styles.picker}>
    <RNPickerSelect
      onValueChange={(text) => atualizarDados('tipoDeUser', text)}
      items={[
        { label: 'Competidor', value: 'User' },
        { label: 'Manager', value: 'Manager' },
      ]}
    />
    </View>

      <Pressable style={styles.button} onPress={()=>cadastrarUser()}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </Pressable>
        

    </View>
  );
}
