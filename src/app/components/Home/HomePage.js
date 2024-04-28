import React from 'react';
import { Pressable, Text, View } from 'react-native';
import styles from './HomeStyles'; // Adjust the path as necessary

function HomePage({ navigation }) {
  function handlePress() {
    navigation.navigate('LoginPage');
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

export default HomePage;
