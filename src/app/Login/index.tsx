import React, { useState } from 'react';
import { Text, TextInput, View, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Snackbar } from 'react-native-paper';
import { signIn } from '../../services/Auth';
import {jwtDecode, JwtPayload} from 'jwt-decode';
import { Link } from 'expo-router';
import "core-js/stable/atob";
import { getUserData } from '../../services/PlayerService';
import { Player } from '../../interfaces/User';
import styles from './LoginStyles'; // Importando os estilos

interface CustomJwtPayload extends JwtPayload {
  id: string;
  role: string; // Adicione outras propriedades conforme necessário
}

export default function Login({ onSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [dados, setDados] = useState({} as Player);

  const onDismissSnackBar = () => setVisible(false);

  async function handleLogin() {
    try {
      console.log('Attempting to log in with email:', email, 'and password:', password);
      const resultado = await signIn(email, password);
      console.log('SignIn result:', resultado);

      const token = resultado; // Access the token directly from the response
      console.log('Token:', token);

      if (token) {
        await AsyncStorage.setItem('token', token); // Store the token without JSON.stringify

        const decodedToken = jwtDecode<CustomJwtPayload>(token);
        console.log('Decoded Token:', decodedToken);

        const userId = decodedToken.id;
        const userRole = decodedToken.role;
        console.log('UserId:', userId);
        console.log('UserRole:', userRole);

        await AsyncStorage.setItem('userId', userId);
        await AsyncStorage.setItem('userRole', userRole);

        onSuccess();
      } else {
        console.log('No token received');
        setVisible(true);
      }
    } catch (e) {
      console.log('Error during login:', e);
      setVisible(true);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        autoCapitalize="none"
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        autoCapitalize="none"
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <Pressable style={styles.button} onPress={handleLogin}>
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
          label: 'Fechar',
          onPress: onDismissSnackBar,
        }}
      >
        Falha ao efetuar login.
      </Snackbar>
    </View>
  );
}
