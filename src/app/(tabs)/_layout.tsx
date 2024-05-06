import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'

export default function _layout() {
  return (
    <Tabs>
        <Tabs.Screen name="teste1" options={{
            headerTitle: "One",
            tabBarLabel: 'One'
        }} />
        <Tabs.Screen name="teste2" options={{
            headerTitle: "teste2",
            tabBarLabel: 'teste2',
            headerShown: false
        }} />
    </Tabs>
  )
}