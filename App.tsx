import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { View, Button, ActivityIndicator } from 'react-native';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { AuthProvider, useAuth } from './app/context/AuthContext';
import Home from './app/screens/Home';
import Login from './app/screens/Login';
import Register from './app/screens/Register';
import Splash from './app/screens/Splash';
import HomeClient from './app/screens/HomeClient';
import ItinerairesResults from './app/navigation/client/ItinerairesResults';
import DetailsItinerairesResults from './app/navigation/client/DetailsItinerairesResults';
import ValidCodeOtp from './app/screens/ValidCodeOtp';
import ForgotPassword from './app/screens/ForgotPassword';
import Toast from 'react-native-toast-message'; // Importez Toast
import * as Permissions from 'expo';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <AuthProvider>
            <Layout />
        </AuthProvider>
    );
}

export const Layout = () => {
    const { authState, onLogout } = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000); // Simule un chargement de 2 secondes
    }, []);

    // Définir un thème personnalisé (optionnel)
    const theme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            primary: '#6200ee', // Couleur principale
            accent: '#03dac4',  // Couleur d'accent
        },
    };

    return (
        <PaperProvider theme={theme}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Splash">
                    <Stack.Screen options={{ headerShown: false }} name="Splash" component={Splash} />
                    <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
                    <Stack.Screen options={{ headerShown: false }} name="ForgotPassWord" component={ForgotPassword} />
                    <Stack.Screen options={{ headerShown: false }} name="Register" component={Register} />
                    <Stack.Screen options={{ headerShown: false }} name="CodeOTP" component={ValidCodeOtp} />
                    <Stack.Screen options={{ headerShown: false }} name="HomeClient" component={HomeClient} />
                    <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
                    <Stack.Screen name="ItinerairesResults" component={ItinerairesResults} options={{ headerShown: false }} />
                    <Stack.Screen name="DetailsItinerairesResults" component={DetailsItinerairesResults} options={{ headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
            <Toast /> {/* Ajoutez Toast ici */}
        </PaperProvider>
    );
};