import React from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import styles from './LoginStyles'; // Importando os estilos

export default function LoginPage({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Senha" secureTextEntry />
      <Pressable style={styles.button} onPress={() => navigation.navigate('ProfilePage')}>
        <Text style={styles.buttonText}>Entrar</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('RegisterPage')}>
        <Text style={styles.linkText}>Não tem uma conta? Cadastre-se</Text>
      </Pressable>
    </View>
  );
}
