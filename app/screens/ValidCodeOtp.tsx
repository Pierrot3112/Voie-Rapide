import React, { useState } from 'react';
import { 
    StyleSheet, TextInput, TouchableOpacity, Text, View, 
    ActivityIndicator, SafeAreaView, Dimensions 
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
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

    const handleSubmitOtp = async () => { 
        setLoading(true);
        try {
            await api.post('/verify', { num_tel: phoneNumber, code: otp });
            Toast.show({ type: 'success', text1: 'Succès', text2: 'Votre compte a été validé!' });
            navigation.navigate('Login');
        } catch (error) {
            Toast.show({ type: 'error', text1: 'Erreur', text2: 'Erreur lors de la vérification!' });
        } finally {
            setLoading(false);
        }
    };

    const handleResendOtp = async () => {
        setLoading(true);
        try {
            const data = { num_tel: phoneNumber };
            await api.post('/resend-code', { data });
            Toast.show({ type: 'success', text1: 'Code OTP renvoyé' });
        } catch (error) {
            Toast.show({ type: 'error', text1: 'Compte déjà activé', text2: 'Veuillez réinitialiser votre mot de passe si vous l\'avez oublié' });
        } finally {
            setLoading(false);
        }
    };

    const handleRefresh = () => setOtp('');

    return (
        <PullToRefresh onRefresh={handleRefresh}>
            <SafeAreaView style={styles.global}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name='arrow-back' size={24} />
                </TouchableOpacity>

                <Text style={styles.title}>Vérification du Code OTP</Text>

                <View style={styles.formContainer}>
                    <TextInput
                        placeholder="Entrez le code OTP"
                        onChangeText={setOtp}
                        value={otp}
                        keyboardType="numeric"
                        style={styles.codeInput}
                    />
                    {loading ? (
                        <ActivityIndicator size="large" color="#0000ff" />
                    ) : (
                        <TouchableOpacity onPress={handleSubmitOtp} style={styles.btnCodeValid}>
                            <Text style={styles.btnText}>Vérifier OTP</Text>
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity onPress={handleResendOtp} style={styles.resendBtn}>
                        <Text style={styles.text}>Vous n'avez pas reçu ce code?</Text>
                        <Text style={styles.resendText}>Renvoyer le code</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            <Toast />
        </PullToRefresh>
    );
};

export default ValidCodeOtp;

const styles = StyleSheet.create({
    global: {
        flex: 1,
        paddingHorizontal: width * 0.05,
        paddingTop: height * 0.05,
        backgroundColor: '#fff',
    },

    backButton: {
        marginBottom: 10,
    },

    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: width * 0.06,
        marginVertical: height * 0.02,
    },

    formContainer: {
        width: '100%',
        padding: width * 0.05,
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        borderColor: COLORS.gray2,
        borderWidth: 2,
        alignItems: 'center',
    },

    codeInput: {
        width: '100%',
        borderRadius: 30,
        backgroundColor: COLORS.gray2,
        padding: height * 0.02,
        fontSize: width * 0.05,
        textAlign: 'center',
    },

    btnCodeValid: {
        backgroundColor: COLORS.bgBlue,
        padding: height * 0.02,
        marginTop: height * 0.02,
        width: '100%',
        borderRadius: 50,
        alignItems: 'center',
    },

    btnText: {
        color: COLORS.primary,
        fontWeight: 'bold',
        fontSize: width * 0.05,
    },

    resendBtn: {
        marginTop: height * 0.02,
    },

    resendText: {
        color: COLORS.bgBlue,
        fontSize: width * 0.045,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },

    text: {
        fontSize: width * 0.04,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});