import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../../constants";
import HomeClient from "../../../components/Home.client";
import AccountClient from "../../../components/Account.client";
import { useAuth } from "../../context/AuthContext";
import ItinerairesResults from "./ItinerairesResults";
import DetailItineraireScreen from "./DetailsItinerairesResults";
import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="HomeClient"
      component={HomeClient}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="ItinerairesResults"
      component={ItinerairesResults}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="DetailsItineraireScreen"
      component={DetailItineraireScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const BottomTabNavigation = () => {
  const { onLogout } = useAuth();

  const handleLogout = () => {
    onLogout(); 
    if (navigationRef.isReady()) {
      navigationRef.navigate("Login");
    }
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: true,
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          right: 0,
          left: 0,
          elevation: 0,
          height: 70,
          backgroundColor: COLORS.gray,
        },
      }}
    >
      <Tab.Screen
        name="Accueil"
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={24}
              color={focused ? COLORS.bgBlue : COLORS.gray2}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? COLORS.bgBlue : COLORS.gray2 }}>
              Accueil
            </Text>
          ),
        }}
      />

      <Tab.Screen
        name="Mon Compte"
        component={AccountClient}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={24}
              color={focused ? COLORS.bgBlue : COLORS.gray2}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? COLORS.bgBlue : COLORS.gray2 }}>
              Mon Compte
            </Text>
          ),
        }}
      />

      <Tab.Screen
        name="Quitter"
        component={HomeClient}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="log-out"
              size={24}
              color={focused ? COLORS.primary : COLORS.gray2}
            />
          ),
          tabBarButton: (props) => (
            <TouchableOpacity
              onPress={handleLogout}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons name="log-out" size={24} color={COLORS.gray2} />
              <Text style={{ fontSize: 12, color: COLORS.gray2 }}>Quitter</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
