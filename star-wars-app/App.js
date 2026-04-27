import React, { useState, useEffect } from "react";
import { Platform, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import NetInfo from "@react-native-community/netinfo";

import PlanetsScreen from "./screens/PlanetsScreen";
import FilmsScreen from "./screens/FilmsScreen";
import SpaceshipsScreen from "./screens/SpaceshipsScreen";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

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

      {Platform.OS === "ios" ? <IOSNavigator /> : <AndroidNavigator />}
    </NavigationContainer>
  );
}
