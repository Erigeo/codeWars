import { View, Text, Button } from 'react-native'
import React from 'react'
import { Stack, useRouter } from 'expo-router'

export default function _layout() {
    const router = useRouter();
  
    return (
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
    
   </Stack>
  )
}