import { View, Text, Button } from 'react-native'
import React from 'react'
import { Stack, useRouter } from 'expo-router'
import { UserProvider } from '../contexts/AuthContext';
import { UserEventProvider } from '../contexts/EventContext';

export default function _layout() {
    const router = useRouter();
  
    return (
        <UserProvider>
        <UserEventProvider>
        <Stack
    screenOptions={{
        // headerStyle: {
        //     backgroundColor: 'black'
        // },
        // headerTintColor: 'white'
    }}
   >
        <Stack.Screen name="index" options={{
            title: 'Home', headerShown: false
        }} />
        <Stack.Screen name="Login/index" options={{
            title: 'Login Modal',
            
        }} />
         <Stack.Screen name="Register/index" options={{
            title: 'Login Modal',
            headerShown: false
            
        }} />
        <Stack.Screen name="(tabs)" options={{
            title: 'Login Modal',
            headerShown: false
            
        }} />
        <Stack.Screen name="RegisterEvent/index" options={{
            title: 'teste',
            headerShown: true
            
        }} />
        <Stack.Screen name="EventoX/index" options={{
            title: 'teste1',
            headerShown: true
            
        }} />
    
     </Stack>
     </UserEventProvider>
     </UserProvider>
  )
}