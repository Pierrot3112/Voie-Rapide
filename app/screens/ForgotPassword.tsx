import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, ActivityIndicator, Dimensions, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import api from '../../config/AxioConfig';
import { TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { COLORS, SIZES } from '../../constants';
import styles from 'styles/Login.style';

const { width, height } = Dimensions.get("window");

const ForgotPassword = () => {
    const [num_tel, setNumTel] = useState('');
    const [reset_code, setResetCode] = useState('');
    const [isValidPhone, setIsValidPhone] = useState(false);
    const [secureText, setSecureText] = useState(true);
    const [codeSent, setCodeSent] = useState(false);
    const [new_password, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const togglePasswordVisibility = () => setSecureText(!secureText);

    const malagasyPhoneRegex = /^(?:\+261|0)(32|33|34|38|39)\d{7}$/;

    const validatePhoneNumber = (phoneNumber) => {
        setIsValidPhone(malagasyPhoneRegex.test(phoneNumber));
    };

    const handlePhoneNumberChange = (text) => {
        setNumTel(text);
        validatePhoneNumber(text);
    };

    const handleSendCode = async () => {
        setLoading(true);
        try {
            const response = await api.post('/forgot-password', { num_tel });
            if (response.status === 200) {
                Toast.show({ type: 'success', text1: 'Code envoyé avec succès' });
                setCodeSent(true);
            } else {
                Toast.show({ type: 'error', text1: 'Erreur lors de l\'envoi du code' });
            }
        } catch (error) {
            Toast.show({ type: 'error', text1: error.response?.data?.msg || 'Une erreur est survenue' });
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async () => {
        if (new_password !== confirmPassword || new_password.length < 6) {
            Toast.show({ type: 'error', text1: 'Les mots de passe ne correspondent pas ou sont trop courts' });
            return;
        }

        setLoading(true);
        try {
            const response = await api.post('/reset-password', { num_tel, reset_code, new_password });
            if (response.status === 200) {
                Toast.show({ type: 'success', text1: 'Mot de passe modifié avec succès' });
                navigation.navigate('Login');
            } else {
                Toast.show({ type: 'error', text1: 'Erreur lors de la réinitialisation du mot de passe' });
            }
        } catch (error) {
            Toast.show({ type: 'error', text1: error.response?.data?.msg || 'Une erreur est survenue' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: width * 0.05, paddingTop: height * 0.02 }}>
                    
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{marginTop: 10}}>
                        <Ionicons name='arrow-back' size={30} />
                    </TouchableOpacity>

                    <View style={{ marginTop: height * 0.02 }}>
                        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: height * 0.02 }}>Mot de passe oublié</Text>

                        {!codeSent ? (
                            <>
                                <Text>Veuillez saisir votre numéro de téléphone</Text>
                                <TextInput
                                    placeholder='Votre numéro de téléphone'
                                    value={num_tel}
                                    onChangeText={handlePhoneNumberChange}
                                    keyboardType='phone-pad'
                                    style={{
                                        marginTop: height * 0.03,
                                        height: height * 0.06,
                                        width: '100%',
                                        borderWidth: 1,
                                        borderColor: COLORS.bgBlue,
                                        borderRadius: 5,
                                        backgroundColor: 'transparent'
                                    }}
                                />

                                <TouchableOpacity
                                    style={{
                                        backgroundColor: isValidPhone ? COLORS.bgBlue : '#CCCCCC',
                                        padding: height * 0.02,
                                        borderRadius: 5,
                                        marginTop: height * 0.02,
                                        alignItems: 'center'
                                    }}
                                    disabled={!isValidPhone || loading}
                                    onPress={handleSendCode}
                                >
                                    {loading ? <ActivityIndicator color="#FFFFFF" /> : <Text style={{ color: '#FFFFFF' }}>Envoyer le code</Text>}
                                </TouchableOpacity>
                            </>
                        ) : (
                            <>
                                <Text>Entrez le code de vérification et votre nouveau mot de passe</Text>

                                <TextInput
                                    placeholder='Code de vérification'
                                    value={reset_code}
                                    onChangeText={setResetCode}
                                    keyboardType='number-pad'
                                    style={{
                                        marginTop: height * 0.02,
                                        height: height * 0.06,
                                        borderWidth: 1,
                                        borderColor: COLORS.bgBlue,
                                        borderRadius: 5,
                                        backgroundColor: 'transparent'
                                    }}
                                />

                                {[{ placeholder: 'Nouveau mot de passe', value: new_password, setValue: setNewPassword },
                                  { placeholder: 'Confirmer le mot de passe', value: confirmPassword, setValue: setConfirmPassword }].map((item, index) => (
                                    <View key={index} style={[styles.inputPassword, { padding: 5, marginTop: height * 0.02 }]}>
                                        <TextInput
                                            style={{
                                                width: '90%',
                                                borderWidth: 0,
                                                height: height * 0.06,
                                                backgroundColor: 'transparent'
                                            }}
                                            placeholder={item.placeholder}
                                            value={item.value}
                                            onChangeText={item.setValue}
                                            secureTextEntry={secureText}
                                        />
                                        <TouchableOpacity onPress={togglePasswordVisibility}>
                                            <Ionicons name={secureText ? "eye-outline" : "eye-off-outline"} size={24} style={styles.icon} />
                                        </TouchableOpacity>
                                    </View>
                                ))}

                                <TouchableOpacity
                                    style={{
                                        backgroundColor: COLORS.bgBlue,
                                        padding: height * 0.02,
                                        borderRadius: 5,
                                        marginTop: height * 0.03,
                                        alignItems: 'center'
                                    }}
                                    onPress={handleResetPassword}
                                    disabled={loading}
                                >
                                    {loading ? <ActivityIndicator color="#FFFFFF" /> : <Text style={{ color: '#FFFFFF' }}>Modifier le mot de passe</Text>}
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            <Toast />
        </SafeAreaView>
    );
};

export default ForgotPassword;
