import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import URL from "../util/api.url";
import NetInfo from '@react-native-community/netinfo';
import * as Permissions from 'expo'; // Vérifiez si c'est toujours nécessaire
import { Alert } from "react-native";

const api = axios.create({
    baseURL: URL,
    headers: { "Content-Type": "application/json" },
});

const checkInternetConnection = async () => {
    const state = await NetInfo.fetch();
    return state.isConnected;
};

api.interceptors.request.use(
    async (config) => {
        const isConnected = await checkInternetConnection();
        if (!isConnected) {
            Alert.alert("Pas de connexion Internet. Veuillez vérifier votre connexion.");
            throw new axios.Cancel('No internet connection');
        }

        try {
            const token = await AsyncStorage.getItem("token"); 
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (error) {
            console.error("Erreur lors de la récupération du token", error);
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (axios.isCancel(error)) {
            Alert.alert("Requête annulée : L'opération a été interrompue.");
        } else if (error.response) {
            const status = error.response.status;
            const errorMessage = error.response.data?.detail || "Une erreur est survenue.";

            switch (status) {
                case 400:
                    Alert.alert(`Requête invalide : ${errorMessage}`);
                    break;
                case 401:
                    Alert.alert("Accès refusé : Votre session a expiré, veuillez vous reconnecter.");
                    break;
                case 403:
                    Alert.alert("Accès interdit : Vous n'avez pas les permissions nécessaires.");
                    break;
                case 404:
                    Alert.alert("Non trouvé : La ressource demandée est introuvable.");
                    break;
                case 500:
                    Alert.alert("Erreur serveur : Une erreur interne est survenue. Réessayez plus tard.");
                    break;
                default:
                    Alert.alert(`Erreur ${status} : ${errorMessage}`);
                    break;
            }
        } else {
            Alert.alert("Problème de connexion : Veuillez vérifier votre connexion Internet.");
        }

        return Promise.reject(error);
    }
);

export default api;
