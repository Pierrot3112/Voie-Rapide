import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import URL from "../util/api.url";
import NetInfo from "@react-native-community/netinfo";
import Toast from "react-native-toast-message";
import { navigationRef } from "../app/navigation/client/BottomNavigation";

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
                type: "info",
                text1: "Pas de connexion Internet",
                text2: "Veuillez vérifier votre connexion.",
                position: "top",
            });
            return Promise.reject("Pas de connexion Internet");
        }

        try {
            const token = await AsyncStorage.getItem("token");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            } else if (navigationRef.isReady()) {
                navigationRef.navigate("Login");
            }
        } catch (error) {
            if (navigationRef.isReady()) {
                navigationRef.navigate("Login");
            }
        }

        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (!error.response) {
            Toast.show({
                type: "error",
                text1: "Erreur de connexion",
                text2: "Vérifiez votre connexion Internet.",
                position: "top",
            });
            return Promise.reject(error);
        }

        const { status, data } = error.response;
        let errorMessage = data?.detail || "Une erreur est survenue.";

        switch (status) {
            case 400:
                Toast.show({ type: "error", text1: `Requête invalide : ${errorMessage}`, position: "top" });
                break;
            case 401:
                if (errorMessage === 'Une erreur interne est survenue') {
                    Toast.show({ type: "error", text1: 'Numéro ou mot de passe incorrect', text2: "Veuillez réessayer.", position: "top" });
                } else {
                    Toast.show({ type: "error", text1: 'Accès non autorisé', text2: "Veuillez réessayer.", position: "top" });
                }
                if (navigationRef.isReady()) navigationRef.navigate("Login");
                break;
            case 403:
                Toast.show({ type: "error", text1: "Accès interdit", text2: "Permissions insuffisantes.", position: "top" });
                break;
            case 404:
                Toast.show({ type: "error", text1: "Ressource introuvable", position: "top" });
                break;
            case 500:
                Toast.show({ type: "error", text1: "Erreur serveur", text2: "Réessayez plus tard.", position: "top" });
                break;
            default:
                Toast.show({ type: "error", text1: `Erreur ${status} : ${errorMessage}`, position: "top" });
                break;
        }

        return Promise.reject(error);
    }
);

export default api;