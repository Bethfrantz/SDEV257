import React, { useState, useEffect } from "react";
import { Platform, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NetInfo from "@react-native-community/netinfo";

import PlanetsScreen from "./screens/PlanetsScreen";
import FilmsScreen from "./screens/FilmsScreen";
import SpaceshipsScreen from "./screens/SpaceshipsScreen";
import FilmDetailScreen from "./screens/FilmDetailScreen";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();                  

function IOSNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Planets" component={PlanetsScreen} />
      <Tab.Screen name="Films" component={FilmsScreen} />
      <Tab.Screen name="Spaceships" component={SpaceshipsScreen} />
    </Tab.Navigator>
  );
}

function AndroidNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Planets" component={PlanetsScreen} />
      <Drawer.Screen name="Films" component={FilmsScreen} />
      <Drawer.Screen name="Spaceships" component={SpaceshipsScreen} />
    </Drawer.Navigator>
  );
}

export default function App() {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      {!isConnected && (
        <View style={{ padding: 10, backgroundColor: "#ffcccc" }}>
          <Text style={{ color: "red", fontWeight: "bold" }}>
            No network connection. Some features may not work.
          </Text>
        </View>
      )}

      {/* Wrap your platform navigator inside a Stack */}
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Platform.OS === "ios" ? IOSNavigator : AndroidNavigator}
          options={{ headerShown: false }}
        />

        {/* Your new detail screen */}
        <Stack.Screen
          name="FilmDetail"
          component={FilmDetailScreen}
          options={{ title: "Film Details" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
