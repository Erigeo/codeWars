import React, { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import styles from './HomeStyles'; // Adjust the path as necessary
import Api from '../../../services/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function HomePage({ navigation } : any) {
  const [carregandoPage, setCarregandoPage] = useState(true);
  function handlePress() {
    navigation.navigate('LoginPage');
    
  }

  useEffect(() => {
    AsyncStorage.removeItem('token')
    async function verifyLogin() {
      
      try {
      const token = await AsyncStorage.getItem('token')
      
      
      if(token){
        
        navigation.navigate('ProfilePage')
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
        <Pressable style={styles.buttonLogin} onPress={handlePress}>
          <Text>Login</Text>
        </Pressable>
      </View>
    </View>
  );
}

