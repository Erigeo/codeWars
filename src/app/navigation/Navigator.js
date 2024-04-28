import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from '../components/Home/HomePage';
import LoginPage from '../components/Login/LoginPage';
import RegisterPage from '../components/Register/RegisterPage';
import ProfilePage from '../components/Profile/ProfilePage';

const Stack = createNativeStackNavigator();

function Navigator() {
  return (
    <Stack.Navigator initialRouteName="HomePage">
      <Stack.Screen 
        name="HomePage" 
        component={HomePage} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="LoginPage" 
        component={LoginPage} 
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterPage"
        component={RegisterPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfilePage"
        component={ProfilePage}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default Navigator;
