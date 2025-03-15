import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Text, View, ActivityIndicator, SafeAreaView, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import api from '../../config/AxioConfig';
import { COLORS, SIZES } from '../../constants';
import PullToRefresh from 'components/PullToRefresh';

// Define ParamList for your navigation
type RootStackParamList = {
  ValidCodeOtp: { phoneNumber: string };
};

const ValidCodeOtp = () => {
    const navigation = useNavigation();
    const route = useRoute<RouteProp<RootStackParamList, 'ValidCodeOtp'>>(); // Use RouteProp with the correct type
    const { phoneNumber } = route.params;

    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmitOtp = async () => { 
        const data = {
            num_tel: phoneNumber,  
            code: otp              
        };
    
    
        setLoading(true);
        try {
            const response = await api.post('/verify', data);  
    
            Alert.alert('Succès', 'Votre compte à été valmidé!');
            navigation.navigate('Login');
        } catch (error) {
            Alert.alert('Erreur', 'Erreur lors de la vérification!');
        } finally {
            setLoading(false);
        }
    };

    const handleResendOtp = async () => {
        try {
            const data = {
                num_tel : phoneNumber
            };
            setLoading(true);
            await api.post('/resend-code', { data });

            Alert.alert('Succès', 'Un nouveau code OTP a été envoyé !');
            Toast.show({
                type: 'success',
                text1: 'Un nouveau code OTP a été envoyé !',
            });
        } catch (error) {
            Alert.alert('Erreur', 'Impossible de renvoyer le code OTP.');
            Toast.show({
                type: 'error',
                text1: 'Impossible de renvoyer le code OTP.',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleRefresh = async () => {
       setOtp('');
    };

    return (
        <PullToRefresh onRefresh={handleRefresh}>
             <SafeAreaView style={styles.global}>
                <TouchableOpacity onPress={() => {navigation.goBack()}}>
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
                        <Text  style={styles.text}>Vous n'avez pas reçu ce code?</Text>
                        <Text style={styles.resendText}>Renvoyer le code</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </PullToRefresh>
    );
};

export default ValidCodeOtp;

const styles = StyleSheet.create({
    global: {
        height: SIZES.height,
        width: SIZES.width,
        paddingHorizontal: SIZES.medium,
        paddingTop: 50,
    },

    container: {
        height: '100%',
        width: '100%',
    },

    formContainer: {
        height: SIZES.height/3.5,
        borderRadius: SIZES.medium,
        backgroundColor: COLORS.primary,
        paddingHorizontal: 20,
        paddingVertical: 20,
        marginTop: 70,
        borderColor: COLORS.gray2,
        borderWidth: 2,
    },

    codeInput: {
        width: '100%',
        borderRadius: 30,
        backgroundColor: COLORS.gray2,
        padding: 20,
        height: 70,
        fontSize: 20,
        textAlign: 'center'
    },

    title: {
        marginTop: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 24,
    },

    btnCodeValid: {
        backgroundColor: COLORS.bgBlue,
        padding: 20,
        marginTop: 20,
        width: '100%',
        borderRadius: 50
    },

    btnText: {
        color: COLORS.primary,
        fontWeight: 'bold',
        fontSize: 24,
        textAlign: 'center'
    },

    resendBtn: {
        marginTop: 15,
        alignSelf: 'center',
    },

    resendText: {
        color: COLORS.bgBlue,
        fontSize: 18,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },

    text: {
        marginTop: 30,
        fontSize: 18,
        fontWeight: 'bold',

    }
});
