import React, { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import styles from './Home/HomeStyles'; // Adjust the path as necessary
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link } from 'expo-router';


export default function Page() {
  const [carregandoPage, setCarregandoPage] = useState(true);
  

  useEffect(() => {
    AsyncStorage.removeItem('token')
    async function verifyLogin() {
      
      try {
      const token = await AsyncStorage.getItem('token')
      
      
      if(token){
        
        <Link href="/Profile"></Link>
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

      <View>
        <Link href={"Login"} asChild>
        <Pressable  style= {styles.buttonArea}>
          <Text>Login</Text>
        </Pressable>
        </Link>
      </View>
    </View>
  );
}

