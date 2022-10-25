import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {Home,Front} from "./src/pages/";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
        name="Front"
        component={Front}
        options={{
          title: "test",
          headerStyle:{
            backgroundColor:"#123123"
          },
          headerTitleAlign:"left",
          headerTintColor:"white", 
        }}

        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: "test",
            headerStyle: {
              backgroundColor: "#7F00FF",
            },
            headerTitleAlign: "center",
            headerTintColor: "white",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
