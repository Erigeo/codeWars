import React from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import styles from './RegisterStyles'; // Importando os estilos

export default function RegisterPage({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Senha" secureTextEntry />
      <TextInput style={styles.input} placeholder="Confirme a Senha" secureTextEntry />
      <Pressable style={styles.button} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('LoginPage')}>
        <Text style={styles.linkText}>Já tem uma conta? Entre aqui</Text>
      </Pressable>
    </View>
  );
}
