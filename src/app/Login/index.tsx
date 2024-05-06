import React, { useEffect, useState } from 'react';
import "core-js/stable/atob";
import {Snackbar} from 'react-native-paper'
import { Pressable, Text, TextInput, View } from 'react-native';
import styles from './LoginStyles'; // Importando os estilos
import { signIn } from '../../services/Auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { Link, router } from 'expo-router';


export default function Login() {
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [visible, setVisible] = useState(false);
const onDismissSnackBar = () => setVisible(false);



  
async function login(){
  try{
  const resultado = await signIn(email, password)
  const token = JSON.stringify(resultado)
    
  if(token){
    
    //const { token } = resultado
   
    AsyncStorage.setItem('token', token)
    const decodeToken = jwtDecode(token) as any
    const userId = decodeToken.sub
    console.log(decodeToken)


    AsyncStorage.setItem('userId', userId)    
  
   router.replace("teste2");

  }
   
  }catch (e){
    console.log(e)
    setVisible(true)
  }
}



  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput style={styles.input} placeholder="Email" value={email} autoCapitalize='none' onChangeText={setEmail} keyboardType="email-address" />
     
      <TextInput style={styles.input} placeholder="Senha" value={password} autoCapitalize='none' onChangeText={setPassword}  />
     
      <Pressable style={styles.button} onPress={login}>
        <Text style={styles.buttonText}>Entrar</Text>
      </Pressable>
      
      <Link replace href={"Register"} asChild>
      <Pressable>
        <Text style={styles.linkText}>Não tem uma conta? Cadastre-se</Text>
      </Pressable>
      </Link>

      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Undo',
          onPress: () => setVisible(false)
        }}>
        Falha ao efetuar login.
      </Snackbar>
    </View>
  );
}
