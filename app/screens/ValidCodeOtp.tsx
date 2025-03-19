import React, { useState, useEffect } from 'react';
import { 
    StyleSheet, TextInput, TouchableOpacity, Text, View, 
    ActivityIndicator, SafeAreaView, Dimensions, KeyboardAvoidingView, Platform 
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../config/AxioConfig';
import { COLORS } from '../../constants';
import PullToRefresh from '../../components/PullToRefresh';

const { width, height } = Dimensions.get('window');

type RootStackParamList = {
  ValidCodeOtp: { phoneNumber: string };
};

const ValidCodeOtp = () => {
    const navigation = useNavigation();
    const route = useRoute<RouteProp<RootStackParamList, 'ValidCodeOtp'>>(); 
    const { phoneNumber } = route.params;

    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [resendDisabled, setResendDisabled] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        const checkResendTime = async () => {
            const lastResendTime = await AsyncStorage.getItem('lastResendTime');
            if (lastResendTime) {
                const now = Date.now();
                const timeElapsed = now - parseInt(lastResendTime, 10);

                if (timeElapsed < 5 * 60 * 1000) {
                    setResendDisabled(true);
                    setTimeLeft(Math.floor((5 * 60 * 1000 - timeElapsed) / 1000));
                }
            }
        };

        checkResendTime();
    }, []);

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        setResendDisabled(false);
                        clearInterval(timer);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [timeLeft]);

    const handleSubmitOtp = async () => { 
        setLoading(true);
        try {
            await api.post('/verify', { num_tel: phoneNumber, code: otp });
            Toast.show({ type: 'success', text1: 'Succès', text2: 'Votre compte a été validé!' });
            navigation.navigate('Login');
        } catch (error) {
            Toast.show({ type: 'error', text1: 'Code invalide', text2: 'Veuillez renvoyer le code!' });
        } finally {
            setLoading(false);
        }
    };

    const handleResendOtp = async () => {
        if (resendDisabled) return;

        setLoading(true);
        try {
            await api.post('/resend-code', { num_tel: phoneNumber });

            const now = Date.now();
            await AsyncStorage.setItem('lastResendTime', now.toString());

            Toast.show({ type: 'success', text1: 'Code OTP renvoyé' });
            setResendDisabled(true);
            setTimeLeft(5 * 60);
        } catch (error) {
            Toast.show({ type: 'error', text1: 'Erreur lors de l\'envoi du code', text2: 'Veuillez réessayer plus tard' });
        } finally {
            setLoading(false);
        }
    };

    const handleRefresh = () => setOtp('');

    return (
        <PullToRefresh onRefresh={handleRefresh}>
            <SafeAreaView style={styles.global}>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Ionicons name='arrow-back' size={24} color={COLORS.primary} />
                    </TouchableOpacity>

                    <Text style={styles.title}>Saisir le code reçu par SMS</Text>

                    <View style={styles.formContainer}>
                        <TextInput
                            placeholder="Entrez le code de validation"
                            placeholderTextColor={COLORS.primary}
                            onChangeText={setOtp}
                            value={otp}
                            keyboardType="numeric"
                            maxLength={6}
                            style={[styles.codeInput, { color: COLORS.primary }]} 
                        />

                        <TouchableOpacity onPress={handleSubmitOtp} style={styles.btnCodeValid}>
                            {loading ? (
                                <ActivityIndicator size="small" color={COLORS.primary} />
                            ) : (
                                <Text style={styles.btnText}>Valider le code</Text>
                            )}
                        </TouchableOpacity>

                        <Text style={styles.text}>Vous n'avez pas reçu ce code?</Text>
                        <TouchableOpacity onPress={handleResendOtp} style={styles.resendBtn} disabled={resendDisabled}>
                            {resendDisabled ? (
                                <Text style={styles.resendText}>
                                    Réessayez dans {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                                </Text>
                            ) : (
                                <Text style={styles.resendText}>Renvoyer le code</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
                <Toast />
            </SafeAreaView>
        </PullToRefresh>
    );
};

export default ValidCodeOtp;

const styles = StyleSheet.create({
    global: {
        flex: 1,
        backgroundColor: COLORS.bgBlue,
    },
    container: {
        marginTop: width * 0.2,
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: width * 0.05,
    },
    backButton: {
        position: 'absolute',
        top: -height * 0.05,
        left: width * 0.05,
        zIndex: 10,
    },
    title: {
        fontSize: width * 0.06,
        fontWeight: 'bold',
        color: COLORS.primary,
        textAlign: 'center',
        marginBottom: height * 0.03,
    },
    formContainer: {
        width: '100%',
        padding: width * 0.05,
        backgroundColor: COLORS.lightGray,
        borderRadius: 10,
        alignItems: 'center',
    },
    codeInput: {
        width: '100%',
        height: height * 0.06,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.secondary,
        backgroundColor: 'transparent',
        paddingHorizontal: width * 0.04,
        fontSize: width * 0.045,
        textAlign: 'center',
    },
    btnCodeValid: {
        backgroundColor: COLORS.secondary,
        paddingVertical: height * 0.015,
        marginTop: height * 0.02,
        width: '100%',
        borderRadius: 10,
        alignItems: 'center',
    },
    btnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: width * 0.045,
    },
    text: {
        marginTop: height * 0.03,
        fontSize: 18,
        color: COLORS.primary,
    },
    resendText: {
        fontSize: 18,
        color: COLORS.tertiary,
        textDecorationLine: "underline",
    },
});
