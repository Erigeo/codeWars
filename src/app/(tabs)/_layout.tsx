import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Entypo } from '@expo/vector-icons';

export default function _layout() {
  return (
    <Tabs screenOptions={{
        tabBarStyle: {
            backgroundColor: '#3D5D75',
            
        },
        tabBarInactiveTintColor: '#DAE2E9',
       // tabBarActiveTintColor: '#DAE2E9'
        
    }} > 
        <Tabs.Screen name="Eventos/index" options={{
            headerTitle: "EVENTOS",
            headerTitleAlign: 'left',
            tabBarLabel: 'eventos',
            headerStyle: {
                backgroundColor: '#3D5D75'
              },
              headerTitleStyle: {
                fontWeight: 'bold',
                color: '#DAE2E9'
            }
        }} />
        <Tabs.Screen name="Decks/index" options={{
            headerTitle: "DECKS",
            tabBarLabel: 'decks',
            headerTitleAlign: 'left',
            headerStyle: {
                backgroundColor: '#3D5D75'
              },
              headerTitleStyle: {
                fontWeight: 'bold',
                color: '#DAE2E9'
            }
        }} />
        <Tabs.Screen name="Home" options={{
            headerTitle: "CARDWARS",
            tabBarLabel: 'home',
            tabBarIcon: ({color, size}) => (
                <Entypo name="home" size={24} color="#DAE2E9" />
            ),
            headerTitleAlign: 'left',
            headerStyle: {
                backgroundColor: '#3D5D75'
              },
            headerTitleStyle: {
                fontWeight: 'bold',
                color: '#DAE2E9'
            }
        }} />
        <Tabs.Screen name="Ranking/index" options={{
            headerTitle: "RANKING",
            tabBarLabel: 'ranking',
            headerTitleAlign: 'left',
            headerStyle: {
                backgroundColor: '#3D5D75'
              },
              headerTitleStyle: {
                fontWeight: 'bold',
                color: '#DAE2E9'
            }
        }} />
        <Tabs.Screen name="Perfil/index" options={{
            headerTitle: "PERFIL",
            tabBarLabel: 'perfil',
            headerTitleAlign: 'left',
            headerStyle: {
                backgroundColor: '#3D5D75'
              },
              headerTitleStyle: {
                fontWeight: 'bold',
                color: '#DAE2E9'
            }
            
        }} />
        
    </Tabs>
  )
}