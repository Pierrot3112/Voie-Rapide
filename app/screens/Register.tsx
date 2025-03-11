import { useState } from 'react';
import { TextInput, TouchableOpacity, SafeAreaView, ImageBackground, Text, ActivityIndicator, Modal, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import styles from '../../styles/Login.style';
import useNetworkStatus from '../../components/NetworkStatus/NetworkStatus';
import Toast from 'react-native-toast-message';
import Condition from '../../components/Modal';

const Register = () => {
    const [nom, setNom] = useState('');
    const [num_tel, setNumTel] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [secureText, setSecureText] = useState(true);
    const [secureTextConfirm, setSecureTextConfirm] = useState(true);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();
    const isOnline = useNetworkStatus();
    const { onRegister } = useAuth();

    const malagasyPhoneRegex = /^(?:\+261|0)(32|33|34|38|39)\d{7}$/;

    const handleRegister = async () => {
        if (!isOnline) {
            Toast.show({ type: 'error', text1: 'Pas de connexion', text2: 'Veuillez vérifier votre connexion internet.' });
            return;
        }

        if (!malagasyPhoneRegex.test(num_tel)) {
            Toast.show({ type: 'error', text1: 'Numéro invalide', text2: 'Ex: 0341234567 ou +261341234567' });
            return;
        }

        if (password !== confirmPassword) {
            Toast.show({ type: 'error', text1: 'Erreur', text2: 'Les mots de passe ne correspondent pas.' });
            return;
        }

        setLoading(true);
        const result = await onRegister(nom, num_tel, password);
        setLoading(false);

        if (result?.error) {
            Toast.show({ type: 'error', text1: 'Erreur', text2: result.msg });
        } else {
            Toast.show({ type: 'success', text1: 'Inscription réussie', text2: 'Bienvenue ! Vous pouvez maintenant vous connecter.' });
            navigation.navigate("Login");
        }
    };

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <ImageBackground source={require('../../assets/images/city.jpg')} style={styles.head}>
                    <View style={styles.headContent}></View>
                </ImageBackground>
                <View style={styles.form}>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Votre nom*"
                        onChangeText={setNom}
                        value={nom}
                    />
                    <TextInput
                        style={styles.inputText}
                        placeholder="Numéro de téléphone *"
                        onChangeText={setNumTel}
                        value={num_tel}
                        keyboardType="phone-pad"
                    />
                    <View style={styles.inputPassword}>
                        <TextInput
                            style={styles.input}
                            placeholder="Mot de passe"
                            secureTextEntry={secureText}
                            onChangeText={setPassword}
                            value={password}
                        />
                        <TouchableOpacity onPress={() => setSecureText(!secureText)}>
                            <Ionicons name={secureText ? "eye-outline" : "eye-off-outline"} size={24} color="gray" style={styles.icon} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.inputPassword}>
                        <TextInput
                            style={styles.input}
                            placeholder="Confirmer le mot de passe"
                            secureTextEntry={secureTextConfirm}
                            onChangeText={setConfirmPassword}
                            value={confirmPassword}
                        />
                        <TouchableOpacity onPress={() => setSecureTextConfirm(!secureTextConfirm)}>
                            <Ionicons name={secureTextConfirm ? "eye-outline" : "eye-off-outline"} size={24} color="gray" style={styles.icon} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.btnSubmit} onPress={handleRegister} disabled={loading}>
                        <Text style={styles.btnSubmitText}>S'inscrire</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                        <Text style={{ textAlign: 'center', marginTop: 10 }}>Se connecter si vous avez déjà un compte</Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => setAcceptTerms(!acceptTerms)}>
                            <Ionicons name={acceptTerms ? "checkbox-outline" : "square-outline"} size={24} color="gray" />
                        </TouchableOpacity>
                        <Text style={{ marginLeft: 10 }}>
                            J'accepte les <Text style={{ color: 'blue' }} onPress={() => setModalVisible(true)}>conditions d'utilisation</Text>
                        </Text>
                    </View>
                    {loading && <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 10 }} />}
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <View style={styles.modal}>
                            <View style={styles.headModal}>
                                <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.btnQuitModal}>
                                    <Text style={{ color: 'red' }}>x</Text>
                                </TouchableOpacity>
                                <Condition />
                            </View>
                        </View>
                    </Modal>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Register;