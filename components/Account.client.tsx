import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard,
} from 'react-native';
import styles from '../styles/account.client.style';
import ChoixPayment from './payment/ChoixPayment';
import { TextInput } from 'react-native-paper';
import api from "../config/AxioConfig";
import { COLORS } from '../constants';
import Header from './Header';

const { width, height } = Dimensions.get('window');

const AccountClient = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState(null);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [isBuying, setIsBuying] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  const options = [
    { id: "1", name: "5 Crédits", price: "5 000 Ariary" },
    { id: "2", name: "12 Crédits", price: "10 000 Ariary" },
    { id: "3", name: "30 Crédits", price: "25 000 Ariary" },
  ];

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const response = await api.get("/me");
        setUser(response.data);
      } catch (err: any) {
        setError(err.message || "Une erreur s'est produite");
      } finally {
        setLoading(false);
      }
    };

    fetchMe();
  }, []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleBuy = async () => {
    setIsBuying(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Achat réussi !");
    } catch (err) {
      console.error("Erreur lors de l'achat :", err);
    } finally {
      setIsBuying(false);
    }
  };

  const handleValidate = async () => {
    setIsValidating(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Code validé !");
    } catch (err) {
      console.error("Erreur lors de la validation :", err);
    } finally {
      setIsValidating(false);
    }
  };
  
  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: COLORS.bgBlue }]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  const selectedOption = options.find(option => option.id === selectedId);

  return (
    <SafeAreaView style={styles.global}>
      <Header />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, backgroundColor: COLORS.bgBlue }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.paymentContainer}>
            <Text style={styles.paymentTitle}>Choix de Crédit</Text>
            <View style={styles.container}>
              {options.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  onPress={() => setSelectedId(option.id)}
                  style={[
                    styles.imageContainer,
                    selectedId === option.id && styles.selected,
                  ]}
                >
                  <Text style={{ textAlign: 'center', color: COLORS.primary, fontWeight: 'bold' }}>{option.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={[styles.paymentTitle, { color: COLORS.primary }]}>
               {selectedOption ? selectedOption.price : " "}
            </Text>
            <Text style={styles.paymentTitle}>Choix de paiement</Text>
            <ChoixPayment />
            <TouchableOpacity
              style={styles.achatBtn}
              onPress={handleBuy}
              disabled={isBuying}
            >
              {isBuying ? (
                <ActivityIndicator color={COLORS.white} />
              ) : (
                <Text style={styles.textBtn}>Acheter</Text>
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.codeContainer}>
            <TextInput
              style={{
                width: '95%',
                borderWidth: 1,
                textAlign: 'center',
                borderRadius: 7,
                backgroundColor: 'transparent',
                borderColor: COLORS.gray,
                alignSelf: 'center',
              }}
              placeholder="Entrer ici votre code"
              placeholderTextColor={COLORS.secondary}
              textColor={COLORS.primary}
            />
            <TouchableOpacity
              style={styles.validBtn}
              onPress={handleValidate}
              disabled={isValidating}
            >
              {isValidating ? (
                <ActivityIndicator color={COLORS.white} />
              ) : (
                <Text style={styles.textValidBtn}>Valider</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AccountClient;
