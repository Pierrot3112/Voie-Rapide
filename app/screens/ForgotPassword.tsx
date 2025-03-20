import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, ActivityIndicator, Dimensions, KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import api from '../../config/AxioConfig';
import { TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { COLORS } from '../../constants';

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

    const handlePhoneNumberChange = (text) => {
        setNumTel(text);
        setIsValidPhone(malagasyPhoneRegex.test(text));
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
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.flexContainer}
                keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
            >
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Ionicons name='arrow-back' size={30} color={COLORS.primary} />
                    </TouchableOpacity>
                    <View style={styles.contentContainer}>
                        <Text style={styles.title}>Mot de passe oublié</Text>
                        {!codeSent ? (
                            <>
                                <Text style={styles.label}>Veuillez saisir votre numéro de téléphone</Text>
                                <TextInput
                                    placeholder='Votre numéro de téléphone'
                                    placeholderTextColor={COLORS.primary}
                                    value={num_tel}
                                    onChangeText={handlePhoneNumberChange}
                                    keyboardType='phone-pad'
                                    style={[styles.input, { backgroundColor: 'transparent', fontWeight: 'bold', color: COLORS.primary, textAlign: 'center'}]}
                                />
                                <TouchableOpacity
                                    style={[styles.button, { backgroundColor: isValidPhone ? COLORS.secondary : COLORS.tertiary }]}
                                    disabled={!isValidPhone || loading}
                                    onPress={handleSendCode}
                                >
                                    {loading ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.buttonText}>Envoyer le code</Text>}
                                </TouchableOpacity>
                            </>
                        ) : (
                            <>
                                <Text style={styles.label}>Entrez le code de vérification et votre nouveau mot de passe</Text>
                                <TextInput
                                    placeholder='Code de vérification'
                                    placeholderTextColor={COLORS.primary}
                                    value={reset_code}
                                    onChangeText={setResetCode}
                                    keyboardType='number-pad'
                                    style={[styles.input, {backgroundColor: 'transparent'}]}
                                />
                                {[{ placeholder: 'Nouveau mot de passe', value: new_password, setValue: setNewPassword },
                                  { placeholder: 'Confirmer le mot de passe', value: confirmPassword, setValue: setConfirmPassword }].map((item, index) => (
                                    <View key={index} style={styles.passwordContainer}>
                                        <TextInput
                                            style={[styles.input, { backgroundColor: 'transparent', fontWeight: 'bold', color: COLORS.primary, textAlign: 'center', borderWidth: 0, marginTop: 0, flex: 7}]}
                                            placeholder={item.placeholder}                                   
                                            placeholderTextColor={COLORS.primary}
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
                                    style={[styles.button, { backgroundColor: COLORS.secondary }]}
                                    onPress={handleResetPassword}
                                    disabled={loading}
                                >
                                    {loading ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.buttonText}>Modifier le mot de passe</Text>}
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

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.bgBlue },
    flexContainer: { flex: 1 },
    scrollContainer: { flexGrow: 1, paddingHorizontal: width * 0.05, paddingTop: height * 0.02 },
    backButton: { marginTop: 20 },
    contentContainer: { marginTop: height * 0.02 },
    title: { color: COLORS.primary, fontSize: 24, fontWeight: 'bold', marginBottom: height * 0.02 },
    label: { color: COLORS.primary, textAlign: 'center' },
    input: { marginTop: height * 0.03, height: height * 0.06, width: '100%', borderWidth: 1, borderColor: COLORS.secondary, borderRadius: 5, textAlign: 'center', color: COLORS.primary, fontWeight: 'bold' },
    button: { padding: height * 0.02, borderRadius: 5, marginTop: height * 0.02, alignItems: 'center' },
    buttonText: { color: '#FFFFFF' },
    passwordContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: height * 0.03, height: height * 0.06, borderWidth: 1, borderColor: COLORS.secondary, borderRadius: 5, textAlign: 'center', color: COLORS.primary, fontWeight: 'bold' },
    icon: { padding: 10, flex: 1, color: COLORS.secondary }
});

export default ForgotPassword;
