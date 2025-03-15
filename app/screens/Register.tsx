import { useState } from 'react';
import { TextInput, TouchableOpacity, ImageBackground, Text, ActivityIndicator, Modal, View, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import styles from '../../styles/register.style';
import useNetworkStatus from '../../components/NetworkStatus/NetworkStatus';
import Toast from 'react-native-toast-message';
import Condition from '../../components/Modal';
import PullToRefresh from '../../components/PullToRefresh';
import { ScrollView } from 'react-native';

const Register = () => {
    const [nom, setNom] = useState('');
    const [num_tel, setNumTel] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [showCheckboxError, setShowCheckboxError] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [secureText, setSecureText] = useState(true);
    const [secureTextConfirm, setSecureTextConfirm] = useState(true);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();
    const isOnline = useNetworkStatus();
    const { onRegister } = useAuth();

    const malagasyPhoneRegex = /^(?:\+261|0)(32|33|34|38|39)\d{7}$/;

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            Alert.alert('Erreur', "Les mots de passe ne correspondent pas");
            return;
        }

        if (!malagasyPhoneRegex.test(num_tel)) {
            Alert.alert('Erreur', "Numéro de téléphone invalide");
            return;
        }

        if (!acceptTerms) {
            setShowCheckboxError(true);
            setTimeout(() => setShowCheckboxError(false), 1000);
            return;
        }

        setLoading(true);

        try {
            const response = await onRegister(nom, num_tel, password);
            if (response.error) {
                Alert.alert('Erreur', response.msg);
            } else {
                console.log(response.msg);
                Toast.show({
                    type: 'success',
                    text1: response.msg,
                });

                navigation.navigate('CodeOTP', { phoneNumber: num_tel });
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: "Erreur lors de l'inscription",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleRefresh = async () => {
        setNom('');
        setNumTel('');
        setPassword('');
        setConfirmPassword('');
        setAcceptTerms(false)
    };

    return (
        <PullToRefresh onRefresh={handleRefresh}>
            <ScrollView>
                <View style={styles.container}>
                    <ImageBackground source={require('../../assets/images/city.jpg')} style={styles.head}>
                        <View style={styles.headContent} />
                    </ImageBackground>
                    <View style={[styles.form, { gap: 20 }]}>
                        <View style={styles.loginTitle}>
                            <Text style={styles.textLog1}>Salut!!!</Text>
                            <Text style={styles.textLog2}>Inscription</Text>
                            <ImageBackground source={require('../../assets/images/logoVoieRapide.png')} style={styles.logo} />
                        </View>
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
                                <Ionicons 
                                    name={acceptTerms ? "checkbox-outline" : "square-outline"} 
                                    size={24} 
                                    color={showCheckboxError ? "red" : "gray"} 
                                />
                            </TouchableOpacity>
                            <Text style={{ marginLeft: 10 }}>
                                J'accepte les <Text style={{ color: 'blue' }} onPress={() => setModalVisible(true)}>conditions d'utilisation</Text>
                            </Text>
                        </View>
                        {showCheckboxError && (
                            <Text style={{ color: 'red', marginTop: 5 }}>
                                Vous devez accepter les conditions d'utilisation
                            </Text>
                        )}
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
            </ScrollView>
        </PullToRefresh>
    );
};

export default Register;
