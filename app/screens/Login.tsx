import { useState } from 'react';
import { View, TextInput, TouchableOpacity, ImageBackground, Text, Alert, ActivityIndicator } from 'react-native';
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
    const [isLogin, setIsLogin] = useState(false);

    const togglePasswordVisibility = () => setSecureText(!secureText);

    const login = async () => {
        if (isLogin) return

        setIsLogin(true);
        if (!num_tel || !password) {
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
        const result = await onLogin(num_tel, password);
        setLoading(false);

        if (!result?.error) {
            navigation.navigate("Home"); 
        }
    };

    const handleRefresh = async () => {
        if (isLogin) {
            setIsLogin(false);
        }
        setNumTel('');
        setPassword('');
    };

    return (
        <PullToRefresh onRefresh={handleRefresh}>
            <View style={styles.container}>
                <ImageBackground source={require('../../assets/images/city.jpg')} style={styles.head}>
                    <View style={styles.headContent}></View>
                </ImageBackground>
                <View style={styles.formLogin}>
                    <View style={styles.loginTitle}>
                        <Text style={styles.textLog1}>Bienvenue!!!</Text>
                        <Text style={styles.textLog2}>Authentification</Text>
                        <ImageBackground source={require('../../assets/images/logoVoieRapide.png')} style={styles.logo} />
                    </View>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Numéro de téléphone"
                        onChangeText={setNumTel}
                        value={num_tel}
                        keyboardType="phone-pad"
                    />
                    <View style={styles.inputPassword}>
                        <TextInput
                            style={{padding: 0,margin: 0, paddingHorizontal: 0, borderColor: COLORS.bgBlue}}
                            placeholder="Mot de passe"
                            secureTextEntry={secureText}
                            onChangeText={setPassword}
                            value={password}
                        />
                        <TouchableOpacity onPress={togglePasswordVisibility}>
                            <Ionicons name={secureText ? "eye-outline" : "eye-off-outline"} size={24} color="gray" style={styles.icon} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('ForgotPassWord')} disabled={loading}>
                        <Text style={styles.forgotPassword}>Mot de passe oublié</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnSubmit} onPress={login} disabled={loading}>
                        <Text style={styles.btnSubmitText}>Se Connecter</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Register")} style={[styles.btnSubmit, {backgroundColor: 'transparent', borderWidth: 1, }]}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Créer un compte</Text>
                    </TouchableOpacity>
                    {loading && <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 10 }} />}
                </View>
            </View>
        </PullToRefresh>
    );
};

export default Login;
