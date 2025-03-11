// RoleBasedRedirect.tsx
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext'; // Assurez-vous que le chemin est correct
import { ActivityIndicator, View } from 'react-native';

const Home = () => {
    const { authState, getRole } = useAuth();
    const navigation = useNavigation();

    useEffect(() => {
        const checkRoleAndRedirect = async () => {
            if (authState.token) {
                try {
                    const role = await getRole(authState.token);
                    if (role === 'client') {
                        navigation.navigate('HomeClient'); // Redirige vers le tableau de bord admin
                    } else {
                        navigation.navigate('HomeUser'); // Redirige vers le tableau de bord utilisateur
                    } 
                } catch (error) {
                    console.error("❌ Erreur lors de la récupération du rôle :", error);
                    navigation.navigate('Login'); // Redirige vers la page de connexion en cas d'erreur
                }
            } else {
                navigation.navigate('Login'); // Redirige vers la page de connexion si aucun token n'est trouvé
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