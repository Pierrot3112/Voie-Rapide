import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import URL from "../util/api.url";
import NetInfo from '@react-native-community/netinfo';
import * as Permissions from 'expo';
import Toast from 'react-native-toast-message';

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
            Toast.show({
                type: 'error',
                text1: "Pas de connexion Internet",
                text2: "Veuillez vérifier votre connexion.",
                position: 'top',
            });
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
            Toast.show({
                type: 'info',
                text1: "Requête annulée",
                text2: "L'opération a été interrompue.",
                position: 'top',
            });
        } else if (error.response) {
            const status = error.response.status;
            const errorMessage = error.response.data?.detail || "Une erreur est survenue.";

            switch (status) {
                case 400:
                    Toast.show({
                        type: 'error',
                        text1: `Requête invalide : ${errorMessage}`,
                        position: 'top',
                    });
                    break;
                case 401:
                    Toast.show({
                        type: 'error',
                        text1: "Accès refusé",
                        text2: "Veuillez vous reconnecter.",
                        position: 'top',
                    });
                    break;
                case 403:
                    Toast.show({
                        type: 'error',
                        text1: "Accès interdit",
                        text2: "Vous n'avez pas les permissions nécessaires.",
                        position: 'top',
                    });
                    break;
                case 404:
                    Toast.show({
                        type: 'error',
                        text1: "Non trouvé",
                        text2: "La ressource demandée est introuvable.",
                        position: 'top',
                    });
                    break;
                case 500:
                    Toast.show({
                        type: 'error',
                        text1: "Erreur serveur",
                        text2: "Une erreur interne est survenue. Réessayez plus tard.",
                        position: 'top',
                    });
                    break;
                default:
                    Toast.show({
                        type: 'error',
                        text1: `Erreur ${status} : ${errorMessage}`,
                        position: 'top',
                    });
                    break;
            }
        } else {
            Toast.show({
                type: 'error',
                text1: "Problème de connexion",
                text2: "Veuillez vérifier votre connexion Internet.",
                position: 'top',
            });
        }

        return Promise.reject(error);
    }
);

export default api;
