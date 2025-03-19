import { useState, useCallback } from 'react';
import { View, TextInput, TouchableOpacity, ImageBackground, Text, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from "@react-navigation/native";
import styles from '../../styles/Login.style';
import useNetworkStatus from '../../components/NetworkStatus/NetworkStatus';
import PullToRefresh from '../../components/PullToRefresh';
import { COLORS } from '../../constants';
import Toast from 'react-native-toast-message';

const Login = () => {
    const [num_tel, setNumTel] = useState('');
    const [password, setPassword] = useState('');
    const [secureText, setSecureText] = useState(true);
    const [loading, setLoading] = useState(false);
    
    const { onLogin } = useAuth();
    const navigation = useNavigation();
    const isOnline = useNetworkStatus();

    const togglePasswordVisibility = () => setSecureText(prev => !prev);

    const login = useCallback(async () => {
        if (loading || !num_tel.trim() || !password.trim()) {
            Toast.show({
                type: 'error',
                text1: 'Champs obligatoires',
                text2: 'Tous les champs sont obligatoires. Veuillez réessayer.',
                visibilityTime: 3000,
                autoHide: true,
            });
            return;
        }

        setLoading(true);
        const result = await onLogin(num_tel.trim(), password.trim());
        setLoading(false);

        if (!result?.error) {
            navigation.navigate("Home");
        }
    }, [num_tel, password, loading, onLogin, navigation]);

    const handleRefresh = useCallback(() => {
        setNumTel('');
        setPassword('');
    }, []);

    return (
        <PullToRefresh onRefresh={handleRefresh}>
            <View style={styles.container}>
                <ImageBackground source={require('../../assets/images/city.jpg')} style={styles.head}>
                    <View style={styles.headContent} />
                </ImageBackground>
                <View style={styles.formLogin}>
                    <View style={styles.loginTitle}>
                        <Text style={styles.textLog2}>Authentification</Text>
                    </View>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Numéro de téléphone"
                        onChangeText={setNumTel}
                        value={num_tel}
                        keyboardType="phone-pad"
                        autoCapitalize="none"
                    />
                    <View style={styles.inputPassword}>
                        <TextInput
                            style={{ flex: 1, borderColor: COLORS.bgBlue }}
                            placeholder="Mot de passe"
                            secureTextEntry={secureText}
                            onChangeText={setPassword}
                            value={password}
                            autoCapitalize="none"
                        />
                        <TouchableOpacity onPress={togglePasswordVisibility}>
                            <Ionicons name={secureText ? "eye-outline" : "eye-off-outline"} size={24} color="gray" style={styles.icon} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.btnSubmit} onPress={login} disabled={loading}>
                        {loading ? <ActivityIndicator size="small" color="#ffffff" /> : <Text style={styles.btnSubmitText}>Se Connecter</Text>}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('ForgotPassWord')} disabled={loading}>
                        <Text style={styles.forgotPassword}>Mot de passe oublié</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Register")} style={[styles.btnSubmit, { backgroundColor: '#fb8500', borderWidth: 0 }]}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Créer un compte</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </PullToRefresh>
    );
};

export default Login;
