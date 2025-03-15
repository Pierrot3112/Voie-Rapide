import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import api from 'config/AxioConfig';
import { TextInput } from 'react-native-paper';

const ForgotPassword = () => {
    const [num_tel, setNumTel] = useState('');
    const [reset_code, setResetCode] = useState('');
    const [isValidPhone, setIsValidPhone] = useState(false);
    const [codeSent, setCodeSent] = useState(false);
    const [new_password, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigation = useNavigation();

    const malagasyPhoneRegex = /^(?:\+261|0)(32|33|34|38|39)\d{7}$/;

    const validatePhoneNumber = (phoneNumber: string) => {
        setIsValidPhone(malagasyPhoneRegex.test(phoneNumber));
    };

    const handlePhoneNumberChange = (text: string) => {
        setNumTel(text);
        validatePhoneNumber(text);
    };

    // Envoi du code de réinitialisation
    const handleSendCode = async () => {
        try {
            const data = { num_tel };
            const response = await api.post('/forgot-password', data);
            if (response.status === 200) {
                Alert.alert('Succès', 'Code envoyé avec succès');
                setCodeSent(true);
            } else if (response.status === 429) {
                Alert.alert('Erreur', 'Veuillez attendre queleque minutes (5 minute minimum) avant de redemander');
            } else {
                Alert.alert('Erreur', 'Erreur lors de l\'envoi du code');
            }
        } catch (error: any) {
            Alert.alert('Erreur', error.response?.data?.msg || error.message);
        }
    };

    // Réinitialisation du mot de passe
    const handleResetPassword = async () => {
        if (new_password !== confirmPassword || new_password.length < 6) {
            Alert.alert("Erreur", "Les mots de passe ne correspondent pas ou sont trop courts");
            return;
        }

        try {
            const response = await api.post('/reset-password', { num_tel, reset_code, new_password });
            if (response.status === 200) {
                Alert.alert("Succès", "Mot de passe modifié avec succès");
            } else {
                Alert.alert("Erreur", "Erreur lors de la réinitialisation du mot de passe");
            }
        } catch (error: any) {
            Alert.alert("Erreur", error.response?.data?.msg || error.message);
        }
    };

    return (
        <SafeAreaView style={{ paddingTop: 25, paddingHorizontal: 20 }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name='arrow-back' size={30} />
            </TouchableOpacity>
            <View>
                <Text style={{ fontSize: 24, fontWeight: 'bold', marginVertical: 10 }}>
                    Mot de passe oublié
                </Text>
                {!codeSent ? (
                    <>
                        <Text>
                            Veuillez saisir votre numéro de téléphone pour réinitialiser votre mot de passe
                        </Text>
                        <TextInput
                            placeholder='Votre numéro de téléphone'
                            value={num_tel}
                            onChangeText={handlePhoneNumberChange}
                            keyboardType='phone-pad'
                            style={{ marginTop: 15 }}
                        />
                        <TouchableOpacity
                            style={{
                                backgroundColor: isValidPhone ? '#007BFF' : '#CCCCCC',
                                padding: 10,
                                borderRadius: 5,
                                marginTop: 20,
                                alignItems: 'center',
                            }}
                            disabled={!isValidPhone}
                            onPress={handleSendCode}
                        >
                            <Text style={{ color: isValidPhone ? '#FFFFFF' : '#666666' }}>
                                Envoyer le code
                            </Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <>
                        <Text>
                            Veuillez entrer le code de vérification ainsi que votre nouveau mot de passe
                        </Text>
                        <TextInput
                            placeholder='Code de vérification'
                            value={reset_code}
                            onChangeText={setResetCode}
                            keyboardType='number-pad'
                            style={{ marginTop: 15 }}
                        />
                        <Text style={{ marginTop: 20 }}>Nouveau mot de passe</Text>
                        <TextInput
                            placeholder='Nouveau mot de passe'
                            value={new_password}
                            onChangeText={setNewPassword}
                            secureTextEntry
                            style={{ marginTop: 10 }}
                        />
                        <Text style={{ marginTop: 20 }}>Confirmer le mot de passe</Text>
                        <TextInput
                            placeholder='Confirmer le mot de passe'
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry
                            style={{ marginTop: 10 }}
                        />
                        <TouchableOpacity
                            style={{
                                backgroundColor: '#007BFF',
                                padding: 10,
                                borderRadius: 5,
                                marginTop: 20,
                                alignItems: 'center',
                            }}
                            onPress={handleResetPassword}
                        >
                            <Text style={{ color: '#FFFFFF' }}>Modifier le mot de passe</Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>
        </SafeAreaView>
    );
};

export default ForgotPassword;
