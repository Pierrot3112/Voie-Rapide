import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../config/AxioConfig";
import Toast from "react-native-toast-message";
import { navigationRef } from "../navigation/client/BottomNavigation";


const TOKEN_KEY = "token";

interface AuthState {
    token: string | null;
    authenticated: boolean;
}

interface AuthContextProps {
    authState: AuthState;
    onLogin: (num_tel: string, password: string) => Promise<{ error?: boolean; msg?: string }>;
    onRegister: (nom: string, num_tel: string, password: string) => Promise<{ error?: boolean; msg?: string }>;
    onLogout: () => void;
    checkToken: () => Promise<string | null>;
    getRole: (token: string) => Promise<string>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth doit être utilisé dans un AuthProvider");
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [authState, setAuthState] = useState<AuthState>({ token: null, authenticated: false });

    useEffect(() => {
        const loadToken = async () => {
            try {
                const token = await checkToken();
                setAuthState({ token, authenticated: !!token });
            } catch {
                setAuthState({ token: null, authenticated: false });
            }
        };
        loadToken();
    }, []);

    const login = async (num_tel: string, password: string) => {
        try {
            const response = await api.post("/token", { num_tel, password });
            const token = response.data.access_token;

            await AsyncStorage.setItem(TOKEN_KEY, token);
            setAuthState({ token, authenticated: true });

            Toast.show({ type: "success", text1: "Connexion réussie", position: "top" });
            return { error: false, msg: "Connexion réussie" };
        } catch (error: any) {
            return { error: true, msg: error.response?.data?.msg || "Échec de la connexion" };
        }
    };

    const register = async (nom: string, num_tel: string, password: string) => {
        try {
            const response = await api.post("/signup", { nom, num_tel, password });
            Toast.show({ type: "success", text1: "Inscription réussie", position: "top" });
            return { error: false, msg: "Inscription réussie" };
        } catch (error: any) {
            let errorMessage = "Échec de l'inscription";
            if (error.response) {
                if (error.response.status === 400) {
                    errorMessage = "Données invalides. Vérifiez votre saisie.";
                } else if (error.response.status === 409) {
                    errorMessage = "Numéro de téléphone déjà utilisé.";
                } else if (error.response.data && error.response.data.msg) {
                    errorMessage = error.response.data.msg;
                }
            } else {
                errorMessage = "Erreur inconnue. Veuillez réessayer plus tard.";
            }
            Toast.show({ type: "error", text1: errorMessage, position: "top" });
            return { error: true, msg: errorMessage };
        }
    };
    
    

    const logout = async () => {
        await AsyncStorage.removeItem(TOKEN_KEY);
        setAuthState({ token: null, authenticated: false });
        Toast.show({ type: "info", text1: "Déconnexion réussie", position: "top" });

        if (navigationRef.isReady()) {
            navigationRef.navigate("Login");
        }
    };

    return (
        <AuthContext.Provider value={{ authState, onLogin: login, onRegister: register, onLogout: logout, checkToken, getRole }}>
            {children}
        </AuthContext.Provider>
    );
};

export const checkToken = async (): Promise<string | null> => {
    try {
        return await AsyncStorage.getItem(TOKEN_KEY);
    } catch {
        return null;
    }
};

export const getRole = async (token: string): Promise<string> => {
    try {
        const response = await api.get("/me", { headers: { Authorization: `Bearer ${token}` } });
        return response.data.role;
    } catch {
        return "user";
    }
};
