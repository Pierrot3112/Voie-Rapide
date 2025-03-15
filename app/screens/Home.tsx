// RoleBasedRedirect.tsx
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext'; // Assurez-vous que le chemin est correct
import { ActivityIndicator, Alert, View } from 'react-native';
import Toast from 'react-native-toast-message';

const Home = () => {
    const { authState, getRole } = useAuth();
    const navigation = useNavigation();

    useEffect(() => {
        const checkRoleAndRedirect = async () => {
            if (authState.token) {
                try {
                    const role = await getRole(authState.token);
                    if (role === 'client') {
                        navigation.navigate('HomeClient'); 
                    } else {
                        Toast.show({
                            type: "error",
                            text1: "Erreur d'authentification",
                            text2: "Votre compte n\'est pas un client. Réessayez à nouveau.",
                        });
                        navigation.navigate('Login'); 
                    } 
                } catch (error) {
                    navigation.navigate('Login'); 
                }
            } else {
                navigation.navigate('Login'); 
            }
        };

        checkRoleAndRedirect();
    }, [authState.token, getRole, navigation]);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    );
};

export default Home;