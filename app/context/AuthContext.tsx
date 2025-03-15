import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from "../../config/AxioConfig";

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
                if (token) {
                    setAuthState({ token, authenticated: true});
                } else {
                    setAuthState({ token: null, authenticated: false });
                }
            } catch (error) {
                console.error("❌ Erreur lors du chargement du token :", error);
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

            return { error: false, msg: "Connexion réussie" };
        } catch (error: any) {
            return { error: true, msg: error.response?.data?.msg || "Échec de la connexion" };
        }
    };

    const register = async (nom: string, num_tel: string, password: string ) => {
        try {
            const response = await api.post("/signup", { nom, num_tel, password });
    
            return { error: false, msg: "Inscription réussie" };

        } catch (error: any) {
            console.error("❌ Erreur API:", error.response?.data);
            return { error: true, msg: error.response?.data?.msg || "Échec de l'inscription" };
        }
    };

    const logout = async () => {
        await AsyncStorage.removeItem(TOKEN_KEY);
        setAuthState({ token: null, authenticated: false });
    };



    return (
        <AuthContext.Provider
            value={{
                authState,
                onLogin: login,
                onRegister: register,
                onLogout: logout,
                checkToken,
                getRole
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const checkToken = async (): Promise<string | null> => {
    try {
        return await AsyncStorage.getItem(TOKEN_KEY);
    } catch (error) {
        console.error("❌ Erreur lors de la vérification du token :", error);
        return null;
    }
};

export const getRole = async (token: string): Promise<string> => {
    try {
        const response = await api.get("/me", {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data.role;
    } catch (error) {
        console.error("❌ Erreur lors de la récupération du rôle :", error);
        return 'user';
    }
};