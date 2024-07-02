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
        
        headerStyle: {
            backgroundColor: '#3D5D75'
        },
         headerTintColor: '#DAE2E9'
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
            //headerShown: false
            
        }} />
        <Stack.Screen name="(tabs)" options={{
            title: 'Login Modal',
            headerShown: false
            
        }} />
        <Stack.Screen name="RegisterEvent/index" options={{
            title: 'Registrar',
            headerShown: true
            
        }} />
        <Stack.Screen name="EventoX/index" options={{
            title: 'Evento',
            headerShown: true
            
        }} />
    
     </Stack>
     </UserEventProvider>
     </UserProvider>
  )
}