import React, { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import styles from './indexStyle'; // Adjust the path as necessary
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, router } from 'expo-router';
import Login from './Login';

export default function Page() {
  const [carregandoPage, setCarregandoPage] = useState(true);

  function handleLoginSuccess() {
     router.replace('Home')
    console.log('Login bem-sucedido! Navegar para Home...');
  }
  

  useEffect(() => {
    //AsyncStorage.removeItem('token') //comente para funcionar a persistência de login 
    async function verifyLogin() {
      
      try {
      const token = await AsyncStorage.getItem('token')
      
      
      if(token){
        
        router.replace('Home')
      }
      setCarregandoPage(false)
      }
      catch (e) {
        console.log("aff")
      }
     
    }
    verifyLogin()
  }, [])

  if(carregandoPage){
    return null
  }
  return (
    <View style={styles.container}>
      <View style={styles.containerTitle}>
        <Text style={styles.title1}>CARD</Text>
        <Text style={styles.title2}>WARS</Text>
      </View>

      
         <Login onSuccess={handleLoginSuccess}/>
  
    </View>
  );
}

